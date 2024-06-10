import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import '../../table.css';
import { useNavigate } from 'react-router-dom';
import Pagination from '../Pagination';

const articlesPerPage = 5;


const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const jwt = localStorage.getItem('jwt');
  const isLoggedIn = !!jwt;

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchArticles(page, articlesPerPage);
  };

  const fetchVisitArticles = async (id) => {
    try {
      const response = await api.put(`/api/articles/visit/${id}`, {},{
          headers: {
              'Authorization': `Bearer ${jwt}`
          }
      
      });
    } catch (err) {
      if(err.message.includes('401'))
        setError('Unauthorized!');
    }
  };

  const fetchArticles = async (page, size) => {
    try {
      const response = await api.get(`/api/articles?page=${page}&size=${size}`,{
          headers: {
              'Authorization': `Bearer ${jwt}`
          }
      
      });
      setArticles(response.data.articles);
      setTotalPages(response.data.totalPages);
      console.log(response.data);
    } catch (err) {
      if(err.message.includes('401'))
        setError('Unauthorized!');
      else
        setError('Error fetching articles');
    }
  };

  const fetchDestinations = async () => {
    try {
      const response = await api.get('/api/destinations',{
        headers: {
            'Authorization': `Bearer ${jwt}`
        }
    
    });
    console.log(response.data);
    const destinationsMap = response.data.destinations.reduce((acc, destination) => {
        acc[destination.id] = destination.name;
        return acc;
      }, {});
      
      setDestinations(destinationsMap);
    } catch (err) {
      setError('Error fetching destinations');
    }
  };

  useEffect(() => {
    fetchDestinations();
    fetchArticles(currentPage, articlesPerPage);
  }, [jwt]);

  const handleEdit = (id) => {
    
    console.log(`Edit article with id ${id}`);
    
    navigate(`/edit-article/${id}`);
  };

  const handleDelete = async (id) => {
    try {
        console.log(id);
      await api.delete(`/api/articles/${id}`,{
          headers: {
              'Authorization': `Bearer ${jwt}`
          }
      });
      fetchArticles(currentPage, articlesPerPage);
      if(articles.length % articlesPerPage === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (err) {
      console.error('Error deleting article:', err);
    }
  };
  const handleAdd = () => {
    navigate('/add-article');
  }
  const handleClick = (id) => () => {
    fetchVisitArticles(id);
    navigate(`/article/${id}`);
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="table-container">
      <h2>Articles</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Destination</th>
            <th>Text</th>
            <th>Date</th>
            {isLoggedIn && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {articles.map(article => (
            <tr key={article.id} >
                <td className='td-click' onClick = {handleClick(article.id)}>{article.title} </td>
                <td>{destinations[article.destinationId]}</td> 
                <td>{article.text.substring(0, article.text.length > 50 ? 50 : article.text.length).concat("...")}</td>
                <td>{article.date}</td>
                {isLoggedIn &&
                  <td>
                      <button onClick={() => handleEdit(article.id)}>Edit</button>
                      <button onClick={() => handleDelete(article.id)}>Delete</button>
                  </td>
                }
            </tr>
          ))}
        </tbody>
      </table>
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
      {isLoggedIn &&
          <form>
          <button onClick = {() => handleAdd()}>New Article</button>
        </form>
      }
    </div>
    
  );
};

export default Articles;