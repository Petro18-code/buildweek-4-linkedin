import ProfileList from '../ListProfile/ProfileList'; 
import './SideBar.css';
import { Row, Col } from 'react-bootstrap';
const Sidebar = ({ currentUserId }) => {
  return (
  <Row>
    <Col xs={12} md={12}>
        <ProfileList excludeUserId={currentUserId} />
    </Col>
        </Row>
  );
};


export default Sidebar;

