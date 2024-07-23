import logo from './logo.svg';
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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
