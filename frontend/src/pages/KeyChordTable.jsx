import styles from "./KeyChordtable.module.css";
import Table from "react-bootstrap/Table";
import Card from 'react-bootstrap/Card';
import { useState } from "react";

function tableHeaders(tableHeaders) {
  return (
    <tr>
      {tableHeaders.map((header) => <th>{header}</th>)}
    </tr>
  )
}

function tableRows(rows) {
  return rows.map((row) => (
    <tr>
      {row.map((item) => <td className={styles["td-sm"]}>{item}</td>)}
    </tr>
  ))
}

export default function KeyChordTable() {
  const headers = ['Key', 'I', 'ii', 'iii', 'IV', 'V', 'vi']
  const commonKeysWithChords = [
    ['C', 'C', 'Dm', 'Em', 'F', 'G', 'Am'],
    ['D', 'D', 'Em', 'F#m', 'G', 'A', 'Bm'],
    ['E', 'E', 'F#m', 'G#m', 'A', 'B', 'C#m'],
    ['F', 'F', 'Gm', 'Am', 'Bb', 'C', 'Dm'],
    ['G', 'G', 'Am', 'Bm', 'C', 'D', 'Em'],
    ['A', 'A', 'Bm', 'C#m', 'D', 'E', 'F#m'],
  ]
  const allKeysWithChords = [
    ['C', 'C', 'Dm', 'Em', 'F', 'G', 'Am'],
    ['Db', 'Db', 'Ebm', 'Fm', 'Gb', 'Ab', 'Bbm'],
    ['D', 'D', 'Em', 'F#m', 'G', 'A', 'Bm'],
    ['Eb', 'Eb', 'Fm', 'Gm', 'Ab', 'Bb', 'Cm'],
    ['E', 'E', 'F#m', 'G#m', 'A', 'B', 'C#m'],
    ['F', 'F', 'Gm', 'Am', 'Bb', 'C', 'Dm'],
    ['Gb', 'Gb', 'Abm', 'Bbm', 'Cb', 'Db', 'Ebm'],
    ['G', 'G', 'Am', 'Bm', 'C', 'D', 'Em'],
    ['Ab', 'Ab', 'Bbm', 'Cm', 'Db', 'Eb', 'Fm'],
    ['A', 'A', 'Bm', 'C#m', 'D', 'E', 'F#m'],
    ['Bb', 'Bb', 'Cm', 'Dm', 'Eb', 'F', 'Gbm'],
    ['B', 'B', 'C#m', 'D#m', 'E', 'F#', 'G#m'],
  ]
  const [displayAllChords, setDisplayAllChords] = useState(false);

  return (
    <>
      <div className={styles.tableContainer}>
        <Card className={styles.tableCard}>
          <Card.Header className={styles.cardTitle}>Common Chords by Key</Card.Header>
          <Card.Body className={styles.cardBody}>
            <Table className={styles.table}>
              <thead>
                {tableHeaders(headers)}
              </thead>
              <tbody>
                {tableRows(displayAllChords ? allKeysWithChords : commonKeysWithChords)}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
      <div className={styles.checkboxesContainer}>
        <input type="checkbox" id="showAllKeys" onClick={() => setDisplayAllChords(!displayAllChords)}/>
        <label for="showAllKeys">Show All Keys</label>
      </div>

    </>
  );
}
