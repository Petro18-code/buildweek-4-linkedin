import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ListGroup, Button } from 'react-bootstrap';
import './ProfileList.css';
import { fetchProfiles } from '../api/api';
import ProfileModal from './ProfileModal';

const ProfileList = ({ excludeUserId, currentUser }) => {
  const [profiles, setProfiles] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const loadProfiles = async () => {
      try {
        const allProfiles = await fetchProfiles();
        
        console.log('Fetched profiles:', allProfiles);

       
        const filteredProfiles = allProfiles.filter(profile => profile._id !== excludeUserId);
        setProfiles(filteredProfiles);
      } catch (err) {
        setError('Something went wrong while fetching profiles. Please try again later.');
        console.error('Error fetching profiles:', err);
      }
    };

    loadProfiles();
  }, [excludeUserId]);

  
  if (error) {
    return <div className="error-message">{error}</div>;
  }

  
  if (profiles.length === 0) {
    return <div className="no-profiles">Non ci sono profili presenti</div>;
  }

  
  const displayedProfiles = profiles.slice(0, 6);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div>
      <h2>Persone che potresti conoscere</h2>
      <ListGroup className="profile-list">
        {displayedProfiles.map(profile => (
          <ListGroup.Item key={profile._id}>
            <Link to={`/profile/${profile._id}`} className="profile-link">
              <img
                src={profile.image || 'https://via.placeholder.com/50'}
                alt={`${profile.name}'s profile`}
                className="profile-thumbnail"
              />
              <span>{profile.name} {profile.surname}</span>
            </Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Button variant="primary" onClick={handleShowModal}>
       Mostra tutto
      </Button>

     
      <ProfileModal show={showModal} onClose={handleCloseModal} profiles={profiles} currentUser={currentUser} />
    </div>
  );
};

export default ProfileList;
