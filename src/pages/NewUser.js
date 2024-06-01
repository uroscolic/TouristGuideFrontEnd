import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import '../form.css';

const NewUser = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [userType, setUserType] = useState('');
    const [password, setPassword] = useState('');
    const [otherPassword, setOtherPassword] = useState('');

    const [error, setError] = useState('');
    const navigate = useNavigate();
    const jwt = localStorage.getItem('jwt');
    const handleSubmit = async (e) => {
        e.preventDefault();

    try {
        const response = await api.post('/api/users/register', 
        { 
            name : name,
            surname : surname,
            email : email,
            userType : userType,
            password : password
        },{
          headers: {
              'Authorization': `Bearer ${jwt}`
          }
      });

        console.log(response.data);
        navigate('/users');
    } catch (error) {
        if(error.response.status === 401)
            setError('Unauthorized!');
        else if (error.response.status === 400) {
            setError('Invalid user type!');
            setUserType('');
        }
        else {
            setError('User with that email already exists!');
            setEmail('');
        }
    }
  };

  return (
    <div className="form-container">
      <h2>New User</h2>
      <form onSubmit={handleSubmit} className="form-form">
      <input
          type="text"
          placeholder="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Surname"
          required
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          required
          value={otherPassword}
          onChange={(e) => setOtherPassword(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="User Type"
          required
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
        />
        {password === otherPassword && password !=='' && <button type="submit">Add</button>}
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default NewUser;