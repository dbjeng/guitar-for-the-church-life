import { Button } from "react-bootstrap";
import styles from "./SongFilter.module.css";
import SongList from "../components/SongList";
import { useEffect, useState } from "react";
import axios from "axios";
import FilterModal from "../components/FilterModal";

export default function SongFilter() {
  const [allowedChords, setAllowedChords] = useState({});
  const [showFilterSettingsModal, setShowFilterSettingsModal] = useState(true);

  useEffect(() => {
    axios
      .get(
        "https://backend.guitarforthechurch.life/all_chords/"
      )
      .then((response) => {
        const chordMap = {};
        for (const chord of response.data.all_chords){
          chordMap[chord] = false;
        }
        setAllowedChords(chordMap);
      });
  }, []);

  function getAllowedChords(){
    const allowedChordsResult = [];
    for (const chord in allowedChords) {
      if (allowedChords[chord]) {
        allowedChordsResult.push(chord);
      }
    }
    return allowedChordsResult;
  }

  return (
    <>
      <div className={`${styles.center} ${styles.filterButton}`}>
        <Button onClick={() => setShowFilterSettingsModal(true)}>Filter Settings</Button>
      </div>
      <FilterModal showModal={showFilterSettingsModal} 
        onHide={() => setShowFilterSettingsModal(false)}
        allowedChords={allowedChords} 
        onSave={(newChords) => {
          setAllowedChords(newChords);
          setShowFilterSettingsModal(false);
        }}/>
      <SongList allowedChords={getAllowedChords()}/>
    </>
  );
}
