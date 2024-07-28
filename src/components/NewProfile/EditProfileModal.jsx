import { Modal, Form, Button } from 'react-bootstrap';
import { PlusLg } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { InfoSquareFill } from 'react-bootstrap-icons';
const EditProfileModal = ({
  show,
  handleClose,
  profileToEdit,
  handleInput,
  handleEducation,
  showEducation,
  setFormData,
  handleSubmit,
  uploadProfileImage,
}) => {
  return (
    <Modal id='profile-edit-form-modal' show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modifica introduzione</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p id='edit-profile-form-required-notice'>* Indica che è obbligatorio</p>
        <Form>
          <Form.Group controlId='firstName'>
            <Form.Label>Nome*</Form.Label>
            <Form.Control
              type='text'
              required
              value={profileToEdit.name}
              onChange={(e) => handleInput('name', e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='lastName'>
            <Form.Label>Cognome*</Form.Label>
            <Form.Control
              type='text'
              required
              value={profileToEdit.surname}
              onChange={(e) => handleInput('surname', e.target.value)}
            />
          </Form.Group>
          <p className='profile-form-small-notice'>Name aggiuntivo</p>
          <InfoSquareFill />{' '}
          <span>
            Può essere aggiunta solo usando la nostra app per dispositivi mobili
          </span>
          <Form.Group controlId='profile-edit-form-pronouns'>
            <Form.Label>Inserisci pronomi personalizzati</Form.Label>
            <Form.Control as='select' placeholder='Please select'>
              <option>Lei</option>
              <option>Lui</option>
              <option>Egli</option>
              <option>Altro</option>
            </Form.Control>
            <p className='profile-form-small-notice'>
              Indica i pronomi di genere che vuoi che gli altri usino per
              riferirsi a te.
            </p>
            <p>
              <Link to='/'>Scopri di più sui pronomi di genere.</Link>
            </p>
          </Form.Group>
          <div id='showEducation' className='mb-3'>
            <input
              type='checkbox'
              id='showEducationCheckbox'
              name='showEducationCheckbox'
              onChange={(e) => handleEducation(e.target.checked)}
              checked={showEducation}
            />
            <label htmlFor='showEducationCheckbox' className='ml-2 mt-3'>
              Mostra l'istruzione nella mia introduzione
            </label>
          </div>
          <Form.Group controlId='location'>
            <Form.Label>Luogo</Form.Label>
            <Form.Control
              type='text'
              placeholder='Es: Londra, Berlino'
              required
              value={profileToEdit.area}
              onChange={(e) => handleInput('area', e.target.value)}
            />
            <Form.Control
              type='text'
              placeholder='CAP'
              value={profileToEdit.bio}
              onChange={(e) => handleInput('bio', e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <div className='form-label'>
              <p>Foto profilo</p>
              <p>Aggiungi nuova immagine profilo</p>
            </div>
            <Form.Label
              id='choose-file-label'
              className='mt-3 btn btn-outline-primary'
              htmlFor='choose-file-btn'
            >
              <PlusLg id='plus-icon-add-media' size={18} /> Selezione nuova
              immagine
            </Form.Label>
            <Form.Control
              id='choose-file-btn'
              type='file'
              onChange={(event) => {
                setFormData(event.target.files[0]);
              }}
            />
          </Form.Group>
          <Button
            className='save-profile-btn btn-sm'
            onClick={uploadProfileImage}
          >
            Carica
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer className={'d-flex justify-content-end'}>
        <Button id='save-profile-btn' className='px-3 py-1' onClick={handleSubmit}>
          Salva
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProfileModal;