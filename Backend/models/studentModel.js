import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    rollNo: { type: Number, unique: true, required: true },
    address: { type: String, required: true },
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);
export default Student;
