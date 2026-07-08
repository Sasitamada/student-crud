import { useEffect, useState } from "react";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import "./App.css";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ??
  "https://student-crud-backend-7nbbk5tyg-sasis-projects-45f4814e.vercel.app";
const STUDENTS_ENDPOINT = `${API_BASE_URL.replace(/\/$/, "")}/students`;

function App() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setIsLoading(true);
        setError("");

        const response = await fetch(STUDENTS_ENDPOINT, {
          headers: {
            accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to load students.");
        }

        const data = await response.json();
        setStudents(data);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const addStudent = async (student) => {
    const response = await fetch(STUDENTS_ENDPOINT, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    });

    if (!response.ok) {
      throw new Error("Failed to add student.");
    }

    const createdStudent = await response.json();
    setStudents((currentStudents) => [...currentStudents, createdStudent]);
  };

  const deleteStudent = async (id) => {
    const response = await fetch(`${STUDENTS_ENDPOINT}/${id}`, {
      method: "DELETE",
      headers: {
        accept: "application/json",
      },
    });

    if (!response.ok && response.status !== 204) {
      throw new Error("Failed to delete student.");
    }

    setStudents((currentStudents) =>
      currentStudents.filter((student) => student.id !== id)
    );
  };

  const editStudent = (student) => {
    setEditingStudent(student);
  };

  const updateStudent = async (updatedStudent) => {
    const response = await fetch(`${STUDENTS_ENDPOINT}/${updatedStudent.id}`, {
      method: "PUT",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: updatedStudent.name,
        course: updatedStudent.course,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update student.");
    }

    const savedStudent = await response.json();
    setStudents((currentStudents) =>
      currentStudents.map((student) =>
        student.id === savedStudent.id ? savedStudent : student
      )
    );

    setEditingStudent(null);
  };

  return (
    <div className="app-shell">
      <div className="app-background" aria-hidden="true" />

      <main className="container">
        <section className="hero-card">
          <div className="hero-copy">
            <p className="eyebrow">Student Management</p>
            <h1>Student CRUD App</h1>
            <p className="hero-text">
              Keep student records organized with a clean, fast, professional
              workspace.
            </p>
          </div>

          <div className="hero-metrics">
            <div className="metric-card">
              <span className="metric-label">Students</span>
              <strong>{students.length.toString().padStart(2, "0")}</strong>
            </div>
            <div className="metric-card accent">
              <span className="metric-label">Status</span>
              <strong>{editingStudent ? "Editing" : "Ready"}</strong>
            </div>
          </div>
        </section>

        <section className="single-view">
          <div className="panel form-panel">
            <StudentForm
              addStudent={addStudent}
              editingStudent={editingStudent}
              updateStudent={updateStudent}
            />
          </div>

          <div className="panel table-panel">
            <StudentList
              students={students}
              deleteStudent={deleteStudent}
              editStudent={editStudent}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
