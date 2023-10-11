import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect } from 'react';
import styles from "./FilterModal.module.css";

export default function FilterModal({showModal, onHide, allowedChords, onSave}) {
  console.log('allowedChords:', allowedChords)
  const [checkedChords, setCheckedChords] = useState(allowedChords);
  console.log("check initialization: ", checkedChords)
  
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

  function generateCheckboxes() {
    return Object.keys(checkedChords).map((chord) =>
      <div key={chord}>
        <input type="checkbox" id={chord} name={chord} checked={checkedChords[chord]} onChange={handleCheckboxChange}/>
        <label for={chord}>{chord}</label>
      </div>
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
          {generateCheckboxes()}
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