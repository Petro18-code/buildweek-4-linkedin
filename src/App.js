import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from './components/Profile/Profile';

function App() {
  const [userProfile, setUserProfile] = useState({});

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path='/profile/:id'
            element={
              <Profile
                userProfile={userProfile}
                setUserProfile={setUserProfile}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
