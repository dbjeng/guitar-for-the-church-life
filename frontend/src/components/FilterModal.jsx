import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect } from 'react';
import styles from "./FilterModal.module.css";

export default function FilterModal({showModal, onHide, allowedChords, onSave}) {
  const MOST_COMMON_CHORDS = new Set("G", "D", "A", "Bm", "A7", "Em", "F#m", 
    "C", "D7", "Am", "F", "G7", "Dm", "E", "E7", "C7", "B7", "F#", "Am7",
    "Gm", "B", "Em7", "Dm7", "Bb", "Cmaj7", "F#7", "Cm", "Dmaj7", "Bm7", "C#m", "Fm")
  const [checkedChords, setCheckedChords] = useState(allowedChords);
  
  // Update checkedChords when allowedChords changes
  useEffect(() => {
    setCheckedChords(allowedChords);
  }, [allowedChords]);

  function handleCheckboxChange(event) {
    const { name, checked } = event.target;
    
    setCheckedChords({
      ...checkedChords,
      [name]: checked,
    });
  }

  function generateCheckboxes(commonChords) {
    return Object.keys(checkedChords).map((chord) =>
      {
        if (commonChords && chord in MOST_COMMON_CHORDS || !commonChords && !(chord in MOST_COMMON_CHORDS)) {
          return (
            <div key={chord}>
              <input type="checkbox" id={chord} name={chord} checked={checkedChords[chord]} onChange={handleCheckboxChange}/>
              <label for={chord}>{chord}</label>
            </div>
          )
        }
      }
    )
  }

  return (
    <Modal show={showModal} onHide={onHide} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Filter Settings
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="grid-example">
        <div className={styles.allowedChordsContainer}>     
          {generateCheckboxes(true)}
        </div>        
        <div className={styles.allowedChordsContainer}>     
          {generateCheckboxes(false)}
        </div>
      </Modal.Body>
      <Modal.Footer className={styles.footer}>
        <Button onClick={() => {
          onSave(checkedChords)
          console.log(checkedChords)
        }}>Update Settings</Button>
      </Modal.Footer>
    </Modal>
  );
}