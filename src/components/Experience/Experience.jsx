import { useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import CalculateDuration from '../Format/CalculateDuration';
import AddExperienceModal from '../Modali/AddExperienceModal';
import formatDateSafe from '../Format/FormatDateSafe';
import './Experience.css';
const Experience = ({ userId, isCurrentUser }) => {
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
          throw new Error(`Error ${response.status}`);
        }

        const data = await response.json();
        setExperiences(data);
      } catch (error) {
        setError('Oops! Qualcosa è andato storto nel recuperare le esperienze.');
        console.error('Errore nel recupero delle esperienze:', error);
      }
    };

    fetchExperiences();
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
        throw new Error(`Error ${response.status}`);
      }

      const data = await response.json();
      setExperiences([...experiences, data]);
      closeAddExperienceModal();
    } catch (error) {
      setError('Ops! Qualcosa è andato storto mentre aggiungevi l\'esperienza.');
      console.error('Errore nell\'aggiunta dell\'esperienza:', error);
    }
  };

  



  return (
  <>
  {error && <p className="text-danger">{error}</p>}
  
  <ListGroup className="mt-3">
    {experiences.length > 0 ? (
      experiences.map(exp => (
        <ListGroup.Item key={exp._id} className="d-flex flex-column align-items-start">
          <div className="experience-item">
            <h5 className="role">{exp.role}</h5>
            <p className="company">{exp.company}</p>
            <p className="dates">{formatDateSafe(exp.startDate)} - {formatDateSafe(exp.endDate)} • {CalculateDuration(exp.startDate, exp.endDate)}</p>
            <p className="description">{exp.description}</p>
            <p className="area">{exp.area}</p>
          </div>
        </ListGroup.Item>
      ))
    ) : (
      <p>Nessuna esperienza disponibile</p>
    )}
    
  </ListGroup>
 

      <AddExperienceModal
        show={showAddExperienceModal}
        onClose={closeAddExperienceModal}
        onSubmit={handleAddExperience}
        experience={newExperience}
        onInputChange={(e) => setNewExperience({ ...newExperience, [e.target.name]: e.target.value })}
      />
    </>
  );
};

export default Experience;