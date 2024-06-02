import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import '../../form.css';

const EditUser = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [userType, setUserType] = useState('');

    const [error, setError] = useState(''); 
    const navigate = useNavigate();
    const jwt = localStorage.getItem('jwt');
    const { email } = useParams();

    console.log('User Name:', email);
    useEffect(() => {
        const fetchUser = async () => {
        try {
            const response = await api.get(`/api/users/${email}` ,{
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        });
            setNewEmail(response.data.email);
            setName(response.data.name);
            setSurname(response.data.surname);
            setUserType(response.data.userType);
            console.log(response.data);
        } catch (err) {
            setError('Error fetching user');
        }
        };

        fetchUser();

    
    }, [email]);

    const handleSubmit = async (e) => {
        e.preventDefault();

    try {
        const response = await api.put(`/api/users/update`, {
            oldEmail : email,
            newEmail : newEmail,
            name : name,
            surname : surname,
            userType : userType
        },{
          headers: {
              'Authorization': `Bearer ${jwt}`
          }
      });

        console.log(response.data);
        navigate('/users');
    } catch (error) {
      if(error.message.includes('401'))
        setError('Unauthorized!');
      else
        setError('User with that email already exists!');
      setNewEmail('')
    }
  };

  return (
    <div className="form-container"> 
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit} className="form-form"> 
        <input
          type="text"
          placeholder="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Surname"
          required
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          required
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="User Type"
          required
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
        />


        <button type="submit">Save changes</button>
        {error && <p className="error-message">{error}</p>} 
      </form>
    </div>
  );
};

export default EditUser;