import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner, Alert, Button, Dropdown } from 'react-bootstrap';
import { FaCheckCircle, FaPlus, FaPencilAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; 
import ProfileDetails from './ProfileDetails';
import Experience from './Experience';
import AddExperienceModal from './AddExperienceModal';
import AddBreakModal from './AddBreakModal';
import EditExperienceModal from './EditExperienceModal';
import { fetchCurrentUser, addExperience, updateExperience } from '../api/api'; 
import './ProfileHeader.css';
import CardCarousel from './CardCarousel';

const ProfileHeader = () => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [isCurrentUser, setIsCurrentUser] = useState(false);

  const [showAddExperienceModal, setShowAddExperienceModal] = useState(false);
  const [showAddBreakModal, setShowAddBreakModal] = useState(false);
  const [showEditExperienceModal, setShowEditExperienceModal] = useState(false);
  const [newExperience, setNewExperience] = useState({
    role: '',
    company: '',
    startDate: '',
    endDate: '',
    description: '',
    area: '',
  });
  const [editingExperience, setEditingExperience] = useState(null);

  const navigate = useNavigate(); 

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const userData = await fetchCurrentUser();
        setCurrentUserId(userData._id);
        setIsCurrentUser(true);
        setProfile(userData);
      } catch (error) {
        console.error('C’è stato un problema nel caricare i dati del profilo:', error);
        setError('Ops! Non siamo riusciti a caricare il tuo profilo. Riprova più tardi.');
      } finally {
        setIsLoading(false);
      }
    };

    loadUserProfile();
  }, []);

  const handleAddExperience = () => setShowAddExperienceModal(true);
  const handleAddBreak = () => setShowAddBreakModal(true);
  const handleOpenEditExperienceModal = (experience) => {
    setEditingExperience(experience);
    setShowEditExperienceModal(true);
  };

  const closeAddExperienceModal = () => setShowAddExperienceModal(false);
  const closeAddBreakModal = () => setShowAddBreakModal(false);
  const closeEditExperienceModal = () => {
    setEditingExperience(null);
    setShowEditExperienceModal(false);
  };

  const submitNewExperience = async () => {
    try {
      await addExperience(currentUserId, newExperience);
      setNewExperience({
        role: '',
        company: '',
        startDate: '',
        endDate: '',
        description: '',
        area: '',
      });
      setShowAddExperienceModal(false);
      window.location.reload(); 
    } catch (error) {
      console.error('Errore nell\'aggiungere una nuova esperienza:', error);
      alert('Ops! Qualcosa è andato storto mentre aggiungevi la tua esperienza. Riprova.');
    }
  };

  const submitBreakExperience = async () => {
    const breakExperience = {
      role: 'Break',
      company: 'N/A',
      startDate: newExperience.startDate,
      endDate: newExperience.endDate,
      description: newExperience.description,
      area: 'N/A',
    };

    try {
      await addExperience(currentUserId, breakExperience);
      setShowAddBreakModal(false);
      window.location.reload(); 
    } catch (error) {
      console.error('Errore nell\'aggiungere una pausa:', error);
      alert('Ops! C’è stato un problema nell\'aggiungere la pausa. Riprova.');
    }
  };

  const submitEditExperience = async (updatedExperience) => {
    try {
      await updateExperience(currentUserId, updatedExperience._id, updatedExperience);
      setEditingExperience(null);
      setShowEditExperienceModal(false);
      window.location.reload(); 
    } catch (error) {
      console.error('Errore nell\'aggiornare l\'esperienza:', error);
      alert('Oops! Non siamo riusciti ad aggiornare l\'esperienza. Riprova.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingExperience) {
      setEditingExperience(prev => ({ ...prev, [name]: value }));
    } else {
      setNewExperience(prev => ({ ...prev, [name]: value }));
    }
  };

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (isLoading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Caricamento...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="user-profile-container mt-4">
      <Row>
        <Col md={12}>
          <Card className="user-profile-card mb-4">
            <Card.Header className="p-0 position-relative">
              <img
                src="https://picsum.photos/640/480"
                alt="Profilo di sfondo"
                className="header-bg"
              />
              <img
                src={profile.image || 'https://via.placeholder.com/150'}
                alt={`${profile.name}'s avatar`}
                className="rounded-circle profile-avatar"
              />
            </Card.Header>
            <Card.Body className="position-relative pt-0">
              <Row>
                <Col md={12} className="d-flex justify-content-end">
                  <Button
                    variant="button"
                  >
                    <FaPencilAlt />
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col md={12} className="d-flex flex-column">
                  <div className="profile-name-container">
                    <h2 className="profile-name">
                      {profile.name} {profile.surname}
                    </h2>
                    {isCurrentUser && (
                      <div className="verification-box mt-4">
                        <FaCheckCircle className="verification-icon" />
                        <span className="verification-text">Verifica ora</span>
                      </div>
                    )}
                  </div>
                  <div className="profile-details mt-2">
                    <h4>{profile.title}</h4>
                    <p className="location-and-contact">
                      {profile.area}
                      <Button variant="link">
                        Informazioni di contatto
                      </Button>
                    </p>
                  </div>
                  <div className="profile-actions">
                    <Button variant="primary" className="me-2 rounded-5">
                      Disponibile per
                    </Button>
                    <Button
                      variant="button"
                      className="me-2 rounded-5 border-1 border-primary text-primary"
                    >
                      Aggiungi sezione
                    </Button>
                    <Button variant="button" className="rounded-5 border-1 border-black">
                      Altro
                    </Button>
                  </div>
                </Col>
              </Row>
              <Col md={12} className="mt-4">
                <CardCarousel />
              </Col>
            </Card.Body>
          </Card>
        </Col>
        <Col md={12}>{profile.bio && <ProfileDetails profileBio={profile.bio} />}</Col>
        <Col md={12} className="mt-4">
          <Card className="mb-4">
            <Card.Body className="d-flex flex-column">
              <div className="d-flex align-items-center justify-content-between">
                <h5>Esperienza</h5>

                <div className="d-flex">
                  <Dropdown className="me-2">
                    <Dropdown.Toggle as={Button} variant="link">
                      <FaPlus />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={handleAddExperience}>
                        <FaPencilAlt /> Aggiungi Posizione Lavorativa
                      </Dropdown.Item>
                      <Dropdown.Item onClick={handleAddBreak}>
                        <FaPencilAlt /> Aggiungi Pausa Lavorativa
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Button
                    variant="button"
                    onClick={() => navigate(`/edit-experience/${currentUserId}`)} 
                  >
                    <FaPencilAlt />
                  </Button>
                </div>
              </div>
              <Experience
                userId={currentUserId}
                isCurrentUser={isCurrentUser}
                onEditClick={handleOpenEditExperienceModal}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <AddExperienceModal
        show={showAddExperienceModal}
        onClose={closeAddExperienceModal}
        onSubmit={submitNewExperience}
        experience={newExperience}
        onInputChange={handleInputChange}
      />

      <AddBreakModal
        show={showAddBreakModal}
        onClose={closeAddBreakModal}
        onSubmit={submitBreakExperience}
        experience={newExperience}
        onInputChange={handleInputChange}
      />

      <EditExperienceModal
        show={showEditExperienceModal}
        onClose={closeEditExperienceModal}
        onSubmit={submitEditExperience}
        experience={editingExperience}
        onInputChange={handleInputChange}
      />
    </Container>
  );
};

export default ProfileHeader;
