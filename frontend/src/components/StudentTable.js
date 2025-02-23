import React from "react";

const StudentTable = ({ students, onEdit, onDelete }) => {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered">
        <thead className="bg-primary text-white">
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Roll No</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>{student.rollNo}</td>
                <td>{student.address}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => onEdit(student)}
                  >
                    ✏️ Edit
                  </button>

                  {/* Added spacing between Edit & Delete buttons */}
                  <button
                    className="btn btn-danger btn-sm ms-3" // ✅ Added Bootstrap spacing
                    onClick={() => onDelete(student._id)}
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No students found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
