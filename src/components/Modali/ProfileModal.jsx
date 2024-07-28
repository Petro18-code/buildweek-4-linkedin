import { Modal, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const ProfileModal = ({ show, onClose, profiles }) => {
  
  console.log('Profiles in the modal:', profiles);

  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Persone che potresti conoscere</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup className="profile-list">
          {profiles.map(profile => (
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
      </Modal.Body>
    </Modal>
  );
};

export default ProfileModal;