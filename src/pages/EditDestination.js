import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import '../form.css';

const EditDestination = () => {
  const [newName, setNewName] = useState('');
  const [description, setDescription] = useState('');
  const [id , setId] = useState(''); 
  const [error, setError] = useState(''); 
  const navigate = useNavigate();
  const jwt = localStorage.getItem('jwt');
  const { name } = useParams();

  console.log('Destination Name:', name);
  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const response = await api.get(`/api/destinations/${name}` ,{
          headers: {
              'Authorization': `Bearer ${jwt}`
          }
      });
        setNewName(response.data.name);
        setDescription(response.data.description);
        setId(response.data.id);
        console.log(response.data);
      } catch (err) {
        setError('Error fetching destination');
      }
    };

    fetchDestination();

   
  }, [name]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        console.log(id, newName, description);
        const response = await api.put(`/api/destinations`, {
            id : id,
            name : newName,
            description : description
        },{
          headers: {
              'Authorization': `Bearer ${jwt}`
          }
      });

        console.log(response.data);
        navigate('/destinations');
    } catch (error) {
      if(error.message.includes('401'))
        setError('Unauthorized!');
      else
        setError('Destination with that name already exists!');
      setNewName('');
      setDescription('');
    }
  };

  return (
    <div className="form-container"> 
      <h2>Edit Destination</h2>
      <form onSubmit={handleSubmit} className="form-form"> 
        <input
          type="text"
          placeholder="Name"
          required
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <textarea
          type="text"
          placeholder="Description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Save changes</button>
        {error && <p className="error-message">{error}</p>} 
      </form>
    </div>
  );
};

export default EditDestination;