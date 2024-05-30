import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import '../table.css';
import { useNavigate } from 'react-router-dom';
import Pagination from './Pagination';
const usersPerPage = 5;


const Users = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(users.length / usersPerPage);
    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    const paginatedUsers = users.slice(startIndex, endIndex);
    const jwt = localStorage.getItem('jwt');

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
 
    const fetchUsers = async () => {
        try {
        console.log(jwt);
        const response = await api.get('/api/users',{
                headers: {
                    'Authorization': `Bearer ${jwt}`
                }
            
            }
        );
        setUsers(response.data);
        } catch (err) {
        setError('Error fetching users');
        }
    };
    useEffect(() => {

        fetchUsers();
    }, [jwt]);

    const handleEdit = (email) => {
        console.log(`Edit user with email ${email}`);
        navigate(`/edit-user/${email}`);
    };

    const handleActivate = async (email) => {
        try {
            console.log(email);
            await api.put(`/api/users/changeActive/${email}`,{}, {
                headers: {
                    'Authorization': `Bearer ${jwt}`
                }
            });
            fetchUsers();
        } catch (err) {
            console.error('Error changing activity for user:', err);
        }
    };


    const handleAdd = () => {
        
        navigate('/add-user');
    }


    if (error) {
        return <div>{error}</div>;
    }

  return (
    <div className="table-container">
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Email</th>
            <th>Active</th>
            <th>User Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map(user => (
            <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.surname}</td>
                <td>{user.email}</td>
                <td>{user.active ? 'Active' : 'Not active'}</td>
                <td>{user.userType}</td>
                <td>
                    <button onClick={() => handleEdit(user.email)}>Edit</button>
                    <button onClick={() => handleActivate(user.email)}>{user.active ? "Deactivate" : "Activate"}</button>
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
        <button onClick = {() => handleAdd()}>New User</button>
      </form>
    </div>
    
  );
};

export default Users;