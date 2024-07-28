import { useState, useEffect } from 'react';
import { Button, ListGroup, Card } from 'react-bootstrap';
import { FaPlus, FaPencilAlt, FaTrashAlt, FaArrowLeft } from 'react-icons/fa';
import EditExperienceModal from '../Modali/EditExperienceModal';
import AddExperienceModal from '../Modali/AddExperienceModal'; 
import FormatDateSafe from '../Format/FormatDateSafe';
import CalculateDuration from '../Format/CalculateDuration';
import { useNavigate } from 'react-router-dom';
import { fetchCurrentUser } from '../../api/api';

const EditExperiencePage = () => {
  const [experiences, setExperiences] = useState([]);
  const [showAddExperienceModal, setShowAddExperienceModal] = useState(false);
  const [showEditExperienceModal, setShowEditExperienceModal] = useState(false);
  const [currentExperience, setCurrentExperience] = useState(null);
  const [error, setError] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const navigate = useNavigate();
  const [newExperience, setNewExperience] = useState({
    role: '',
    company: '',
    startDate: '',
    endDate: '',
    description: '',
    area: ''
  });

 
  useEffect(() => {
    const loadCurrentUser = async () => {
      try {
        const user = await fetchCurrentUser();
        setCurrentUserId(user._id);
      } catch (err) {
        console.error('Errore nel recuperare l\'utente corrente:', err);
        setError('Impossibile recuperare i dati dell\'utente.');
      }
    };

    loadCurrentUser();
  }, []);

  useEffect(() => {
    if (currentUserId) {
      fetchExperiences();
    }
  }, [currentUserId]);

  const fetchExperiences = async () => {
    const url = `https://striveschool-api.herokuapp.com/api/profile/${currentUserId}/experiences`;
    const token = process.env.REACT_APP_JWT_TOKEN;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Errore ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      setExperiences(data);
    } catch (err) {
      setError(`Oops! C'è stato un problema nel recuperare le esperienze: ${err.message}`);
      console.error('Errore nel recupero delle esperienze:', err);
    }
  };

 
  const handleAddExperience = async (experience) => {
    const url = `https://striveschool-api.herokuapp.com/api/profile/${currentUserId}/experiences`;
    const token = process.env.REACT_APP_JWT_TOKEN;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(experience),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Errore ${response.status}: ${errorText}`);
      }

      fetchExperiences();
      setShowAddExperienceModal(false);
    } catch (err) {
      setError(`Oops! C'è stato un problema nell'aggiunta dell'esperienza: ${err.message}`);
      console.error('Errore nell\'aggiunta dell\'esperienza:', err);
    }
  };

  const openAddExperienceModal = () => setShowAddExperienceModal(true);
  const closeAddExperienceModal = () => setShowAddExperienceModal(false);

 
  const openEditExperienceModal = (experience) => {
    setCurrentExperience(experience);
    setShowEditExperienceModal(true);
  };

  const closeEditExperienceModal = () => {
    setShowEditExperienceModal(false);
    setCurrentExperience(null);
  };

  
  const handleEditExperience = async (updatedExperience) => {
    const url = `https://striveschool-api.herokuapp.com/api/profile/${currentUserId}/experiences/${updatedExperience._id}`;
    const token = process.env.REACT_APP_JWT_TOKEN;

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedExperience),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Errore ${response.status}: ${errorData.message || 'Impossibile aggiornare l\'esperienza'}`);
      }

      fetchExperiences();
      closeEditExperienceModal();
    } catch (err) {
      setError(`Oops! C'è stato un problema nell'aggiornamento dell'esperienza: ${err.message}`);
      console.error('Errore nell\'aggiornamento dell\'esperienza:', err);
    }
  };


  const handleDeleteExperience = async (id) => {
    const url = `https://striveschool-api.herokuapp.com/api/profile/${currentUserId}/experiences/${id}`;
    const token = process.env.REACT_APP_JWT_TOKEN;

    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Errore ${response.status}: ${errorText}`);
      }

      fetchExperiences();
    } catch (err) {
      setError(`Oops! C'è stato un problema nella cancellazione dell'esperienza: ${err.message}`);
      console.error('Errore nella cancellazione dell\'esperienza:', err);
    }
  };

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentExperience(prev => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleGoBack = () => navigate(-1);

  return (
    <div className="container mt-4">
      <Card>
        <Card.Body className='mt-0 pt-0'>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <Button 
                variant="link" 
                className='text-black me-3 prev rounded-circle' 
                onClick={handleGoBack}
              >
                <FaArrowLeft /> 
              </Button>
              <h2>Esperienze</h2>
            </div>
            <Button 
              variant="link" 
              className='btn-link text-black' 
              onClick={openAddExperienceModal}
            >
              <FaPlus /> 
            </Button>
          </div>

          {error && <p className="text-danger">{error}</p>}
          
          <ListGroup className="mt-3">
            {experiences.length > 0 ? (
              experiences.map(exp => (
                <ListGroup.Item 
                  key={exp._id} 
                  className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3"
                >
                  <div className="mb-1 mb-md-0">
                    <h5 className='pb-0 mb-0'>{exp.role}</h5>
                    <p className='pb-0 mb-0'>{exp.company}</p>
                    <p className='pb-0 mb-0'>{FormatDateSafe(exp.startDate)} - {FormatDateSafe(exp.endDate)} • {CalculateDuration(exp.startDate, exp.endDate)}</p>
                    <p className='pb-0 mb-0'>{exp.description}</p>
                    <p>{exp.area}</p>
                  </div>
                  <div className="d-flex align-items-end">
                    <Button
                      variant="link"
                      className="me-2"
                      onClick={() => openEditExperienceModal(exp)}
                    >
                      <FaPencilAlt className='text-black'/>
                    </Button>
                  </div>
                </ListGroup.Item>
              ))
            ) : (
              <p>Nessuna esperienza trovata.</p>
            )}
          </ListGroup>
        </Card.Body>
      </Card>

      <AddExperienceModal
        show={showAddExperienceModal}
        onClose={closeAddExperienceModal}
        onSubmit={handleAddExperience}
        experience={newExperience}
        onInputChange={(e) => setNewExperience({ ...newExperience, [e.target.name]: e.target.value })}
      />

      {currentExperience && (
        <EditExperienceModal
          show={showEditExperienceModal}
          onClose={closeEditExperienceModal}
          onSubmit={handleEditExperience}
          experience={currentExperience}
          onDelete={handleDeleteExperience}
          onInputChange={handleInputChange}
        />
      )}
    </div>
  );
};

export default EditExperiencePage;