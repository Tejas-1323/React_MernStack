import React from "react";

const StudentList = ({ students, onEdit, onDelete }) => (
  <ul className="list-group">
    {students.map((student) => (
      <li
        key={student._id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        {student.name} - {student.rollNo}
        <div>
          <button
            className="btn btn-warning btn-sm mx-2"
            onClick={() => onEdit(student)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(student._id)}
          >
            Delete
          </button>
        </div>
      </li>
    ))}
  </ul>
);

export default StudentList;
