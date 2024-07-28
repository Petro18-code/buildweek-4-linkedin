
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import MyNavBar from './components/Navbar/MyNavBar';
import Sidebar from './components/Sidebar/SideBar';
import { fetchCurrentUser } from './api/api';
import { useState, useEffect } from 'react';
import './App.css';
import EditExperiencePage from './components/Experience/EditExperiencePage';
import MyFooter from './components/Footer/MyFooter';
import Profile from './components/NewProfile/Profile';
import NotFound from './components/NotFound';

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
    <MyNavBar />

    <div className="mt-5 pt-3">
      <Container className="" >
        <Row>
          <Col xs={12} md={9} lg={9}>
            <Routes>
              <Route path="/" element={<Profile />} />
              <Route path="/profile/:userId" element={<Profile />} />
              <Route path="/edit-experience/:userId" element={<EditExperiencePage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Col>
          <Col xs={12} md={3} lg={3} className="mt-4" >
            <Sidebar currentUserId={currentUserId} />
          </Col>
        </Row>
      </Container>
    </div>
    <MyFooter />
  </Router>
);
}

  
  
export default App;