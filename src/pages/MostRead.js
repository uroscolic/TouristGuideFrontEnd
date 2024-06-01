import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import '../table.css';
import Pagination from './Pagination';

const articlesPerPage = 5;


const MostRead = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [destinations, setDestinations] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(articles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const paginatedArticles = articles.slice(startIndex, endIndex);

  const jwt = localStorage.getItem('jwt');

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const fetchArticles = async () => {
    try {
      const response = await api.get('/api/articles/most-read',{
          headers: {
              'Authorization': `Bearer ${jwt}`
          }
      
      });
      setArticles(response.data);
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
    const destinationsMap = response.data.reduce((acc, destination) => {
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
    fetchArticles();
  }, [jwt]);


  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="table-container">
      <h2>Most Read Articles</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Destination</th>
            <th>Text</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {paginatedArticles.map(article => (
            <tr key={article.id}>
                <td>{article.title}</td>
                <td>{destinations[article.destinationId]}</td> 
                <td>{article.text.substring(0, article.text.length > 50 ? 50 : article.text.length).concat("...")}</td>
                <td>{article.date}</td>

            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />

    </div>
    
  );
};

export default MostRead;