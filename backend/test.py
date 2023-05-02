import json
import re

def get_chords():

  # Remove all songs with no chords
  print("Before: ", len(raw_data["songs"]))
  index = 0
  while index < len(raw_data["songs"]):
      if len(extract_chords(raw_data["songs"][index]["lyrics"])) == 0:
        del raw_data["songs"][index]
      else:
        index += 1
  print("After: ", len(raw_data["songs"]))

  # Get all the chords
  all_chords = set()
  for song in raw_data["songs"]:
      curr_chords = extract_chords(song["lyrics"])
      if len(curr_chords) > 0:
          all_chords.update(curr_chords)
      if len(curr_chords) == 2:
         print(curr_chords)
  if '' in all_chords:
    all_chords.remove('')
  print("all_chords: ", all_chords)

  # Find the best two chords

  
  # Start with D
  all_chords.remove("D")
  chord_order = ["D"]

  best_chord = ""
  new_songs = 0
  ultimate_result = [{'D': 0}]
  while len(all_chords) > 0:
      for chord in all_chords:
          chord_order.append(chord)
          curr_new_songs = 0
          for song in raw_data["songs"]:
              if extract_chords(song["lyrics"]).issubset(chord_order):
                  curr_new_songs += 1
          if curr_new_songs >= new_songs:
              new_songs = curr_new_songs
              best_chord = chord
          chord_order.remove(chord)
          curr_new_songs = 0
      all_chords.remove(best_chord)
      chord_order.append(best_chord)
      print({best_chord : new_songs})
      ultimate_result.append({best_chord : new_songs})
      best_chord = ""
      new_songs = 0

  print(ultimate_result)

def extract_chords(song):
  chord_set = set(re.findall(r'\[(.*?)\]', song))
  chord_set_copy = chord_set.copy()
  for chord in chord_set_copy:
    if '-' in chord:
      chord_set.remove(chord)
      chord_set.update(re.split("-", chord))
  chord_set_copy = chord_set.copy()
  for chord in chord_set_copy:
    if ' ' in chord:
      chord_set.remove(chord)
      chord_set.update(re.split(" ", chord))
  return chord_set

if __name__ == "__main__":
  get_chords()