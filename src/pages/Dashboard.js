import React from 'react';
import { Link } from 'react-router-dom';
import '../dashboard.css';
import useAuthRedirect from '../hooks/useAuthRedirect';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const isLoggedIn = !!localStorage.getItem('jwt');
  const userType = localStorage.getItem('userType');
  const isAdmin = userType === 'ADMIN';
  const name = localStorage.getItem('name');

  const navigate = useNavigate();

  const handleLogOut = () => {
      localStorage.removeItem('jwt');
      localStorage.removeItem('userType');
      localStorage.removeItem('name');
      localStorage.removeItem('destination');
      navigate('/')
  };
  const hasDestination = !!localStorage.getItem('destination');


  return (
    <>
    <nav>
      <ul>
        {
          !isLoggedIn &&
          <li>
            <Link to="/">Login</Link>
          </li>
        }
        <li>
          <Link to="/destinations">Destinations</Link>
        </li>
        <li>
          <Link to="/articles">Articles</Link>
        </li>
        { isAdmin &&
        <li>
          <Link to="/users">Users</Link>
        </li>
        
        }
        <li>
          <Link to="/front-page">Home</Link>
        </li>

        <li>
          <Link to="/most-read">Most Read</Link>
        </li>
        { (hasDestination &&
          <li>
            <Link to={"/about-destination/" + localStorage.getItem('destination')}>About {localStorage.getItem('destination')}</Link>
          </li>
        )}
        { isLoggedIn &&
          <li>
            <span> | </span>
          </li>
        }
        {isLoggedIn &&
          <li> 
            <button className='userProfile'> {name.substring(0,1)} </button>
            <span>{name}</span>

          </li>
        }

        {isLoggedIn &&
          <li>
            <button onClick={() => handleLogOut()}> Log out</button>
          </li>
        }
         
      </ul>
    </nav>
    </>
  );
};

export default Dashboard;