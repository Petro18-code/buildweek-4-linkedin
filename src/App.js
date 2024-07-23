import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import ProfileHeader from './components/ProfileHeader';
import MyNavBar from './components/MyNavBar';
import UserProfile from './components/UserProfile';
import Sidebar from './components/SideBar';
import { fetchCurrentUser } from './api/api'; 
import { useState, useEffect } from 'react';
import './App.css';

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
            <Col md={8}>
              <Routes>
                <Route path="/" element={<ProfileHeader />} />
                <Route path="/profile/:userId" element={<UserProfile />} />
              </Routes>
            </Col>
            <Col md={4}>
              <Sidebar currentUserId={currentUserId} />
            </Col>
          </Row>
        </Container>
      </div>
    </Router>
  );
}

export default App;
