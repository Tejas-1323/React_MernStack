import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import StudentForm from "../components/StudentForm";
import StudentTable from "../components/StudentTable";
import Navbar from "../components/Navbar"; // ✅ Import Navbar
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactPaginate from "react-paginate"; // ✅ Pagination support

export const BASE_URL = "http://localhost:5000/api/students";
const Home = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [student, setStudent] = useState({
    name: "",
    age: "",
    rollNo: "",
    address: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [searchRollNo, setSearchRollNo] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const recordsPerPage = 6;

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await axios.get(BASE_URL);
      const sortedData = response.data.reverse();
      setStudents(sortedData);
      setFilteredStudents(sortedData);
    } catch (error) {
      toast.error("Error fetching students!", { autoClose: 2000 });
    }
    setLoading(false);
  };

  const handleSearch = useCallback(() => {
    let filteredData = students;

    if (searchName) {
      filteredData = filteredData.filter((student) =>
        student.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    if (searchRollNo) {
      filteredData = filteredData.filter((student) =>
        student.rollNo.toString().includes(searchRollNo)
      );
    }

    setFilteredStudents(filteredData);
    setCurrentPage(0);
  }, [searchName, searchRollNo, students]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * recordsPerPage;
  const currentRecords = filteredStudents.slice(
    offset,
    offset + recordsPerPage
  );
  const pageCount = Math.ceil(filteredStudents.length / recordsPerPage);

  const handleSubmit = async () => {
    try {
      if (editMode) {
        await axios.put(`${BASE_URL}/${student._id}`, student);
        toast.success("Student updated successfully!", { autoClose: 2000 });
      } else {
        await axios.post(`${BASE_URL}/add`, student);
        toast.success("Student added successfully!", { autoClose: 2000 });
      }
      setStudent({ name: "", age: "", rollNo: "", address: "" });
      setEditMode(false);
      setShowForm(false);
      fetchStudents();
      clearSearchFields();
    } catch (error) {
      toast.error("Error saving student!", { autoClose: 2000 });
    }
  };

  const handleEdit = (studentToEdit) => {
    setStudent(studentToEdit);
    setEditMode(true);
    setShowForm(true);
    clearSearchFields();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      toast.warning("Student deleted successfully!", { autoClose: 2000 });
      fetchStudents();
      clearSearchFields();
    } catch (error) {
      toast.error("Error deleting student!", { autoClose: 2000 });
    }
  };

  const clearSearchFields = () => {
    setSearchName("");
    setSearchRollNo("");
  };

  return (
    <div
      className="container-fluid min-vh-100 d-flex flex-column"
      style={{
        background: "linear-gradient(to right, #e3f2fd, #bbdefb)", // ✅ Gradient Background
        paddingBottom: "40px",
      }}
    >
      {/* ✅ Navbar */}
      <Navbar />

      <div className="container mt-4 p-4 rounded shadow-lg bg-white">
        <h2 className="text-center text-primary mb-4">
          🎓 Student Management System
        </h2>
        <ToastContainer position="top-right" autoClose={2000} />

        {/* Search Inputs */}
        <div className="row mb-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="🔍 Search by Name..."
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="🔍 Search by Roll Number..."
              value={searchRollNo}
              onChange={(e) => setSearchRollNo(e.target.value)}
            />
          </div>
        </div>

        {/* Floating Add Button */}
        <button
          className="btn btn-success floating-btn mb-2"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "❌ Close" : "➕ Add Student"}
        </button>

        <div style={{ marginBottom: "20px" }}></div>

        {showForm && (
          <div className="card p-4 shadow-lg mb-4 bg-light">
            <StudentForm
              student={student}
              setStudent={setStudent}
              onSubmit={handleSubmit}
              editMode={editMode}
            />
          </div>
        )}

        {loading ? (
          <p className="text-center mt-3">⏳ Loading students...</p>
        ) : (
          <>
            <StudentTable
              students={currentRecords}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />

            {/* Pagination Controls */}
            <ReactPaginate
              previousLabel={"← Previous"}
              nextLabel={"Next →"}
              pageCount={pageCount}
              onPageChange={handlePageClick}
              containerClassName={"pagination justify-content-center mt-3"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
              previousClassName={"page-item"}
              previousLinkClassName={"page-link"}
              nextClassName={"page-item"}
              nextLinkClassName={"page-link"}
              activeClassName={"active"}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
