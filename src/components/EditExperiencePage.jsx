import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, ListGroup, Card } from 'react-bootstrap';
import { FaTrash, FaEdit, FaPlus, FaArrowLeft } from 'react-icons/fa'; 
import EditExperienceModal from './EditExperienceModal';
import AddExperienceModal from './AddExperienceModal';
import CalculateDuration from './CalculateDuration';
import formatDateSafe from './FormatDateSafe';

const EditExperiencePage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [experiences, setExperiences] = useState([]);
  const [showAddExperienceModal, setShowAddExperienceModal] = useState(false);
  const [showEditExperienceModal, setShowEditExperienceModal] = useState(false);
  const [currentExperience, setCurrentExperience] = useState(null);
  const [newExperience, setNewExperience] = useState({
    role: '',
    company: '',
    startDate: '',
    endDate: '',
    description: '',
    area: ''
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      const url = `https://striveschool-api.herokuapp.com/api/profile/${userId}/experiences`;
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
          throw new Error(`Error ${response.status}: Unable to fetch experiences`);
        }

        const data = await response.json();
        setExperiences(data);
      } catch (error) {
        setError('Oops! C\'è stato un problema nel recuperare le esperienze.');
        console.error('Errore nel recupero delle esperienze:', error);
      }
    };

    if (userId) {
      fetchExperiences();
    } else {
      console.error('ID utente mancante');
    }
  }, [userId]);

  const openAddExperienceModal = () => {
    setNewExperience({
      role: '',
      company: '',
      startDate: '',
      endDate: '',
      description: '',
      area: ''
    });
    setShowAddExperienceModal(true);
  };

  const closeAddExperienceModal = () => setShowAddExperienceModal(false);

  const openEditExperienceModal = (experience) => {
    setCurrentExperience(experience);
    setNewExperience({
      role: experience.role,
      company: experience.company,
      startDate: experience.startDate,
      endDate: experience.endDate,
      description: experience.description,
      area: experience.area
    });
    setShowEditExperienceModal(true);
  };

  const closeEditExperienceModal = () => {
    setShowEditExperienceModal(false);
    setCurrentExperience(null);
  };

  const handleAddExperience = async () => {
    const url = `https://striveschool-api.herokuapp.com/api/profile/${userId}/experiences`;
    const token = process.env.REACT_APP_JWT_TOKEN;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newExperience),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: Unable to add experience`);
      }

      const data = await response.json();
      setExperiences([...experiences, data]);
      closeAddExperienceModal();
    } catch (error) {
      setError('Qualcosa è andato storto mentre aggiungevi l\'esperienza.');
      console.error('Errore nell\'aggiunta dell\'esperienza:', error);
    }
  };

  const handleEditExperience = async () => {
    if (!currentExperience) return;

    const url = `https://striveschool-api.herokuapp.com/api/profile/${userId}/experiences/${currentExperience._id}`;
    const token = process.env.REACT_APP_JWT_TOKEN;

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newExperience),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: Unable to update experience`);
      }

      const data = await response.json();
      setExperiences(experiences.map(exp => exp._id === data._id ? data : exp));
      closeEditExperienceModal();
    } catch (error) {
      setError('Oops! C\'è stato un problema nell\'aggiornamento dell\'esperienza.');
      console.error('Errore nell\'aggiornamento dell\'esperienza:', error);
    }
  };

  const handleDeleteExperience = async (id) => {
    const url = `https://striveschool-api.herokuapp.com/api/profile/${userId}/experiences/${id}`;
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
        throw new Error(`Error ${response.status}: Unable to delete experience`);
      }

      setExperiences(experiences.filter(exp => exp._id !== id));
    } catch (error) {
      setError('Qualcosa è andato storto mentre eliminavi l\'esperienza.');
      console.error('Errore nella cancellazione dell\'esperienza:', error);
    }
  };

 
  const handleGoBack = () => {
    navigate(-1); 
  };

  return (
    <div className="container mt-4">
      <Card>
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <Button variant="link" onClick={handleGoBack} className="me-3">
                <FaArrowLeft /> 
              </Button>
              <h2>Esperienze</h2>
            </div>
            <Button variant="primary" onClick={openAddExperienceModal}>
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
                  <div className="mb-3 mb-md-0">
                    <h5>{exp.role}</h5>
                    <p>{exp.company}</p>
                    <p>{formatDateSafe(exp.startDate)} - {formatDateSafe(exp.endDate)} • {CalculateDuration(exp.startDate, exp.endDate)}</p>
                    <p>{exp.description}</p>
                    <p>{exp.area}</p>
                  </div>
                  
                  <div className="d-flex align-items-center">
                    <Button
                      variant="link"
                      className="me-2"
                      onClick={() => openEditExperienceModal(exp)}
                    >
                      <FaEdit /> 
                    </Button>
                    <Button
                      variant="link"
                      onClick={() => handleDeleteExperience(exp._id)}
                    >
                      <FaTrash /> 
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
          experience={newExperience}
          onInputChange={(e) => setNewExperience({ ...newExperience, [e.target.name]: e.target.value })}
        />
      )}
    </div>
  );
};

export default EditExperiencePage;
