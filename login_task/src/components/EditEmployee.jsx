import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./CreateEmployee.css";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    f_Name: "",
    f_Email: "",
    f_Mobile: "",
    f_Designation: "",
    f_gender: "",
    f_Course: "",
    image: null,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/employees/${id}`
        );
        setEmployee(response.data);
      } catch (error) {
        console.error("Error fetching employee:", error);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({
      ...employee,
      [name]: value,
    });
    console.log(employee);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setEmployee({ ...employee, image: file });
    } else {
      alert("Please upload a valid image (JPG/PNG)");
    }
  };

  const validateForm = () => {
    let formErrors = {};
    if (!employee.f_Name) formErrors.f_Name = "Name is required";
    if (!employee.f_Email) {
      formErrors.f_Email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(employee.f_Email)) {
      formErrors.f_Email = "Email is invalid";
    }
    if (!employee.f_Mobile) {
      formErrors.f_Mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(employee.f_Mobile)) {
      formErrors.f_Mobile = "Mobile number must be 10 digits";
    }
    if (!employee.f_Designation)
      formErrors.f_Designation = "Designation is required";
    if (!employee.f_gender) formErrors.f_gender = "Gender is required";
    if (!employee.f_Course) formErrors.f_Course = "Course is required";
    if (!employee.image) formErrors.image = "Image is required";
    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const formData = new FormData();
    formData.append("f_Name", employee.f_Name);
    formData.append("f_Email", employee.f_Email);
    formData.append("f_Mobile", employee.f_Mobile);
    formData.append("f_Designation", employee.f_Designation);
    formData.append("f_gender", employee.f_gender);
    formData.append("f_Course", employee.f_Course);
    formData.append("image", employee.image);

    try {
      const response = await axios.put(
        `http://localhost:3000/employees/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response.status === 200) {
        alert("Employee updated successfully");
        navigate("/admin");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error updating employee:", error);
      alert("Failed to update employee");
    }
  };

  return (
    <div className="create-employee-container">
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="f_Name"
            value={employee.f_Name}
            onChange={handleChange}
            required
          />
          {errors.f_Name && <span>{errors.f_Name}</span>}
        </label>

        <label>
          Email:
          <input
            type="email"
            name="f_Email"
            value={employee.f_Email}
            onChange={handleChange}
            required
          />
          {errors.f_Email && <span>{errors.f_Email}</span>}
        </label>

        <label>
          Mobile No:
          <input
            type="text"
            name="f_Mobile"
            value={employee.f_Mobile}
            onChange={handleChange}
            required
          />
          {errors.f_Mobile && <span>{errors.f_Mobile}</span>}
        </label>

        <label>
          Designation:
          <input
            type="text"
            name="f_Designation"
            value={employee.f_Designation}
            onChange={handleChange}
            required
          />
          {errors.f_Designation && <span>{errors.f_Designation}</span>}
        </label>

        <label>
          Gender:
          <select
            name="f_gender"
            value={employee.f_gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.f_gender && <span>{errors.f_gender}</span>}
        </label>

        <label>
          Course:
          <input
            type="text"
            name="f_Course"
            value={employee.f_Course}
            onChange={handleChange}
            required
          />
          {errors.f_Course && <span>{errors.f_Course}</span>}
        </label>

        <label>
          Image:
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
          />
          {errors.image && <span>{errors.image}</span>}
        </label>

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditEmployee;
