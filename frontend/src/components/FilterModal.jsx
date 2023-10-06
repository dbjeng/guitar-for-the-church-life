import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import styles from "./FilterModal.module.css";

export default function FilterModal({showModal, onHide, allowedChords, onSave}) {
  const [checkedChords, setCheckedChords] = useState(allowedChords);

  function handleCheckboxChange(event) {
    const { name, checked } = event.target;
    
    setCheckedChords({
      ...checkedChords,
      [name]: checked,
    });
  }

  function generateCheckboxes() {
    return Object.keys(allowedChords).map((chord) =>
      <div>
        <input type="checkbox" id={chord} name={chord} value={allowedChords[chord]} onChange={handleCheckboxChange}/>
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
        <Button onClick={() => onSave(checkedChords)}>Update Settings</Button>
      </Modal.Footer>
    </Modal>
  );
}