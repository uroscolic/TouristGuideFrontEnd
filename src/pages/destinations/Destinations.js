import React, { useEffect, useState } from 'react';
import api from '../../utils/api'; // import your axios instance
import '../../table.css';
import { useNavigate } from 'react-router-dom';
import Pagination from '../Pagination';
const destinationsPerPage = 5;


const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(destinations.length / destinationsPerPage);
  const startIndex = (currentPage - 1) * destinationsPerPage;
  const endIndex = startIndex + destinationsPerPage;
  const paginatedDestinations = destinations.slice(startIndex, endIndex);

  const jwt = localStorage.getItem('jwt');

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const fetchDestinations = async () => {
    try {
      const response = await api.get('/api/destinations',{
          headers: {
              'Authorization': `Bearer ${jwt}`
          }
      
      });
      setDestinations(response.data);
    } catch (err) {
      if(err.message.includes('401'))
        setError('Unauthorized!');
      else
        setError('Error fetching destinations');
    }
  };
  useEffect(() => {

    fetchDestinations();
  }, [jwt]);

  const handleEdit = (name) => {
    console.log(`Edit destination with name ${name}`);
    navigate(`/edit-destination/${name}`);
  };
  const handleDestinationClick = (name) => () => {
    localStorage.setItem('destination', name);
    navigate(`/about-destination/${name}`);
  };

  const handleDelete = async (name) => {
    try {
        console.log(name);
      await api.delete(`/api/destinations/${name}`,{
          headers: {
              'Authorization': `Bearer ${jwt}`
          }
      });
      fetchDestinations();
      if(destinations.length % destinationsPerPage === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (err) {
      console.error('Error deleting destination:', err);
    }
  };
  const handleAdd = () => {
    
    navigate('/add-destination');
  }


  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="table-container">
      <h2>Destinations</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedDestinations.map(destination => (
            <tr key={destination.name}>
              <td onClick={handleDestinationClick(destination.name) } className = "td-click">{destination.name}</td>
              <td>{destination.description}</td>
              <td>
                <button onClick={() => handleEdit(destination.name)}>Edit</button>
                <button onClick={() => handleDelete(destination.name)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
      <form>
        <button onClick = {() => handleAdd()}>New Destination</button>
      </form>
    </div>
    
  );
};

export default Destinations;