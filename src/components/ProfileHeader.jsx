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
    const loadUserProfile = async () => {
      try {
        const userData = await fetchCurrentUser();
        setCurrentUserId(userData._id);
        setIsCurrentUser(true);
        setProfile(userData);
      } catch (error) {
        console.error('Failed to fetch profile data:', error);
        setError('Sorry, we couldn’t load your profile. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadUserProfile();
  }, []);

  const handleAddExperience = () => setShowAddExperienceModal(true);
  const handleAddBreak = () => setShowAddBreakModal(true);
  const handleEditExperience = (experience) => {
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
      window.location.reload(); // Refreshing to reflect new data
    } catch (error) {
      console.error('Error adding new experience:', error);
      alert('Oops! Something went wrong while adding your experience. Please try again.');
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
      console.error('Error adding break:', error);
      alert('Something went wrong while adding the break. Please try again.');
    }
  };

  const submitEditExperience = async (updatedExperience) => {
    try {
      await updateExperience(currentUserId, updatedExperience._id, updatedExperience);
      setEditingExperience(null);
      setShowEditExperienceModal(false);
      window.location.reload();
    } catch (error) {
      console.error('Error updating experience:', error);
      alert('Failed to update the experience. Please try again.');
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
                alt="Profile background"
                className="header-bg"
              />
              <img
                src={profile.image || 'https://via.placeholder.com/150'}
                alt={`${profile.name}'s avatar`}
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
                  onClick={() => alert('Editing is restricted to the profile owner.')}
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
                        <span className="verification-text">Verify Now</span>
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
              <h5>Experience</h5>
              {isCurrentUser && (
                <Dropdown>
                  <Dropdown.Toggle as={Button} variant="link">
                    <FaPlus />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={handleAddExperience}>
                      <FaPencilAlt /> Add Job Position
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleAddBreak}>
                      <FaPencilAlt /> Add Work Break
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
              <Experience userId={currentUserId} isCurrentUser={isCurrentUser} onEditClick={handleEditExperience} />
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
}

export default ProfileHeader;
