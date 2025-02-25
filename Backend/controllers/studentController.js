import Student from "../models/studentModel.js";
import User from "../models/User.js";
import fs from "fs";
import path from "path";
import multer from "multer";
// Get all students
export const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

// Add a student
export const addStudent = async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (err) {
    console.log(err);

    res.status(500).json({ error: "Failed to add student" });
  }
};

// Update student by ID
export const updateStudent = async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedStudent);
  } catch (err) {
    res.status(500).json({ error: "Failed to update student" });
  }
};

// Delete student by ID
export const deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete student" });
  }
};


export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    return res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


// Login API - Verify user credentials
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // For demonstration, we are comparing plain text passwords.
    // In production, use bcrypt.compare() after hashing passwords.
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ message: "Server error" });
  }
};



export const fileData = async (req, res) => {
  try {


    const file = req.file;
    const { data } = req.body;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    if (!data) {
      return res
        .status(400)
        .json({ error: "Missing 'data' field in request." });
    }

    let parsedData;
    try {
      parsedData = JSON.parse(data);
    } catch (error) {
      return res
        .status(400)
        .json({ error: "Invalid JSON format in 'data' field" });
    }

    const { time, apiName } = parsedData;
    if (!time && !apiName) {
      return res
        .status(400)
        .json({ error: "At least 'time' or 'apiName' is required." });
    }

    // ✅ Read file content
    const filePath = path.resolve(file.path);
    const fileContent = fs.readFileSync(filePath, "utf8");

    // ✅ Filter logs
    const matchingLogs = fileContent
      .split("\n")
      .filter(
        (line) =>
          (time && line.includes(time)) || (apiName && line.includes(apiName))
      );

    // ✅ Delete file after processing
    fs.unlinkSync(filePath);

    // ✅ Convert logs into structured JSON format
    const formattedLogs = matchingLogs.map((log) => formatLog(log));

    if (formattedLogs.length === 0) {
      return res.json({ message: "No matching logs found." });
    }

    return res.json({ logs: formattedLogs });
  } catch (error) {
    console.error("Error processing logs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Function to format log data properly
 */
function formatLog(log) {
  try {
    // If the log is already in JSON format, parse it
    return JSON.parse(log);
  } catch (error) {
    // If log is in plain text, convert to structured object
    const logParts = log.split(" "); // Assuming space-separated log parts
    return {
      timestamp: logParts[0] || "N/A",
      logLevel: logParts[1] || "N/A",
      apiName: logParts[2] || "N/A",
      message: logParts.slice(3).join(" ") || "N/A",
    };
  }
}


