import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner, Alert, Button, Dropdown } from 'react-bootstrap';
import { FaPlus, FaPencilAlt } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import Experience from '../Experience/Experience';
import AddExperienceModal from '../Modali/AddExperienceModal';
import AddBreakModal from '../Modali/AddBreakModal';
import EditExperienceModal from '../Modali/EditExperienceModal';
import { fetchCurrentUser, addExperience, updateExperience, uploadProfileImage, fetchUserProfile } from '../../api/api';
import './ProfileHeader.css';
import EditProfileModal from './EditProfileModal';

const ProfileHeader = ({ userId: propUserId }) => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [isCurrentUser, setIsCurrentUser] = useState(false);

  const [showAddExperienceModal, setShowAddExperienceModal] = useState(false);
  const [showAddBreakModal, setShowAddBreakModal] = useState(false);
  const [showEditExperienceModal, setShowEditExperienceModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [newExperience, setNewExperience] = useState({
    role: '',
    company: '',
    startDate: '',
    endDate: '',
    description: '',
    area: '',
  });
  const [editingExperience, setEditingExperience] = useState(null);

  const [profileImage, setProfileImage] = useState(null);
  const [showImageUpload, setShowImageUpload] = useState(false);

  const navigate = useNavigate();
  const { userId: paramsUserId } = useParams(); 

  const loadUserProfile = async (userId) => {
    setIsLoading(true);
    try {
      const currentUser = await fetchCurrentUser();
      setCurrentUserId(currentUser._id);

      const targetUserId = userId || currentUser._id; 
      setIsCurrentUser(targetUserId === currentUser._id);

      const userProfile = await fetchUserProfile(targetUserId);
      setProfile(userProfile);
    } catch (error) {
      console.error('C’è stato un problema nel caricare i dati del profilo:', error);
      setError('Ops! Non siamo riusciti a caricare il tuo profilo. Riprova più tardi.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const effectiveUserId = propUserId || paramsUserId;
    loadUserProfile(effectiveUserId);
  }, [propUserId, paramsUserId]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(file);
    }
  };

  const handleUploadImage = async () => {
    if (profileImage) {
      try {
        await uploadProfileImage(currentUserId, profileImage);
        loadUserProfile(currentUserId);
        setProfileImage(null);
        setShowImageUpload(false);
      } catch (error) {
        console.error("Errore nel caricamento dell'immagine:", error);
        alert("Ops! Qualcosa è andato storto durante il caricamento dell'immagine.");
      }
    }
  };

  const handleImageUploadClick = () => setShowImageUpload(true);

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
      loadUserProfile(currentUserId); 
    } catch (error) {
      console.error("Errore nell'aggiungere una nuova esperienza:", error);
      alert("Ops! Qualcosa è andato storto mentre aggiungevi la tua esperienza. Riprova.");
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
      loadUserProfile(currentUserId); 
    } catch (error) {
      console.error("Errore nell'aggiungere una pausa:", error);
      alert("Ops! C’è stato un problema nell'aggiungere la pausa. Riprova.");
    }
  };

  const submitEditExperience = async (updatedExperience) => {
    try {
      await updateExperience(currentUserId, updatedExperience._id, updatedExperience);
      setEditingExperience(null);
      setShowEditExperienceModal(false);
      loadUserProfile(currentUserId); 
    } catch (error) {
      console.error("Errore nell'aggiornare l'esperienza:", error);
      alert("Oops! Non siamo riusciti ad aggiornare l'esperienza. Riprova.");
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
    <div className="user-profile-container mt-4">
      <Card className="mb-4 user-profile-card">
        <Card.Header className="p-0 position-relative">
          <img
            src="https://picsum.photos/640/480"
            alt="Profilo di sfondo"
            className="header-bg w-100"
          />
          <div className="avatar-container">
            <img
              src={profile.image || 'https://via.placeholder.com/150'}
              alt={`${profile.name}'s avatar`}
              className="rounded-circle profile-avatar"
            />
            
          </div>
          {isCurrentUser && (
            <Button
              variant="link"
              className="position-absolute top-0 end-0 mt-2 me-2"
              onClick={() => setShowEditProfileModal(true)}
            >
              <FaPencilAlt />
            </Button>
          )}
        </Card.Header>
        <Card.Body>
          <Row>
            <Col xs={12} md={8}>
              <div className="user__detail">
                <div className="user-detail-main mt-5">
                  <h4 className="name mb-0">
                    {profile.name} {profile.surname}
                  </h4>
                  {profile.bio && <p className="user-bio">{profile.bio}</p>}
                  <p className="my-0 occupation">{profile.title}</p>
                  <p className="my-0 location text-muted">{profile.area}</p>
                  <p className="my-2 connections">
                    580 follower - 951 collegamenti
                  </p>
                  {isCurrentUser && (
                    <div className="d-flex justify-content-start w-100">
                      <Button className="profile__button open-to-btn rounded-5">
                        Disponibile per
                      </Button>
                      <Button
                        variant="outline-primary"
                        className="add__btn profile__button mx-3 rounded-5"
                      >
                        Aggiungi sezione profilo
                      </Button>
                      <Button variant="outline-secondary" className="profile__button rounded-5">
                        Altro
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </Col>
            <Col xs={12} md={4}>
              <div className="user-detail-education">
                <ul className='list-unstyled'>
                  <li className="education mb-1">
                    <img
                      src="https://strive.school/favicon.ico"
                      alt="Strive school"
                      style={{ width: '3em', height: '3em' }}
                      className="mr-2"
                    />{' '}
                    Strive school
                  </li>
                  <li className="education">
                    <img
                      src="https://www.schema17project.com/wp-content/uploads/2020/10/logo-palla-291x300.png"
                      alt="Tech University"
                      style={{ width: '3em', height: '3em' }}
                      className="mr-2"
                    />{' '}
                    Tech University
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>


      <div className="mb-4">
        <Card className="mb-4">
          <Card.Body className="d-flex flex-column mt-0 pt-1">
            <Row>
              <Col xs={12} className="d-flex align-items-center justify-content-between">
                <h5>Esperienza</h5>
                {isCurrentUser && (
                  <div className="d-flex">
                    <Dropdown className="me-2">
                      <Dropdown.Toggle as={Button} variant="link" className="no-caret">
                        <FaPlus className="text-black" />
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
                )}
              </Col>
              <Col xs={12}>
                <Experience
                  userId={profile._id} 
                  experiences={profile.experiences} 
                  isCurrentUser={isCurrentUser}
                  onEditClick={handleOpenEditExperienceModal}
                />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>

      <EditProfileModal
        show={showEditProfileModal}
        handleClose={() => setShowEditProfileModal(false)}
        profileToEdit={profile}
        handleInput={(field, value) => setProfile((prev) => ({ ...prev, [field]: value }))}
        handleEducation={(showEducation) => setProfile((prev) => ({ ...prev, showEducation }))}
        showEducation={profile.showEducation || false}
        setFormData={(file) => setProfileImage(file)}
        handleSubmit={async () => {
          if (profileImage) {
            await uploadProfileImage(currentUserId, profileImage);
            loadUserProfile(currentUserId); 
            setProfileImage(null);
          }
          setShowEditProfileModal(false);
        }}
        uploadProfileImage={handleUploadImage}
      />

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
    </div>
  );
};

export default ProfileHeader;