import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api'; // importuj axios instancu
import '../form.css';

const NewDestination = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(''); // Dodaj stanje za grešku
  const navigate = useNavigate();
  const jwt = localStorage.getItem('jwt');
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await api.post('/api/destinations', { name, description },{
          headers: {
              'Authorization': `Bearer ${jwt}`
          }
      });

        console.log(response.data);
        navigate('/destinations');
    } catch (error) {
      if(error.response.status === 401)
        setError('Unauthorized!');
      else
        setError('Destination already exists!');
        setName('');
        setDescription('');
    }
  };

  return (
    <div className="form-container"> {/* Dodaj klasu za kontejner */}
      <h2>New Destination</h2>
      <form onSubmit={handleSubmit} className="form-form"> {/* Dodaj klasu za formu */}
        <input
          type="text"
          placeholder="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          type="text"
          placeholder="Description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add</button>
        {error && <p className="error-message">{error}</p>} {/* Dodaj klasu za poruku o grešci */}
      </form>
    </div>
  );
};

export default NewDestination;