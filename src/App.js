import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import ProfileHeader from './components/ProfileHeader';
import MyNavBar from './components/MyNavBar';
import UserProfile from './components/UserProfile';
import './App.css';
import Sidebar from './components/SideBar';
import { fetchCurrentUser } from './api/api'; 
import { useState, useEffect } from 'react';

function App() {
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const fetchCurrentUserData = async () => {
      try {
        const data = await fetchCurrentUser();
        setCurrentUserId(data._id);
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };

    fetchCurrentUserData();
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
