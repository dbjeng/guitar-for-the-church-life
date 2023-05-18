from django.http import HttpResponse
import requests
import json
import re
import logging

# Returns set of all chords present in any song
def all_chords(request):
    raw_data = json.loads(requests.get(
        "https://songbase.life/api/v1/app_data?language=english", params=request.GET
    ).content)
    all_chords = set()
    for song in raw_data["songs"]:
        curr_chords = extract_chords(song["lyrics"])
        if len(curr_chords) > 0:
            all_chords.update(curr_chords)
    return HttpResponse(json.dumps({"all_chords": list(all_chords)}))

# Example call: http://127.0.0.1:8000/filter/chords=G,D
def filter_endpoint(request, chords=""):
    # logging.basicConfig(level=logging.DEBUG)

    chords = str(chords).split(",")
    raw_data = requests.request("GET", "https://songbase.life/api/v1/app_data?language=english")

    if raw_data.status_code != 200:
        return HttpResponse("Request did not work.")

    raw_data = json.loads(raw_data.content)

    result = []
    # Get songs whose chords are a subset of the chords given (simple implementation)
    for song in raw_data["songs"]:
        curr_chords = extract_chords(song["lyrics"])
        if len(curr_chords) > 0 and curr_chords.issubset(chords):
            result.append(song)
           
    # # # TODO: create a faster adding method (take advantage of sorted list)
    # # More complicated implementation to make addition and subtraction of chords faster
    # # This list contains tuples of chords to the songs that are in them
    # chords_to_songs = {}
    # # Make one sweep across chords, find all the chords
    # for song in raw_data.content["songs"]:
    #     for chord in extract_chords(song["lyrics"]):
    #         # If chord exists, add it to the list of chords_to_songs tuples
    #         if chords_to_songs[chord] != None:
    #             if chords_to_songs[chord][-1] != song["id"]:
    #                 chords_to_songs[chord].append(song["id"])
    #         else:
    #             # If new chord, add it to the list of chords_to_songs tuples
    #             chords_to_songs.append({chord : [song["id"]]})

    # result = set()
    # for chord in chords:
    #     result.update(chords_to_songs[chord])
    return HttpResponse(json.dumps(result))


def best_order_to_learn_chords(request):  # Remove all songs with no chords
    raw_data = requests.get(
        "https://songbase.life/api/v1/app_data?language=english", params=request.GET
    )

    # Filter out songs without chords
    raw_data = filter_out_no_chord_songs(json.loads(raw_data.content))

    # Get all the chords and get list of songs with two chords
    all_chords = set()
    chord_pairs = []
    pair_counts = []
    for song in raw_data["songs"]:
        curr_chords = extract_chords(song["lyrics"])
        if len(curr_chords) > 0:
            all_chords.update(curr_chords)
        if len(curr_chords) == 2:
            if curr_chords not in chord_pairs:
                chord_pairs.append(curr_chords)
                pair_counts.append(1)
            else:
                pair_counts[chord_pairs.index(curr_chords)] += 1
    
    # Find the best two chords
    best_chord_pair = None
    most_songs_per_pair = 0
    for i in range(len(chord_pairs)):
        if pair_counts[i] > most_songs_per_pair:
            most_songs_per_pair = pair_counts[i]
            best_chord_pair = chord_pairs[i]

    # Start with the first two chords
    all_chords = all_chords - best_chord_pair
    best_chord_pair = list(best_chord_pair)
    learned_chords = best_chord_pair

    # Remove songs playable with best 2 chords
    unknown_songs = raw_data["songs"]
    unknown_songs = filter_out_playable_songs(unknown_songs, learned_chords)

    # Greedy algo: Find the chord that, if learned, maximizes the number of playable songs
    best_chord = ""
    prev_chord = ""
    new_songs = 0
    ultimate_result = [{best_chord_pair[0] + " and " + best_chord_pair[1]: most_songs_per_pair}]
    while len(all_chords) > 0:
        for chord in all_chords:
            learned_chords.append(chord)
            curr_new_songs = 0
            for song in unknown_songs:
                if extract_chords(song["lyrics"]).issubset(learned_chords):
                    curr_new_songs += 1
            if curr_new_songs >= new_songs:
                new_songs = curr_new_songs
                best_chord = chord
            learned_chords.remove(chord)
            curr_new_songs = 0
        all_chords.remove(best_chord)
        learned_chords.append(best_chord)
        # This if-else blocks combines chords that must be learned together for new 
        # songs to be learned
        if new_songs == 0:
            prev_chord = best_chord + " and "
            continue
        elif prev_chord != "":
            best_chord = prev_chord + best_chord
            prev_chord = ""
        ultimate_result.append({best_chord: new_songs})
        best_chord = ""
        new_songs = 0
        unknown_songs = filter_out_playable_songs(unknown_songs, learned_chords)
    return HttpResponse(ultimate_result)

def filter_out_playable_songs(songs, chords):
    # We assume that the newest chord learned was the last one in chords
    songs_copy = songs.copy()
    for song in songs:
        curr_chords = extract_chords(song["lyrics"])
        if chords[-1] in curr_chords and curr_chords.issubset(chords):
            songs_copy.remove(song)
    return songs_copy

def filter_out_no_chord_songs(raw_data):
    index = 0
    while index < len(raw_data["songs"]):
        if len(extract_chords(raw_data["songs"][index]["lyrics"])) == 0:
            del raw_data["songs"][index]
        else:
            index += 1
    return raw_data

def extract_chords(song):
    non_chords = {
        "",
        "End",
        "End:",
        "repeat",
        "Bridge",
        "2",
        "3",
        "X2",
        "Capo",
        "Psalm",
        "–",
        "110",
    }

    # Extract chords in brackets
    chord_set = set(re.findall(r"\[(.*?)\]", song))

    # Split chords with weird symbols between them, such as hyphens
    pattern = re.compile(r"[^a-zA-Z0-9/()#]+")
    chord_set = {
        new_chord
        for old_chord in chord_set
        for new_chord in re.split(pattern, old_chord)
    }
    # Remove chords in parentheses
    pattern = re.compile(r"\(+.*")  # Matches strings with parenthesis in front
    chord_set = chord_set - set(filter(pattern.match, chord_set))
    pattern = re.compile(r".*\)+")  # Matches strings with parenthesis in back
    chord_set = chord_set - set(filter(pattern.match, chord_set))

    # Remove non-chords
    for non_chord in non_chords:
        if non_chord in chord_set:
            chord_set.remove(non_chord)

    # Change M7 to maj7 and Maj7 to maj7
    maj7_set = set()
    chord_set_copy = chord_set.copy()
    for chord in chord_set_copy:
        if "Maj" in chord:
            chord_set.remove(chord)
            maj7_set.add(chord.replace("Maj", "maj"))
        elif "M" in chord:
            chord_set.remove(chord)
            maj7_set.add(chord.replace("M", "maj"))
    chord_set.update(maj7_set)

    return chord_set
