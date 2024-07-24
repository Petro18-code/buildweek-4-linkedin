import { Modal, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';


const months = [
  'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
  'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
];

const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

const employmentTypes = [
  'Tempo pieno',
  'Part-time',
  'Contratto a termine',
  'Stage',
  'Freelance',
  'Altro'
];

const locationTypes = [
  'In ufficio',
  'Da remoto',
  'Ibrido',
  'Altro'
];

const AddExperienceModal = ({ show, onClose, onSubmit, experience = {}, onInputChange }) => {
  const [localError, setLocalError] = useState('');
  const [startDateMonth, setStartDateMonth] = useState(experience.startDate ? parseInt(experience.startDate.slice(5, 7), 10) : '');
  const [startDateYear, setStartDateYear] = useState(experience.startDate ? parseInt(experience.startDate.slice(0, 4), 10) : '');
  const [endDateMonth, setEndDateMonth] = useState(experience.endDate ? parseInt(experience.endDate.slice(5, 7), 10) : '');
  const [endDateYear, setEndDateYear] = useState(experience.endDate ? parseInt(experience.endDate.slice(0, 4), 10) : '');
  const [employmentType, setEmploymentType] = useState(experience.employmentType || '');
  const [locationType, setLocationType] = useState(experience.locationType || '');

  const handleSubmit = () => {
    
    if (!experience.role || !experience.company || !experience.startDate) {
      setLocalError('Il ruolo, il nome dell\'azienda e la data di inizio sono obbligatori.');
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
        <Modal.Title>Aggiungi Esperienza</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body-scroll">
        {localError && <Alert variant="danger">{localError}</Alert>}
        <Form>
          <Form.Group controlId="formRole">
            <Form.Label>Ruolo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Inserisci il tuo ruolo"
              name="role"
              value={experience.role || ''}
              onChange={onInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formCompany">
            <Form.Label>Nome Azienda</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nome dell'azienda"
              name="company"
              value={experience.company || ''}
              onChange={onInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formEmploymentType" className="mt-3">
            <Form.Label>Tipo di Impiego</Form.Label>
            <Form.Control
              as="select"
              name="employmentType"
              value={employmentType}
              onChange={(e) => {
                setEmploymentType(e.target.value);
                onInputChange(e);
              }}
            >
              <option value="">Seleziona tipo di impiego</option>
              {employmentTypes.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formLocationType" className="mt-3">
            <Form.Label>Tipo di Località</Form.Label>
            <Form.Control
              as="select"
              name="locationType"
              value={locationType}
              onChange={(e) => {
                setLocationType(e.target.value);
                onInputChange(e);
              }}
            >
              <option value="">Seleziona tipo di località</option>
              {locationTypes.map((type, index) => (
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
          <Form.Group controlId="formDescription" className="mt-3">
            <Form.Label>Descrizione</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Descrivi il tuo ruolo e le tue responsabilità"
              name="description"
              value={experience.description || ''}
              onChange={onInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formArea" className="mt-3">
            <Form.Label>Località</Form.Label>
            <Form.Control
              type="text"
              placeholder="Località del lavoro"
              name="area"
              value={experience.area || ''}
              onChange={onInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formShareNetwork" className="mt-3">
            <Form.Check
              type="checkbox"
              label="Attualmente ricopro questo ruolo"
            />
          </Form.Group>
        </Form>
        <div className="mt-4">
          <h5>Competenze</h5>
          <p>Aggiungi le competenze più rilevanti per questo ruolo. Appariranno anche nella sezione Competenze del tuo profilo.</p>
          <Button variant="secondary"><FaPlus /> Aggiungi Competenza</Button>
        </div>
        <div className="mt-4">
          <h5>Media</h5>
          <p>Inserisci contenuti multimediali come immagini, documenti, link o presentazioni. Scopri i tipi di file supportati.</p>
          <Button variant="secondary"><FaPlus /> Aggiungi Media</Button>
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

export default AddExperienceModal;
