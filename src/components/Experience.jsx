import { useEffect, useState } from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { FaTrash, FaEdit } from 'react-icons/fa';
import AddExperienceModal from './AddExperienceModal'; 
import EditExperienceModal from './EditExperienceModal'; 

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
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setExperiences(data);
      } catch (error) {
        setError('Error fetching experiences.');
        console.error('Error fetching experiences:', error);
      }
    };

    fetchExperiences();
  }, [userId]);

  const handleShowAddExperienceModal = () => {
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

  const handleCloseAddExperienceModal = () => setShowAddExperienceModal(false);

  const handleShowEditExperienceModal = (experience) => {
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

  const handleCloseEditExperienceModal = () => {
    setShowEditExperienceModal(false);
    setCurrentExperience(null);
  };

  const handleAddExperienceSubmit = async () => {
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
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setExperiences([...experiences, data]);
      handleCloseAddExperienceModal();
    } catch (error) {
      setError('Error adding experience.');
      console.error('Error adding experience:', error);
    }
  };

  const handleEditExperienceSubmit = async () => {
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
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setExperiences(experiences.map(exp => exp._id === data._id ? data : exp));
      handleCloseEditExperienceModal();
    } catch (error) {
      setError('Error updating experience.');
      console.error('Error updating experience:', error);
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
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setExperiences(experiences.filter(exp => exp._id !== id));
    } catch (error) {
      setError('Error deleting experience.');
      console.error('Error deleting experience:', error);
    }
  };

  return (
    <>
      {error && <p className="text-danger">{error}</p>}
      
      {isCurrentUser && (
        <div className="d-flex justify-content-between mb-3">
          <Button variant="link" onClick={handleShowAddExperienceModal}>
            <FaEdit /> Aggiungi Esperienza
          </Button>
        </div>
      )}

      <ListGroup className="mt-3">
        {experiences.length > 0 ? (
          experiences.map(exp => (
            <ListGroup.Item key={exp._id} className="d-flex justify-content-between align-items-center">
              <div>
                <h5>{exp.role}</h5>
                <p>{exp.company}</p>
                <p>{exp.startDate} - {exp.endDate}</p>
                <p>{exp.description}</p>
                <p>{exp.area}</p>
              </div>
              {isCurrentUser && (
                <div>
                  <Button
                    variant="link"
                    onClick={() => handleShowEditExperienceModal(exp)}
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
              )}
            </ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item>No experiences available.</ListGroup.Item>
        )}
      </ListGroup>

      <AddExperienceModal
        show={showAddExperienceModal}
        onClose={handleCloseAddExperienceModal}
        onSubmit={handleAddExperienceSubmit}
        experience={newExperience}
        onInputChange={(e) => setNewExperience({ ...newExperience, [e.target.name]: e.target.value })}
      />

      {currentExperience && (
        <EditExperienceModal
          show={showEditExperienceModal}
          onClose={handleCloseEditExperienceModal}
          onSubmit={handleEditExperienceSubmit}
          experience={newExperience}
          onInputChange={(e) => setNewExperience({ ...newExperience, [e.target.name]: e.target.value })}
        />
      )}
    </>
  );
};

export default Experience;
