import express from "express";
import {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
  registerUser,
  loginUser,
} from "../controllers/studentController.js";

const router = express.Router();

router.get("/", getStudents);
router.post("/", addStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);
router.post("/signup", registerUser);
router.post("/login", loginUser);
export default router;
