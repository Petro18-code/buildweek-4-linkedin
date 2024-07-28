import { Modal, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

const months = [
  'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
  'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
];

const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);
const breakTypes = [
  'Lutto', 'Pausa', 'Lavoro', 'Trasferta', 'Altro',
];

const AddBreakModal = ({ show, onClose, onSubmit, experience = {}, onInputChange }) => {
  const [localError, setLocalError] = useState('');
  const [startDateMonth, setStartDateMonth] = useState(experience.startDate ? parseInt(experience.startDate.slice(5, 7), 10) : '');
  const [startDateYear, setStartDateYear] = useState(experience.startDate ? parseInt(experience.startDate.slice(0, 4), 10) : '');
  const [endDateMonth, setEndDateMonth] = useState(experience.endDate ? parseInt(experience.endDate.slice(5, 7), 10) : '');
  const [endDateYear, setEndDateYear] = useState(experience.endDate ? parseInt(experience.endDate.slice(0, 4), 10) : '');
  const [breakType, setBreakType] = useState(experience.breakType || '');
  
  const handleSubmit = () => {
   
    if (!startDateMonth || !startDateYear || !endDateMonth || !endDateYear) {
      setLocalError('Data di inizio e fine sono obbligatorie.');
      return;
    }
    setLocalError('');
    onSubmit();
  };

  const handleDateChange = (type, month, year) => {
    const dateString = `${year}-${month.padStart(2, '0')}`;
    onInputChange({
      target: {
        name: type,
        value: dateString
      }
    });
  };

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Aggiungi una Pausa Lavorativa</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body-scroll">
        {localError && <Alert variant="danger">{localError}</Alert>}
        <Form>
          <Form.Group controlId="formBreakType" className="mt-3">
            <Form.Label>Tipo di Pausa</Form.Label>
            <Form.Control
              as="select"
              name="breakType"
              value={breakType}
              onChange={(e) => {
                setBreakType(e.target.value);
                onInputChange(e);
              }}
            >
              <option value="">Seleziona il tipo</option>
              {breakTypes.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </Form.Control>
          </Form.Group>
          
          <Form.Group controlId="formStartDate" className="mt-3">
            <Form.Label>Data di Inizio</Form.Label>
            <Row>
              <Col>
                <Form.Control
                  as="select"
                  name="startDateMonth"
                  value={startDateMonth}
                  onChange={(e) => {
                    const newMonth = e.target.value;
                    setStartDateMonth(newMonth);
                    handleDateChange('startDate', newMonth, startDateYear);
                  }}
                >
                  <option value="">Mese</option>
                  {months.map((month, index) => (
                    <option key={index} value={index + 1}>{month}</option>
                  ))}
                </Form.Control>
              </Col>
              <Col>
                <Form.Control
                  as="select"
                  name="startDateYear"
                  value={startDateYear}
                  onChange={(e) => {
                    const newYear = e.target.value;
                    setStartDateYear(newYear);
                    handleDateChange('startDate', startDateMonth, newYear);
                  }}
                >
                  <option value="">Anno</option>
                  {years.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </Form.Control>
              </Col>
            </Row>
          </Form.Group>
          
          <Form.Group controlId="formEndDate" className="mt-3">
            <Form.Label>Data di Fine</Form.Label>
            <Row>
              <Col>
                <Form.Control
                  as="select"
                  name="endDateMonth"
                  value={endDateMonth}
                  onChange={(e) => {
                    const newMonth = e.target.value;
                    setEndDateMonth(newMonth);
                    handleDateChange('endDate', newMonth, endDateYear);
                  }}
                >
                  <option value="">Mese</option>
                  {months.map((month, index) => (
                    <option key={index} value={index + 1}>{month}</option>
                  ))}
                </Form.Control>
              </Col>
              <Col>
                <Form.Control
                  as="select"
                  name="endDateYear"
                  value={endDateYear}
                  onChange={(e) => {
                    const newYear = e.target.value;
                    setEndDateYear(newYear);
                    handleDateChange('endDate', endDateMonth, newYear);
                  }}
                >
                  <option value="">Anno</option>
                  {years.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </Form.Control>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group controlId="formShareNetwork" className="mt-3">
            <Form.Check
              type="checkbox"
              label="Attualmente sono in questa pausa lavorativa"
            />
          </Form.Group>

          <Form.Group controlId="formDescription" className="mt-3">
            <Form.Label>Descrizione</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={experience.description || ''}
              onChange={onInputChange}
            />
          </Form.Group>
        </Form>
        
        <div className="mt-4">
          <h5>Media</h5>
          <p>Aggiungi contenuti multimediali come immagini, documenti, siti o presentazioni. Scopri di più sui tipi di file multimediali supportati.</p>
          <Button variant="primary"> <FaPlus /> Aggiungi Media</Button>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit}>
          Salva
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddBreakModal;