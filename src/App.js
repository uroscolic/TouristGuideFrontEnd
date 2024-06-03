import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/users/Login';
import Destinations from './pages/destinations/Destinations';
import NewDestination from './pages/destinations/NewDestination';
import EditDestination from './pages/destinations/EditDestination';
import Users from './pages/users/Users';
import EditUser from './pages/users/EditUser';
import NewUser from './pages/users/NewUser';
import Dashboard from './pages/Dashboard';
import ArticlePlatform from './ArticlePlatform';
import FrontPage from './pages/FrontPage';
import MostRead from './pages/articles/MostRead';
import Articles from './pages/articles/Articles';
import NewArticle from './pages/articles/NewArticle';
import EditArticle from './pages/articles/EditArticle';
import ArticlesAboutDestination from './pages/articles/ArticlesAboutDestination';
import DashboardForArticles from './pages/articles/DashboardForArticles';
import ArticlesWithActivity from './pages/articles/ArticlesWithActivity';
import ArticleWithId from './pages/articles/ArticleWithId';


const App = () => {

  
  const isLogged = localStorage.getItem('jwt');

  return (
    
  <Router>
    {localStorage.setItem('destination', '')}
    <Dashboard />
    <DashboardForArticles />

    <Routes>

      <Route path="/" element={<Login />} />
      <Route path="/destinations" element={<Destinations />} />
      <Route path="/add-destination" element={<NewDestination />} />
      <Route path="/edit-destination/:name" element={<EditDestination />} />
      <Route path="/users" element={<Users />} />
      <Route path="/edit-user/:email" element={<EditUser />} />
      <Route path="/add-user" element={<NewUser />} />  
      <Route path="/article-platform" element={<ArticlePlatform />} />
      <Route path="/about-destination/:name" element={<ArticlesAboutDestination />} />
      <Route path="/front-page" element={<FrontPage />} />
      <Route path="/most-read" element={<MostRead />} />
      <Route path="/articles" element={<Articles />} />
      <Route path="/add-article" element={<NewArticle />} />
      <Route path="/edit-article/:id" element={<EditArticle />} /> 
      <Route path="/articles-with-activity/:id" element={<ArticlesWithActivity />} />
      <Route path="/article/:id" element={<ArticleWithId />} />

      <Route path="*" element={<h1>Not Found</h1>} />

    </Routes>
  </Router>
  );
};

export default App;
