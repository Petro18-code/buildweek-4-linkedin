import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import './EditExperienceModal.css';
import { FaPlus } from 'react-icons/fa';

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

const EditExperienceModal = ({ show, onClose, onSubmit, onDelete,  experience , onInputChange }) => {

  const safeExperience = experience || {};
  
  const [selectedStartMonth, setSelectedStartMonth] = useState(safeExperience.startMonth || '');
  const [selectedStartYear, setSelectedStartYear] = useState(safeExperience.startYear || '');
  const [selectedEndMonth, setSelectedEndMonth] = useState(safeExperience.endMonth || '');
  const [selectedEndYear, setSelectedEndYear] = useState(safeExperience.endYear || '');

 
  useEffect(() => {
    console.log('Experience:', safeExperience);
  }, [safeExperience]);


  const handleChange = (e) => {
    onInputChange(e);
  };

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Modifica Esperienza</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body-scroll">
        <Form>
          <Form.Group controlId="formRole">
            <Form.Label>Ruolo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Inserisci il ruolo"
              name="role"
              value={safeExperience.role || ''}
              onChange={onInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formShareNetwork" className="mt-3">
            <Form.Check
              type="checkbox"
              label="Attualmente ricoprto questo ruolo"
            />
          </Form.Group>
          <Form.Group controlId="formCompany">
            <Form.Label>Azienda</Form.Label>
            <Form.Control
              type="text"
              placeholder="Inserisci l'azienda"
              name="company"
              value={safeExperience.company || ''}
              onChange={onInputChange}
            />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group controlId="formStartDate">
                <Form.Label>Data di Inizio</Form.Label>
                <Row>
                  <Col>
                    <Form.Control
                      as="select"
                      name="startMonth"
                      value={selectedStartMonth}
                      onChange={(e) => {
                        setSelectedStartMonth(e.target.value);
                        handleChange(e);
                      }}
                    >
                      <option value="">Mese</option>
                      {[...Array(12).keys()].map(i => (
                        <option key={i} value={i + 1}>{new Date(0, i).toLocaleString('en', { month: 'long' })}</option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col>
                    <Form.Control
                      as="select"
                      name="startYear"
                      value={selectedStartYear}
                      onChange={(e) => {
                        setSelectedStartYear(e.target.value);
                        handleChange(e);
                      }}
                    >
                      <option value="">Anno</option>
                      {Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i).map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </Form.Control>
                  </Col>
                </Row>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="formEndDate">
                <Form.Label>Data di Fine</Form.Label>
                <Row>
                  <Col>
                    <Form.Control
                      as="select"
                      name="endMonth"
                      value={selectedEndMonth}
                      onChange={(e) => {
                        setSelectedEndMonth(e.target.value);
                        handleChange(e);
                      }}
                    >
                      <option value="">Mese</option>
                      {[...Array(12).keys()].map(i => (
                        <option key={i} value={i + 1}>{new Date(0, i).toLocaleString('en', { month: 'long' })}</option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col>
                    <Form.Control
                      as="select"
                      name="endYear"
                      value={selectedEndYear}
                      onChange={(e) => {
                        setSelectedEndYear(e.target.value);
                        handleChange(e);
                      }}
                    >
                      <option value="">Anno</option>
                      {Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i).map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </Form.Control>
                  </Col>
                </Row>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="formDescription">
            <Form.Label>Descrizione</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={safeExperience.description || ''}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formArea">
            <Form.Label>Area</Form.Label>
            <Form.Control
              type="text"
              name="area"
              value={safeExperience.area || ''}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formEmploymentType">
            <Form.Label>Tipo di Impiego</Form.Label>
            <Form.Control
              as="select"
              name="employmentType"
              value={safeExperience.employmentType || ''}
              onChange={handleChange}
            >
              <option value="">Seleziona tipo di impiego</option>
              {employmentTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formLocationType">
            <Form.Label>Tipo di Località</Form.Label>
            <Form.Control
              as="select"
              name="locationType"
              value={safeExperience.locationType || ''}
              onChange={handleChange}
            >
              <option value="">Seleziona tipo di località</option>
              {locationTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </Form.Control>
          </Form.Group>

        </Form>
        <div>
          <h5>Competenze</h5>
          <p>Ti consigliamo di aggiungere le 5 competenze più utilizzate in questo ruolo. Appariranno anche nella sezione Competenze.</p>
          <Button><FaPlus /> Aggiungi Competenza</Button>
        </div>
        <div>
          <h5>Media</h5>
          <p>Aggiungi contenuti multimediali come immagini, documenti, siti o presentazioni. Scopri di più sui tipi di file multimediali supportati</p>
          <Button><FaPlus /> Aggiungi Media</Button>
        </div>
      </Modal.Body>
      <Modal.Footer className='d-flex justify-content-between'>
        <Button variant="secondary" onClick={onClose}>
          Elimina Esperienza
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          Salva
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditExperienceModal;
