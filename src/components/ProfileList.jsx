import  { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';
import './ProfileList.css';
import { fetchProfiles } from '../api/api'; 

const ProfileList = ({ excludeUserId }) => {
  const [profiles, setProfiles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfilesData = async () => {
      try {
        const data = await fetchProfiles();
     
        const filteredProfiles = data.filter(profile => profile._id !== excludeUserId);
        setProfiles(filteredProfiles);
      } catch (error) {
        setError('Error fetching profiles data. Please try again later.');
        console.error('Error fetching profiles:', error);
      }
    };

    fetchProfilesData();
  }, [excludeUserId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (profiles.length === 0) {
    return <div>No profiles available</div>;
  }

  return (
    <ListGroup>
      {profiles.map(profile => (
        <ListGroup.Item key={profile._id}>
          <Link to={`/profile/${profile._id}`}>
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
