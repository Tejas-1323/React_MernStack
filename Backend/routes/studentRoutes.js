import express from "express";
import multer from "multer";
import rateLimit from "express-rate-limit";


// const loginLimiter = rateLimit({
//   windowMs: 10 * 60 * 1000, // 10 minutes
//   max: 5, // Limit each IP to 5 requests per 10 minutes
//   message: "Too many login attempts. Please try again later.",
// });

import {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
  registerUser,
  loginUser,
  fileData,
} from "../controllers/studentController.js";

const router = express.Router();

router.get("/",getStudents);
router.post("/add", addStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);
router.post("/signup", registerUser);
router.post("/login", loginUser);
// Configure Multer to handle file uploads
const upload = multer({ dest: "uploads/" });

router.post("/filter-logs", upload.single("file"), fileData);



export default router;
