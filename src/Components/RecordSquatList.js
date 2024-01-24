import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../App.css"; // Import the CSS file

const RecordSquatList = () => {
  const [records, setRecords] = useState([]);
  const [exerciseType, setExerciseType] = useState("");
  const [weightLifted, setWeightLifted] = useState("");
  const [repetitions, setRepetitions] = useState("");
  const [date, setDate] = useState("");
  const [editRecordId, setEditRecordId] = useState(null);
  const [editExerciseType, setEditExerciseType] = useState("");
  const [editWeightLifted, setEditWeightLifted] = useState("");
  const [editRepetitions, setEditRepetitions] = useState("");
  const [editDate, setEditDate] = useState("");
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    // Fetch records from the Mock API when the component mounts
    const fetchRecords = async () => {
      try {
        // Fetch all records
        const response = await axios.get(
          "https://65b1572dd16d31d11bdeba79.mockapi.io/SquatRecords"
        );

        // Set state with the fetched records
        setRecords(response.data);
      } catch (error) {
        console.error("Error fetching records:", error.message);
      }
    };

    fetchRecords();
  }, []);

  const handleCreateRecord = async () => {
    try {
      // Validate input
      if (!exerciseType || !weightLifted || !repetitions || !date) {
        console.error("All fields are required.");
        return;
      }

      // Create new record object
      const newRecord = {
        exerciseType,
        weightLifted: parseFloat(weightLifted),
        repetitions: parseInt(repetitions),
        date,
      };

      // Log the record before sending the request
      console.log("New Record:", newRecord);

      // Send POST request to Mock API
      await axios.post(
        "https://65b1572dd16d31d11bdeba79.mockapi.io/SquatRecords",
        newRecord
      );

      // Fetch records again after creating a new record
      const response = await axios.get(
        "https://65b1572dd16d31d11bdeba79.mockapi.io/SquatRecords"
      );

      // Set state with the updated records
      setRecords(response.data);

      // Clear input fields
      setExerciseType("");
      setWeightLifted("");
      setRepetitions("");
      setDate("");
    } catch (error) {
      // Handle errors (e.g., display error message)
      console.error("Error creating record:", error.message);

      // Check for error response from the API
      if (error.response) {
        console.log("API Response (Error):", error.response.data);
      }
    }
  };

  const handleDeleteRecord = async (id) => {
    try {
      // Send DELETE request to Mock API
      await axios.delete(
        `https://65b1572dd16d31d11bdeba79.mockapi.io/SquatRecords/${id}`
      );

      // Fetch records again after deleting a record
      const response = await axios.get(
        "https://65b1572dd16d31d11bdeba79.mockapi.io/SquatRecords"
      );

      // Set state with the updated records
      setRecords(response.data);
    } catch (error) {
      console.error("Error deleting record:", error.message);

      // Check for error response from the API
      if (error.response) {
        console.log("API Response (Error):", error.response.data);
      }
    }
  };

  const handleEditRecord = (record) => {
    // Set state with the details of the record being edited
    setEditRecordId(record.id);
    setEditExerciseType(record.exerciseType);
    setEditWeightLifted(String(record.weightLifted));
    setEditRepetitions(String(record.repetitions));
    setEditDate(record.date);

    // Show the edit form
    setShowEditForm(true);
  };

  const handleUpdateRecord = async () => {
    try {
      // Validate input
      if (
        !editExerciseType ||
        !editWeightLifted ||
        !editRepetitions ||
        !editDate
      ) {
        console.error("All fields are required.");
        return;
      }

      // Create updated record object
      const updatedRecord = {
        exerciseType: editExerciseType,
        weightLifted: parseFloat(editWeightLifted),
        repetitions: parseInt(editRepetitions),
        date: editDate,
      };

      // Send PUT request to Mock API to update the record
      await axios.put(
        `https://65b1572dd16d31d11bdeba79.mockapi.io/SquatRecords/${editRecordId}`,
        updatedRecord
      );

      // Fetch records again after updating the record
      const response = await axios.get(
        "https://65b1572dd16d31d11bdeba79.mockapi.io/SquatRecords"
      );

      // Set state with the updated records
      setRecords(response.data);

      // Hide the edit form
      setShowEditForm(false);

      // Reset state variables for the record being edited
      setEditRecordId(null);
      setEditExerciseType("");
      setEditWeightLifted("");
      setEditRepetitions("");
      setEditDate("");
    } catch (error) {
      console.error("Error updating record:", error.message);

      // Check for error response from the API
      if (error.response) {
        console.log("API Response (Error):", error.response.data);
      }
    }
  };

  return (
    <div className="RecordSquatListContainer">
      <h2 className="mt-3 mb-4">Squat Records</h2>
      {/* Edit form display */}
      {showEditForm && (
        <div className="editFormContainer mb-4">
          <h3>Edit Record</h3>
          <form>
            <label>Exercise Type:</label>
            <input
              type="text"
              value={editExerciseType}
              onChange={(e) => setEditExerciseType(e.target.value)}
            />

            <label>Weight Lifted (lbs.):</label>
            <input
              type="text"
              value={editWeightLifted}
              onChange={(e) => setEditWeightLifted(e.target.value)}
            />

            <label>Repetitions:</label>
            <input
              type="text"
              value={editRepetitions}
              onChange={(e) => setEditRepetitions(e.target.value)}
            />

            <label>Date:</label>
            <input
              type="text"
              value={editDate}
              onChange={(e) => setEditDate(e.target.value)}
            />

            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={handleUpdateRecord}
            >
              Update Record
            </button>
          </form>
        </div>
      )}

      {/* Create Record Form */}
      <div className="mb-4">
        <form className="p-3 bg-light rounded">
          <label>Exercise Type:</label>
          <input
            type="text"
            value={exerciseType}
            onChange={(e) => setExerciseType(e.target.value)}
          />

          <label>Weight Lifted (lbs.):</label>
          <input
            type="text"
            value={weightLifted}
            onChange={(e) => setWeightLifted(e.target.value)}
          />

          <label>Repetitions:</label>
          <input
            type="text"
            value={repetitions}
            onChange={(e) => setRepetitions(e.target.value)}
          />

          <label>Date:</label>
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <button
            type="button"
            className="btn btn-outline-success"
            onClick={handleCreateRecord}
          >
            Create Record
          </button>
        </form>
      </div>

      {/* Record List Table */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Exercise Type</th>
            <th>Weight Lifted</th>
            <th>Repetitions</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{record.exerciseType}</td>
              <td>{record.weightLifted}</td>
              <td>{record.repetitions}</td>
              <td>{record.date}</td>
              <td>
                <button
                  className="editButton btn btn-outline-warning"
                  onClick={() => handleEditRecord(record)}
                >
                  Edit
                </button>
                <button
                  className="deleteButton btn btn-outline-danger"
                  onClick={() => handleDeleteRecord(record.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecordSquatList;
