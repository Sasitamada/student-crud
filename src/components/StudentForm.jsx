import { useEffect, useState } from "react";

function StudentForm({ addStudent, editingStudent, updateStudent }) {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");

  useEffect(() => {
    if (editingStudent) {
      setName(editingStudent.name);
      setCourse(editingStudent.course);
    }
  }, [editingStudent]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !course) return;

    const payload = {
      ...(editingStudent ? { id: editingStudent.id } : {}),
      name,
      course,
    };

    const action = editingStudent ? updateStudent(payload) : addStudent(payload);

    Promise.resolve(action)
      .then(() => {
        setName("");
        setCourse("");
      })
      .catch(() => {
        // Parent handles API errors; keep the form values so the user can retry.
      });
  };

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <div>
          <p className="section-label">{editingStudent ? "Edit student" : "Add student"}</p>
          <h2>{editingStudent ? "Update record" : "Create record"}</h2>
        </div>
        <p className="section-note">
          {editingStudent
            ? "Make changes and save the updated details."
            : "Enter a name and course to add a new student."}
        </p>
      </div>

      <input
        placeholder="Student Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Course"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
      />
      <button type="submit" className="primary-button">
        {editingStudent ? "Update Student" : "Add Student"}
      </button>
    </form>
  );
}

export default StudentForm;
