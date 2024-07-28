
import React from 'react';
import { Card } from 'react-bootstrap';

const ProfileDetails = ({ profileBio }) => {
  return ( 
    <>
    <h5>Informazioni</h5>
   
     <p>{profileBio}</p>
     
   
    </>
  );
};

export default ProfileDetails;
