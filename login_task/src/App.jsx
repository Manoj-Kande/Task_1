import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Correct import for routing
import Login from "./components/Login"; // Ensure correct import path
import AdminPage from "./components/AdminPage"; 
import CreateEmployee from "./components/CreateEmployee";
import EmployeeList from "./components/EmployeeList"; 
import EditEmployee from "./components/EditEmployee";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/create-employee" element={<CreateEmployee />} />
      <Route path="/employee-list" flag={true} element={<EmployeeList />} />
      <Route path="/edit-employee/:id" element={<EditEmployee />}></Route>
    </Routes>
  );
}

export default App;