import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';
import './ProfileList.css';
import { fetchProfiles } from '../api/api'; 

const ProfileList = ({ excludeUserId }) => {
  const [profiles, setProfiles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProfiles = async () => {
      try {
        const allProfiles = await fetchProfiles();
   
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
    return <div className="no-profiles">No profiles available</div>;
  }

  return (
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
  );
};

export default ProfileList;
