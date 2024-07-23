import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner, Alert, Button, Dropdown } from 'react-bootstrap';
import { FaCheckCircle, FaPlus, FaPencilAlt } from 'react-icons/fa';
import ProfileDetails from './ProfileDetails';
import Experience from './Experience';
import AddExperienceModal from './AddExperienceModal';
import AddBreakModal from './AddBreakModal';
import EditExperienceModal from './EditExperienceModal';
import { fetchCurrentUser, addExperience, updateExperience } from '../api/api'; 
import './ProfileHeader.css';

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

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await fetchCurrentUser();
        setCurrentUserId(data._id);
        setIsCurrentUser(true);
        setProfile(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setError('Error fetching profile data.');
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleAddExperienceClick = () => setShowAddExperienceModal(true);
  const handleAddBreakClick = () => setShowAddBreakModal(true);
  const handleEditExperienceClick = (experience) => {
    setEditingExperience(experience);
    setShowEditExperienceModal(true);
  };

  const handleCloseAddExperienceModal = () => setShowAddExperienceModal(false);
  const handleCloseAddBreakModal = () => setShowAddBreakModal(false);
  const handleCloseEditExperienceModal = () => {
    setEditingExperience(null);
    setShowEditExperienceModal(false);
  };

  const handleAddExperienceSubmit = async () => {
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
      console.error('Error adding experience:', error);
      alert('Error adding experience. Please try again.');
    }
  };

  const handleAddBreakSubmit = async () => {
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
      console.error('Error adding work break:', error);
      alert('Error adding work break. Please try again.');
    }
  };

  const handleEditExperienceSubmit = async () => {
    try {
      await updateExperience(currentUserId, editingExperience._id, editingExperience);
      setEditingExperience(null);
      setShowEditExperienceModal(false);
      window.location.reload();
    } catch (error) {
      console.error('Error updating experience:', error);
      alert('Error updating experience. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingExperience) {
      setEditingExperience({ ...editingExperience, [name]: value });
    } else {
      setNewExperience({ ...newExperience, [name]: value });
    }
  };

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (isLoading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
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
                alt="Background header"
                className="header-bg"
              />
              <img
                src={profile.image || 'https://via.placeholder.com/150'}
                alt={`${profile.name}'s profile`}
                className="rounded-circle profile-avatar"
              />
              {isCurrentUser ? (
                <Button
                  variant="link"
                  className="position-absolute top-0 end-0 m-3"
                  onClick={() => window.location.href = '/profile-header'}
                >
                  <i className="bi bi-pencil-fill"></i>
                </Button>
              ) : (
                <Button
                  variant="link"
                  className="position-absolute top-0 end-0 m-3"
                  onClick={() => alert('Editing not allowed for other users')}
                >
                  <i className="bi bi-pencil-fill"></i>
                </Button>
              )}
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={12} className="d-flex flex-column">
                  <div className="profile-name-container">
                    <h2 className="profile-name">
                      {profile.name} {profile.surname}
                    </h2>
                    {isCurrentUser && (
                      <div className="verification-box ms-3">
                        <FaCheckCircle className="verification-icon" />
                        <span className="verification-text">Verifica ora</span>
                      </div>
                    )}
                  </div>
                  <div className="profile-details mt-2">
                    <h4>{profile.title}</h4>
                    <p>{profile.area}</p>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col md={12}>
          {profile.bio && <ProfileDetails profileBio={profile.bio} />}
        </Col>
        <Col md={12} className="mt-4">
          <Card className="mb-4">
            <Card.Body className="d-flex flex-column">
              <h5>Esperienze</h5>
              {isCurrentUser && (
                <Dropdown>
                  <Dropdown.Toggle as={Button} variant="link">
                    <FaPlus />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={handleAddExperienceClick}>
                      <FaPencilAlt /> Aggiungi Posizione Lavorativa
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleAddBreakClick}>
                      <FaPencilAlt /> Aggiungi Pausa Lavorativa
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
              <Experience userId={currentUserId} isCurrentUser={isCurrentUser} onEditClick={handleEditExperienceClick} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <AddExperienceModal
        show={showAddExperienceModal}
        onClose={handleCloseAddExperienceModal}
        onSubmit={handleAddExperienceSubmit}
        experience={newExperience}
        onInputChange={handleInputChange}
      />

      <AddBreakModal
        show={showAddBreakModal}
        onClose={handleCloseAddBreakModal}
        onSubmit={handleAddBreakSubmit}
        experience={newExperience}
        onInputChange={handleInputChange}
      />

      <EditExperienceModal
        show={showEditExperienceModal}
        onClose={handleCloseEditExperienceModal}
        onSubmit={handleEditExperienceSubmit}
        experience={editingExperience}
        onInputChange={handleInputChange}
      />
    </Container>
  );
}

export default ProfileHeader;
