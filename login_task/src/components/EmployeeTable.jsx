import React, { useState } from 'react';
import './EmployeeTable.css'; // Import the CSS file

const EmployeeTable = ({ employees,handleEdit,handleDelete }) => {
  const [sortField, setSortField] = useState('f_Id');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);
    const sortedEmployees = [...employees].sort((a, b) => {
      if (a[field] < b[field]) return order === 'asc' ? -1 : 1;
      if (a[field] > b[field]) return order === 'asc' ? 1 : -1;
      return 0;
    });
    setEmployees(sortedEmployees);
  };

  return (
    <div className="employee-table-container">
      <table className="employee-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('f_Id')}>Unique ID</th>
            <th>Image</th>
            <th onClick={() => handleSort('f_Name')}>Name</th>
            <th onClick={() => handleSort('f_Email')}>Email</th>
            <th>Mobile No</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th onClick={() => handleSort('f_Createdate')}>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee._id}>
              <td>{employee.f_Id}</td>
              <td><img src={`http://localhost:3000/uploads/${employee.f_Image}`} alt={employee.f_Name} className="employee-image" /></td>
              <td>{employee.f_Name}</td>
              <td>{employee.f_Email}</td>
              <td>{employee.f_Mobile}</td>
              <td>{employee.f_Designation}</td>
              <td>{employee.f_gender}</td>
              <td>{employee.f_Course}</td>
              <td>{new Date(employee.f_Createdate).toLocaleDateString()}</td>
              <td>
                <button  className="edit-btn" onClick={() => handleEdit(employee._id)}>Edit</button>
                <button  className="delete-btn" onClick={() => handleDelete(employee._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;