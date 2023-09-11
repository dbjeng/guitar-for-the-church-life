import styles from "./KeyChordtable.module.css";
import Table from "react-bootstrap/Table";
import Card from 'react-bootstrap/Card';

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
      {row.map((item) => <td>{item}</td>)}
    </tr>
  ))
}

export default function KeyChordTable() {
  const headers = ['Key', 'I', 'ii', 'iii', 'IV', 'V', 'vi']
  const keyWithChords = [
    ['C', 'C', 'Dm', 'Em', 'F', 'G', 'Am'],
    ['D', 'D', 'Em', 'F#m', 'G', 'A', 'Bm'],
    ['E', 'E', 'F#m', 'G#m', 'A', 'B', 'C#m'],
    ['F', 'F', 'Gm', 'Am', 'Bb', 'C', 'Dm'],
    ['G', 'G', 'Am', 'Bm', 'C', 'D', 'Bm'],
    ['A', 'A', 'Bm', 'C#m', 'D', 'E', 'F#m'],
  ]
  return (
    <>
      <h1 className={styles.title}>Common Chords by Key</h1>
      <Card className={styles.tableCard}>
        <Card.Body>
          <Table striped>
            <thead>
              {tableHeaders(headers)}
            </thead>
            <tbody>
              {tableRows(keyWithChords)}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );
}
