import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Destinations from './components/Destinations';

const App = () => {
  return (
    
    <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/destinations" element={<Destinations />} />
        </Routes>
      
    </Router>
  );
};

export default App;
