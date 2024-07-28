import { Container, Row, Col } from 'react-bootstrap';
import ProfileHeader from './ProfileHeader';
import Activity from '../Activity/Activity';
import Education from '../Education/Education'; 
import Licenses from '../Licenses/Licenses';
import Courses from '../Skills/Courses';
import Interests from '../Skills/Interests';
import Skills from '../Skills/Skills';
import { useParams } from 'react-router-dom';


const Profile = () => {
  const { userId } = useParams(); 
  return (
   
    <Row>
      <Col xs={12} md={12}>
      
        <ProfileHeader userId={userId} />
      </Col>
      <Col xs={12} md={12}>
        <Activity />
      </Col>
      <Col>
        <Education />
        <Licenses />
        <Skills />
        <Courses />
        <Interests />
      </Col> 
    </Row>
  );
};

export default Profile;