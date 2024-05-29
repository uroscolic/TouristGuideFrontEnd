import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api'; // importuj axios instancu
import '../login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Dodaj stanje za grešku
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/api/users/login', { email, password });

      // Sačuvaj token u localStorage
      //localStorage.setItem('token', response.data.token);
        console.log(response.data);
      // Preusmeri na dashboard
      navigate('/dashboard');
    } catch (error) {
      setError('Invalid email or password!');
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className="login-container"> {/* Dodaj klasu za kontejner */}
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form"> {/* Dodaj klasu za formu */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {error && <p className="error-message">{error}</p>} {/* Dodaj klasu za poruku o grešci */}
      </form>
    </div>
  );
};

export default Login;