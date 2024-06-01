import React from 'react';
import { Link } from 'react-router-dom';
import '../dashboard.css';
import useAuthRedirect from '../hooks/useAuthRedirect';

const DashboardForArticles = () => {
  const isLoggedIn = !!localStorage.getItem('jwt');

  useAuthRedirect();
  return (
    isLoggedIn && 
    <nav>
      <ul>
        <li>
          <Link to="/front-page">Home</Link>
        </li>

        <li>
          <Link to="/most-read">Most Read</Link>
        </li>
        <li>
          <Link to="/about-destination">About Destination</Link>
        </li>

      </ul>
    </nav>
  );
};

export default DashboardForArticles;