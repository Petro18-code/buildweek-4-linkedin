
import React from 'react';
import { Card } from 'react-bootstrap';

const ProfileDetails = ({ profileBio }) => {
  return (
    <Card className="profile-details-card mt-4">
      <Card.Body>
        <h4>Informazioni</h4>
        <p>{profileBio}</p>
      </Card.Body>
    </Card>
  );
};

export default ProfileDetails;
