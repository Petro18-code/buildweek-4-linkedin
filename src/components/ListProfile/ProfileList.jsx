import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import './ProfileList.css';
import { fetchProfiles } from '../../api/api';
import ProfileModal from '../Modali/ProfileModal';
import { FaUserPlus } from 'react-icons/fa';

const ProfileList = ({ excludeUserId, currentUser }) => {
  const [profiles, setProfiles] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const loadProfiles = async () => {
      try {
        const allProfiles = await fetchProfiles();
        console.log('Fetched profiles:', allProfiles);

        const filteredProfiles = allProfiles.filter(
          (profile) => profile._id !== excludeUserId
        );
        setProfiles(filteredProfiles);
      } catch (err) {
        setError(
          'Qualcosa è andato storto durante il recupero dei profili. Per favore riprova più tardi.'
        );
        console.error('Errore nel recupero dei profili:', err);
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
    <Card className="profile-card mb-4">
      <Card.Body className="d-flex flex-column pt-0 mt-2">
        <h6 className="bold">Persone che potresti conoscere</h6>
        <div className="profile-list">
          {displayedProfiles.map((profile) => (
            <div key={profile._id} className="profile-item">
              <Link to={`/profile/${profile._id}`} className="profile-link">
                <img
                  src={profile.image || 'https://via.placeholder.com/50'}
                  alt={`${profile.name}'s profile`}
                  className="profile-thumbnail "
                />
                <div className="profile-info">
                  <div className="profile-name">
                    {profile.name} {profile.surname}
                  </div>
                  <div className="profile-title">{profile.title}</div>
                  <Button
                    variant="button "
                    className="border-1 border-black rounded-5 mt-2 btn"
                  >
                    <FaUserPlus /> Collegati
                  </Button>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </Card.Body>

      <Card.Footer className="text-center">
        <Button
          variant="link"
          className="text-black text-decoration-none"
          onClick={() => setShowModal(true)}
        >
          Mostra tutto
        </Button>
      </Card.Footer>

      <ProfileModal
        show={showModal}
        onClose={handleCloseModal}
        profiles={profiles}
        currentUser={currentUser}
      />
    </Card>
  );
};

export default ProfileList;
