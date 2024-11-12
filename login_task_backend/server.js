const express = require("express");
const connectDB = require("./DbCon.js");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const Employee = require("./models/Employee.js");
const User = require("./models/User.js");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
connectDB();

// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Only JPG and PNG files are allowed"), false);
    }
  },
}).single("image");

app.post("/addEmployee", upload, async (req, res) => {
  try {
    const {
      f_Name,
      f_Email,
      f_Mobile,
      f_Designation,
      f_gender,
      f_Course,
    } = req.body;

    // Check if email already exists
    const emailExists = await Employee.findOne({ f_Email });
    if (emailExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Check if the mobile number is valid
    if (!/^\d{10}$/.test(f_Mobile)) {
      return res.status(400).json({ message: "Invalid mobile number" });
    }

    const newEmployee = new Employee({
      f_Name,
      f_Email,
      f_Mobile,
      f_Designation,
      f_gender,
      f_Course,
      f_Image: req.file.filename,
    });

    console.log("Employee added successfully", newEmployee);

    // Save the new employee to the database
    await newEmployee.save();

    res.status(200).json({ message: "Employee added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
app.delete("/employees/:id", async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);

    
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    console.log("Employee deleted successfully");
    res.status(200).json({ message: "Employee deleted successfully" });
    
  } catch (error) {
    console.error("Error while deleting employee:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.get("/employees/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.put("/employees/:id", upload, async (req, res) => {
  try {
    const {
      f_Name,
      f_Email,
      f_Mobile,
      f_Designation,
      f_gender,
      f_Course,
    } = req.body;

    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Update employee details
    employee.f_Name = f_Name;
    employee.f_Email = f_Email;
    employee.f_Mobile = f_Mobile;
    employee.f_Designation = f_Designation;
    employee.f_gender = f_gender;
    employee.f_Course = f_Course;
    if (req.file) {
      employee.f_Image = req.file.filename;
    }

    await employee.save();
    res.status(200).json({ message: "Employee updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});



app.get("/employees", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.get("/add-sample-employee", async (req, res) => {
  try {
    const sampleUser = new Employee({
      f_Id: 2,
      f_Name: "try",
      f_Email: "try@example.com",
      f_Mobile: "1234567890",
      f_Designation: "Developer",
      f_gender: "Male",
      f_Course: "Software Engineering",
    });

    await sampleUser.save();

    res.status(201).json({ message: "Sample user added successfully!" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error adding sample user", error: err.message });
  }
});

app.get("/add-sample-user", async (req, res) => {
  try {
    const sampleUser = new User({
      f_Id: 2,
      f_userName: "try",
      f_Pwd: "12345",
    });

    await sampleUser.save();
    res.status(201).json({ message: "Sample user added successfully!" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error adding sample user", error: err.message });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ f_userName: username, f_Pwd: password });

    if (user) {
      res.status(200).json({ message: "Login successful!" });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/api/example", (req, res) => {
  res.json({ message: "This is an example API response." });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
