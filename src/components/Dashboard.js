import React from 'react';
import { Link } from 'react-router-dom';
import '../dashboard.css';
import useAuthRedirect from '../hooks/useAuthRedirect';

const Dashboard = () => {
  const isLoggedIn = !!localStorage.getItem('jwt');
  useAuthRedirect();
  return (
    isLoggedIn && 
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/destinations">Destinations</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
        
      </ul>
    </nav>
  );
};

export default Dashboard;