import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import './EditExperienceModal.css';

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

const EditExperienceModal = ({ show, onClose, onDelete, onSubmit, experience }) => {
  const [localExperience, setLocalExperience] = useState({
    role: '',
    company: '',
    startMonth: '',
    startYear: '',
    endMonth: '',
    endYear: '',
    description: '',
    area: '',
    employmentType: '',
    locationType: '',
    currentlyInRole: false
  });

  useEffect(() => {
    if (experience) {
      setLocalExperience({
        ...experience,
        startMonth: experience.startDate ? new Date(experience.startDate).getMonth() + 1 : '',
        startYear: experience.startDate ? new Date(experience.startDate).getFullYear() : '',
        endMonth: experience.endDate ? new Date(experience.endDate).getMonth() + 1 : '',
        endYear: experience.endDate ? new Date(experience.endDate).getFullYear() : ''
      });
    } else {
      setLocalExperience({
        role: '',
        company: '',  
        startDate: '',
        endDate: '',
        description: '',
        area: '',
       
        
      });
    }
  }, [experience]);
  const handleDelete = () => {
    if (onDelete) {
      onDelete(experience._id);
    }
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLocalExperience(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = () => {
    onSubmit({
      ...localExperience,
      startDate: localExperience.startYear && localExperience.startMonth ? new Date(localExperience.startYear, localExperience.startMonth - 1).toISOString() : '',
      endDate: localExperience.endYear && localExperience.endMonth ? new Date(localExperience.endYear, localExperience.endMonth - 1).toISOString() : ''
    });
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{experience ? 'Modifica Esperienza' : 'Aggiungi Esperienza'}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body-scroll">
        <Form>
          <Form.Group controlId="formRole">
            <Form.Label>Ruolo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Inserisci il ruolo"
              name="role"
              value={localExperience.role || ''}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formCurrentlyInRole" className="mt-3">
            <Form.Check
              type="checkbox"
              label="Attualmente ricoprto questo ruolo"
              name="currentlyInRole"
              checked={localExperience.currentlyInRole || false}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formCompany">
            <Form.Label>Azienda</Form.Label>
            <Form.Control
              type="text"
              placeholder="Inserisci l'azienda"
              name="company"
              value={localExperience.company || ''}
              onChange={handleChange}
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
                      value={localExperience.startMonth || ''}
                      onChange={handleChange}
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
                      value={localExperience.startYear || ''}
                      onChange={handleChange}
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
                      value={localExperience.endMonth || ''}
                      onChange={handleChange}
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
                      value={localExperience.endYear || ''}
                      onChange={handleChange}
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
              value={localExperience.description || ''}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formArea">
            <Form.Label>Area</Form.Label>
            <Form.Control
              type="text"
              name="area"
              value={localExperience.area || ''}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formEmploymentType">
            <Form.Label>Tipo di Impiego</Form.Label>
            <Form.Control
              as="select"
              name="employmentType"
              value={localExperience.employmentType || ''}
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
              value={localExperience.locationType || ''}
              onChange={handleChange}
            >
              <option value="">Seleziona tipo di località</option>
              {locationTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </Form.Control>
          </Form.Group>

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
        </Form>
      </Modal.Body>
      <Modal.Footer className='d-flex justify-content-between'>
        <Button variant="secondary"  onClick={handleDelete}>
         Elimina
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Salva
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditExperienceModal;