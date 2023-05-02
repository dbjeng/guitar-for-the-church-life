from django.http import HttpResponse
import requests
import json
import re

def filter(request, chords = ""):
    chords = chords.split(",")
    raw_data = requests.get('https://songbase.life/api/v1/app_data?language=english', params=request.GET)

    if raw_data.status_code != 200:
        return HttpResponse("Request did not work.")
    
    raw_data = json.loads(raw_data.content)
    
    result = []
    # Simple implementation
    for song in raw_data["songs"]:
        curr_chords = extract_chords(song["lyrics"])
        if len(curr_chords) > 0 and curr_chords.issubset(chords):
            result.append(song)

    # This list contains tuples of chords to the songs that are in them
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
    # # TODO: create a faster adding method (take advantage of sorted list)
    # for chord in chords:
    #     result.update(chords_to_songs[chord])
    return HttpResponse(result)
    
def extract_chords(song):
    chord_set = set(re.findall(r'\[(.*?)\]', song))
    return chord_set

def best_order_to_learn_chords(request):
    raw_data = requests.get('https://songbase.life/api/v1/app_data?language=english', params=request.GET)

    if raw_data.status_code != 200:
        return HttpResponse("Request did not work.")
    
    raw_data = json.loads(raw_data.content)

    # Get all the chords
    all_chords = set()
    for song in raw_data["songs"]:
        curr_chords = extract_chords(song["lyrics"])
        if len(curr_chords) > 0:
            all_chords.update(curr_chords)

    best_chord = ""
    most_songs = 0
    chord_order = []
    ultimate_result = []
    while len(all_chords) > 0:
        for chord in all_chords:
            chord_order.append(chord)
            curr_num_songs = 0
            for song in raw_data["songs"]:
                if extract_chords(song["lyrics"]).issubset(chord_order):
                    curr_num_songs += 1
            if curr_num_songs >= most_songs:
                most_songs = curr_num_songs
                best_chord = chord
            chord_order.remove(chord)
            curr_num_songs = 0
        all_chords.remove(best_chord)
        chord_order.append(best_chord)
        ultimate_result.append({best_chord : most_songs})
        best_chord = ""
        most_songs = 0
    return HttpResponse(ultimate_result)