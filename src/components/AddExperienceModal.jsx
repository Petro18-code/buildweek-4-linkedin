import { Modal, Form, Button } from 'react-bootstrap';

const AddExperienceModal = ({ show, onClose, onSubmit, experience = {}, onInputChange }) => {
 
  const handleChange = (e) => {
    onInputChange(e);
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Aggiungi Nuova Esperienza</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formRole">
            <Form.Label>Ruolo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Es. Sviluppatore Front-End"
              name="role"
              value={experience.role || ''}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formCompany">
            <Form.Label>Azienda</Form.Label>
            <Form.Control
              type="text"
              placeholder="Es. Google"
              name="company"
              value={experience.company || ''}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formStartDate">
            <Form.Label>Data di Inizio</Form.Label>
            <Form.Control
              type="date"
              name="startDate"
              value={experience.startDate || ''}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formEndDate">
            <Form.Label>Data di Fine</Form.Label>
            <Form.Control
              type="date"
              name="endDate"
              value={experience.endDate || ''}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Descrizione</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={experience.description || ''}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formArea">
            <Form.Label>Settore</Form.Label>
            <Form.Control
              type="text"
              name="area"
              value={experience.area || ''}
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
          Aggiungi
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddExperienceModal;
