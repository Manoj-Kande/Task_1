import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminPage.css"; // Import the CSS file
import EmployeeTable from "./EmployeeTable";
import axios from "axios";

const AdminPage = ({ flag }) => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:3000/employees");
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const handleLogout = () => {
    // Clear user data and redirect to login page
    navigate("/login");
  };

  const handleCreateEmployee = () => {
    navigate("/create-employee"); // Navigate to create employee form page
  };

  const handleEmployeeList = () => {
    navigate("/employee-list");
  };

  const handleEdit = (id) => {
    navigate(`/edit-employee/${id}`); // Navigate to edit employee form page
  };

  const handleDelete = async (id) => {
    try {
      console.log({ id });
      await axios.delete(`http://localhost:3000/employees/${id}`);
      setEmployees(employees.filter(employee => employee._id !== id));
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };


  return (
    <>
      <nav className="navbar">
        <ul className="nav-list">
          <li>
            <a href="/login" className="nav-link">
              Home
            </a>
          </li>
          <li>
            <a onClick={handleEmployeeList} className="nav-link">
              Employee List
            </a>
          </li>
          <li className="username">Username: </li>
          <li>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </li>
        </ul>
      </nav>
      {!flag ? (
        <div className="admin-container">
          <button onClick={handleCreateEmployee} className="create-btn">
            Create Employee
          </button>
        </div>
      ) : null}

      {flag ? (
        <div className="admin-container">
          <EmployeeTable employees={employees} handleEdit={handleEdit} handleDelete={handleDelete} />
        </div>
      ) : null}
    </>
  );
};

export default AdminPage;