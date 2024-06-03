import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import '../../table.css';
import Pagination from '../Pagination';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const articlesPerPage = 5;


const ArticlesAboutDestination = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(articles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const paginatedArticles = articles.slice(startIndex, endIndex);
  const { name } = useParams();
  const navigate = useNavigate();
  const jwt = localStorage.getItem('jwt');

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const fetchArticles = async () => {
    try {
      const response = await api.get(`/api/articles/destination/${name}`,{
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

  useEffect(() => {
    fetchArticles();
  }, [jwt]);

  const handleClick = (id) => () => {
    fetchVisitArticles(id);
    navigate(`/article/${id}`)
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="table-container">
      <h2>Articles About {name}</h2>
      {articles.length === 0 ? ( <div>No articles found</div> ) : ( 
        <>
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
                <td className='td-click' onClick = {handleClick(article.id)}>{article.title}</td>
                <td>{name}</td> 
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
      </>
    )}
    </div>
    
  );
};

export default ArticlesAboutDestination;