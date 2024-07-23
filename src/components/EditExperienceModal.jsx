import { Modal, Form, Button } from 'react-bootstrap';

const EditExperienceModal = ({ show, onClose, onSubmit, experience = {}, onInputChange }) => {

  const safeExperience = experience || {};

  const handleChange = (e) => {
    onInputChange(e);
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modifica Esperienza</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formRole">
            <Form.Label>Ruolo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Es. Sviluppatore Front-End"
              name="role"
              value={safeExperience.role || ''}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formCompany">
            <Form.Label>Azienda</Form.Label>
            <Form.Control
              type="text"
              placeholder="Es. Google"
              name="company"
              value={safeExperience.company || ''}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formStartDate">
            <Form.Label>Data di Inizio</Form.Label>
            <Form.Control
              type="date"
              name="startDate"
              value={safeExperience.startDate || ''}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formEndDate">
            <Form.Label>Data di Fine</Form.Label>
            <Form.Control
              type="date"
              name="endDate"
              value={safeExperience.endDate || ''}
              onChange={handleChange}
            />
          </Form.Group>
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
            <Form.Label>Settore</Form.Label>
            <Form.Control
              type="text"
              name="area"
              value={safeExperience.area || ''}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Annulla
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          Salva
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditExperienceModal;
