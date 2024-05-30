import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, /*Navigate*/ } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Destinations from './components/Destinations';
import NewDestination from './components/NewDestination';
import './index.css';
import EditDestination from './components/EditDestination';
import Users from './components/Users';
import EditUser from './components/EditUser';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Dashboard />
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/destinations" element={<Destinations />} />
      <Route path="/add-destination" element={<NewDestination />} />
      <Route path="/edit-destination/:name" element={<EditDestination />} />
      <Route path="/users" element={<Users />} />
      <Route path="/edit-user/:email" element={<EditUser />} />
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  </Router>
);