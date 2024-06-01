import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Destinations from './pages/Destinations';
import NewDestination from './pages/NewDestination';
import EditDestination from './pages/EditDestination';
import Users from './pages/Users';
import EditUser from './pages/EditUser';
import NewUser from './pages/NewUser';
import Dashboard from './pages/Dashboard';
import ArticlePlatform from './ArticlePlatform';
import FrontPage from './pages/FrontPage';
import MostRead from './pages/MostRead';
import Articles from './pages/Articles';

const App = () => {

  
  const noDashboardRoutes = ['/front-page', '/most-read', '/about-destination', '/article-platform'];


  return (
    
  <Router>
    
    <Dashboard /> 

    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/destinations" element={<Destinations />} />
      <Route path="/add-destination" element={<NewDestination />} />
      <Route path="/edit-destination/:name" element={<EditDestination />} />
      <Route path="/users" element={<Users />} />
      <Route path="/edit-user/:email" element={<EditUser />} />
      <Route path="/add-user" element={<NewUser />} />  
      <Route path="/article-platform" element={<ArticlePlatform />} />
      <Route path="/about-destination" element={<h1> About Destination</h1>} />
      <Route path="/front-page" element={<FrontPage />} />
      <Route path="/most-read" element={<MostRead />} />
      <Route path="/articles" element={<Articles />} />
      <Route path="*" element={<h1>Not Found</h1>} />

    </Routes>
  </Router>
  );
};

export default App;
