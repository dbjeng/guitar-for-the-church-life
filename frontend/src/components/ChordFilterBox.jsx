import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

const ChordFilterBox = ({
  chords
}) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>ChordFilter</Card.Title>
        <Form>
          {chords.map((chord) => (
            <div key={`default-checkbox`} className="mb-3">
              <Form.Check 
                type={'checkbox'}
                id={chord}
                label={chord}
              />
            </div>
          ))}
        </Form>

        <Button variant="primary">Filter Songs</Button>
      </Card.Body>
    </Card>
  );
}

export default ChordFilterBox;