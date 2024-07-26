import { Container, Row, Col } from 'react-bootstrap';
import ProfileHeader from './ProfileHeader';
import Activity from '../Activity/Activity';
import Experience from '../Experience';
import Education from '../Education/Education'; 
import Licenses from '../Licenses/Licenses';
import Courses from '../Skills/Courses';
import Interests from '../Skills/Interests';

import Skills from '../Skills/Skills';



const Profile = () => {
  return (
    <Container className="user-profile-container mt-4">
      <Row>
        <Col md={12}>
          <ProfileHeader />
        </Col>
        <Col md={12}>
          <Activity />
        </Col>
        <Col md={12} className="mt-4">
          <Education />
          <Licenses />
          <Skills />
          <Courses />
          <Interests />
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
