import React, { useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/dashboard', { email, password });
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        // Redirect to dashboard
      } else {
        alert('Dashboard failed');
      }
    } catch (error) {
      console.error('Dashboard error', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Dashboard</button>
    </form>
  );
};

export default Dashboard;