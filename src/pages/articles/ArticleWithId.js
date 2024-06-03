import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import Pagination from '../Pagination';
import '../../table.css';
import '../../form.css';

const commentsPerPage = 5;

const ArticleWithId = () => {
  const { id } = useParams();
  const [article, setArticle] = useState({});
  const [error, setError] = useState(null);
  const [destinations, setDestinations] = useState({});
  const [comments, setComments] = useState([]);
  const [activities, setActivities] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [newComment, setNewComment] = useState({ author: '', text: '' });
  const jwt = localStorage.getItem('jwt');

  const totalPages = Math.ceil(comments.length / commentsPerPage);
  const startIndex = (currentPage - 1) * commentsPerPage;
  const endIndex = startIndex + commentsPerPage;
  const paginatedComments = comments.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewComment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await api.post('/api/comments', {
            author: newComment.author,
            text: newComment.text,
            articleId: id,
            date: new Date().toISOString().substring(0, 10),
            },{
        headers: {
            'Authorization': `Bearer ${jwt}`
        }
      });
    fetchComments();
    } catch (error) {
      if(error.response.status === 401)
        setError('Unauthorized!');
    
    }
    setNewComment({author : '', text :''});
  };

  const fetchArticle = async () => {
    try {
      const response = await api.get(`/api/articles/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      setArticle(response.data);
    } catch (err) {
      if (err.message.includes('401')) setError('Unauthorized!');
      else setError('Error fetching article');
    }
  };

  const fetchDestinations = async () => {
    try {
      const response = await api.get('/api/destinations', {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      const destinationsMap = response.data.reduce((acc, destination) => {
        acc[destination.id] = destination.name;
        return acc;
      }, {});
      setDestinations(destinationsMap);
    } catch (err) {
      setError('Error fetching destinations');
    }
  };

  const fetchActivities = async () => {
    try {
      const response = await api.get('/api/activities', {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      const activityMap = response.data.reduce((acc, activity) => {
        acc[activity.id] = activity.name;
        return acc;
      }, {});
      setActivities(activityMap);
    } catch (err) {
      setError('Error fetching activities');
    }
  };

  const fetchComments = async () => {
    try {
      const response = await api.get(`/api/comments/article/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      setComments(response.data);
    } catch (err) {
      setError('Error fetching comments');
    }
  };

  useEffect(() => {
    fetchArticle();
    fetchDestinations();
    fetchActivities();
    fetchComments();
  }, [jwt]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>{article.title}</h1>
      <p>Author: {article.author} ({article.date})</p>
      <p>Destination: {destinations[article.destinationId]}</p>
      <p>
        Activities:{' '}
        {article.activities &&
          article.activities.map((activityId) => activities[activityId]).join(', ')}
      </p>
      <p className="article-text">{article.text}</p>
      <div className="table-container">
        {comments.length === 0 ? (
          <div>No comments yet</div>
        ) : (
          <>
            
            <h2>Comments</h2>
            <table>
              <thead>
                <tr>
                  <th>Author</th>
                  <th>Text</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {paginatedComments.map((comment) => (
                  <tr key={comment.id}>
                    <td>{comment.author}</td>
                    <td>{comment.text}</td>
                    <td>{comment.date}</td>
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
        <hr />
        <h2>Add a Comment</h2>
      <form onSubmit={handleSubmit} className='form-form'>
        <div>
          <input
            type="text"
            name="author"
            placeholder='Author'
            value={newComment.author}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <textarea
            name="text"
            placeholder='Text'
            value={newComment.text}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      </div>
      
      
    </div>
  );
};

export default ArticleWithId;
