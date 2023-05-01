from django.http import HttpResponse
import requests

def filter(request, chords = []):
    raw_data = requests.get('https://songbase.life/api/v1/app_data?language=english', params=request.GET)

    if raw_data.status_code != 200:
        return HttpResponse("Request did not work.")
    
    # This list contains tuples of chords to the songs that are in them
    chords_to_songs = {}
    # Make one sweep across chords, find all the chords
    for song in raw_data["songs"]:
        for chord in extract_chords(song["lyrics"]):
            # If chord exists, add it to the list of chords_to_songs tuples
            if chords_to_songs[chord] != None:
                if chords_to_songs[chord][-1] != song["id"]:
                    chords_to_songs[chord].append(song["id"])
            else:
                # If new chord, add it to the list of chords_to_songs tuples
                chords_to_songs.append({chord : [song["id"]]})

    result = set()
    # TODO: create a faster adding method (take advantage of sorted list)
    for chord in chords:
        result = result + chords_to_songs[chord]
    return HttpResponse(result)
    
def extract_chords(song):
    chord_set = set()
    