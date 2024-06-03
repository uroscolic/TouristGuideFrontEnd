import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import '../../table.css';
import { useNavigate } from 'react-router-dom';
import Pagination from '../Pagination';

const usersPerPage = 5;

const Users = () => {
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const jwt = localStorage.getItem('jwt');

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchUsers(page, usersPerPage);
  };

  const fetchUsers = async (page, size) => {
    try {
      console.log(jwt);
      const response = await api.get(`/api/users?page=${page}&size=${size}`, {
        headers: {
          'Authorization': `Bearer ${jwt}`,
        },
      });
      setUsers(response.data.users);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      setError('Error fetching users');
    }
  };

  useEffect(() => {
    fetchUsers(currentPage, usersPerPage);
  }, [jwt]);

  const handleEdit = (email) => {
    console.log(`Edit user with email ${email}`);
    navigate(`/edit-user/${email}`);
  };

  const handleActivate = async (email) => {
    try {
      console.log(email);
      await api.put(`/api/users/changeActive/${email}`, {}, {
        headers: {
          'Authorization': `Bearer ${jwt}`,
        },
      });
      fetchUsers(currentPage, usersPerPage);
    } catch (err) {
      console.error('Error changing activity for user:', err);
    }
  };

  const handleAdd = () => {
    navigate('/add-user');
  };

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
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.surname}</td>
              <td>{user.email}</td>
              <td>{user.active ? 'Active' : 'Not active'}</td>
              <td>{user.userType}</td>
              <td>
                <button onClick={() => handleEdit(user.email)}>Edit</button>
                {user.userType !== "ADMIN" && <button onClick={() => handleActivate(user.email)}>{user.active ? "Deactivate" : "Activate"}</button>}
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
        <button type="button" onClick={handleAdd}>New User</button>
      </form>
    </div>
  );
};

export default Users;