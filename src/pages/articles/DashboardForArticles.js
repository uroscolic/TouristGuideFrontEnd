import React from 'react';
import { Link } from 'react-router-dom';
import '../../dashboard.css';
import useAuthRedirect from '../../hooks/useAuthRedirect';

const DashboardForArticles = () => {
  const isLoggedIn = !!localStorage.getItem('jwt');
  const hasDestination = !!localStorage.getItem('destination');
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
        {hasDestination &&
        <li>
          <Link to={"/about-destination/" + localStorage.getItem('destination')}>About {localStorage.getItem('destination')}</Link>
        </li>}

      </ul>
    </nav>
  );
};

export default DashboardForArticles;