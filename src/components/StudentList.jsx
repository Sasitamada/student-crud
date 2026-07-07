function StudentList({ students, deleteStudent, editStudent, isLoading, error }) {
  return (
    <div className="table-wrap">
      <div className="table-header">
        <div>
          <p className="section-label">Student list</p>
          <h2>Records</h2>
        </div>
        <p className="section-note">Review, update, or remove student entries.</p>
      </div>

      <table className="student-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {isLoading ? (
            <tr>
              <td className="empty-state" colSpan="3">
                Loading students...
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td className="empty-state error-state" colSpan="3">
                {error}
              </td>
            </tr>
          ) : students.length === 0 ? (
            <tr>
              <td className="empty-state" colSpan="3">
                No students added yet. Use the form above to create the first record.
              </td>
            </tr>
          ) : (
            students.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.course}</td>

                <td>
                  <div className="action-group">
                    <button type="button" className="secondary-button" onClick={() => editStudent(student)}>
                      Edit
                    </button>

                    <button type="button" className="danger-button" onClick={() => deleteStudent(student.id)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;
