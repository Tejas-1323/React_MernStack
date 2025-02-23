import React from "react";

const StudentForm = ({ student, setStudent, onSubmit, editMode }) => (
  <div>
    <h4 className="text-center">
      {editMode ? "✏️ Edit Student" : "➕ Add Student"}
    </h4>
    <div className="row">
      <div className="col-md-6">
        <input
          type="text"
          className="form-control mt-2"
          placeholder="Name"
          value={student.name}
          onChange={(e) => setStudent({ ...student, name: e.target.value })}
        />
      </div>
      <div className="col-md-6">
        <input
          type="number"
          className="form-control mt-2"
          placeholder="Age"
          value={student.age}
          onChange={(e) => setStudent({ ...student, age: e.target.value })}
        />
      </div>
    </div>
    <div className="row">
      <div className="col-md-6">
        <input
          type="number"
          className="form-control mt-2"
          placeholder="Roll No"
          value={student.rollNo}
          onChange={(e) => setStudent({ ...student, rollNo: e.target.value })}
        />
      </div>
      <div className="col-md-6">
        <input
          type="text"
          className="form-control mt-2"
          placeholder="Address"
          value={student.address}
          onChange={(e) => setStudent({ ...student, address: e.target.value })}
        />
      </div>
    </div>
    <button
      className={`btn btn-${editMode ? "warning" : "primary"} mt-3 w-100`}
      onClick={onSubmit}
    >
      {editMode ? "Update Student" : "Add Info"}
    </button>
  </div>
);

export default StudentForm;
