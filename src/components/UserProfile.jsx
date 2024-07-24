import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Container, Row, Col, Spinner, Alert, Button } from 'react-bootstrap';
import { FaCheckCircle } from 'react-icons/fa';
import ProfileDetails from './ProfileDetails';
import Experience from './Experience';
import { fetchCurrentUser, fetchUserProfile } from '../api/api'; 
import './UserProfile.css';

const UserProfile = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfileData = async () => {
      try {
       
        const currentUser = await fetchCurrentUser();
        setCurrentUserId(currentUser._id);
        
     
        const userProfile = await fetchUserProfile(userId || currentUser._id);
        setProfile(userProfile);
      } catch (err) {
        console.error('C’è stato un problema nel recuperare i dati:', err);
        setError('Ops, qualcosa è andato storto. Riprova più tardi.');
      } finally {
        setIsLoading(false);
      }
    };

    loadProfileData();
  }, [userId]);

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

  const isCurrentUser = currentUserId === userId;

  return (
    <Container className="user-profile-container mt-4" fluid>
      <Row>
        <Col md={12}>
          <Card className="user-profile-card mb-4">
            <Card.Header className="p-0 position-relative">
              <img
                src="https://picsum.photos/640/480"
                alt="Sfondo profilo"
                className="header-bg"
              />
              <img
                src={profile.image || 'https://via.placeholder.com/150'}
                alt={`${profile.name}'s profile`}
                className="rounded-circle profile-avatar"
              />
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={12} className="d-flex flex-column">
                  <div className="profile-name-container">
                    <h2 className="profile-name">
                      {profile.name} {profile.surname}
                    </h2>
                    {isCurrentUser && (
                      <div className="verification-box mt-4">
                        <FaCheckCircle className="verification-icon" />
                        <span className="verification-text">Verifica ora</span>
                      </div>
                    )}
                  </div>
                  <div className="profile-details mt-2">
                    <h4>{profile.title}</h4>
                    <p>{profile.area}</p>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Col md={12}>
            {profile.bio && <ProfileDetails profileBio={profile.bio} />}
          </Col>
          <Col md={12} className="mt-4">
            <Experience userId={userId} isCurrentUser={isCurrentUser} />
          </Col>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
