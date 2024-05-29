import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import App from './App';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import './index.css';
// Komponenta za proveru autentifikacije
const PrivateRoute = ({ children }) => {
  return localStorage.getItem('token') ? children : <Navigate to="/" />;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route path="/app" element={<App />} />
    </Routes>
  </Router>
);