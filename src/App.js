import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import ProfileHeader from './components/ProfileHeader';
import MyNavBar from './components/MyNavBar';
import UserProfile from './components/UserProfile';
import Sidebar from './components/SideBar';
import { fetchCurrentUser } from './api/api';
import { useState, useEffect } from 'react';
import './App.css';
import EditExperiencePage from './components/EditExperiencePage';
import MyFooter from './components/MyFooter';

function App() {
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const loadCurrentUser = async () => {
      try {
        const userData = await fetchCurrentUser();
        setCurrentUserId(userData._id);
      } catch (error) {
        console.error('Impossibile recuperare i dati dell\'utente:', error);
      }
    };

    loadCurrentUser();
  }, []);

  return (
    <Router>
      <div className="App">
        <Container>
          <MyNavBar />
          <Row>
            <Col xs={12} md={8} lg={9}>
              <Routes>
                <Route path="/" element={<ProfileHeader />} />
                <Route path="/profile/:userId" element={<UserProfile />} />
                <Route path="/edit-experience/:userId" element={<EditExperiencePage />} />
              </Routes>
            </Col>
            <Col xs={12} md={4} lg={3}>
              <Sidebar currentUserId={currentUserId} />
            </Col>
          </Row>
        </Container>
        <MyFooter /> 
      </div>
    </Router>
  );
}

export default App;