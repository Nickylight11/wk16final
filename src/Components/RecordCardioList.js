import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../App.css"; // Import the CSS file

const RecordCardioList = () => {
  const [records, setRecords] = useState([]);
  const [exerciseType, setExerciseType] = useState("");
  const [distanceRun, setDistance] = useState("");
  const [date, setDate] = useState("");
  const [editRecordId, setEditRecordId] = useState(null);
  const [editExerciseType, setEditExerciseType] = useState("");
  const [editDistanceRun, setEditDistanceRun] = useState("");
  const [editDate, setEditDate] = useState("");
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    // Fetch records from the Mock API when the component mounts
    const fetchRecords = async () => {
      try {
        // Fetch all records
        const response = await axios.get(
          "https://65b1572dd16d31d11bdeba79.mockapi.io/CardioRecords"
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
      if (!distanceRun || !date) {
        console.error("All fields are required.");
        return;
      }

      // Create new record object
      const newRecord = {
        exerciseType,
        distanceRun: parseFloat(distanceRun),
        date,
      };

      // Log the record before sending the request
      console.log("New Record:", newRecord);

      // Send POST request to Mock API
      await axios.post(
        "https://65b1572dd16d31d11bdeba79.mockapi.io/CardioRecords",
        newRecord
      );

      // Fetch records again after creating a new record
      const response = await axios.get(
        "https://65b1572dd16d31d11bdeba79.mockapi.io/CardioRecords"
      );

      // Set state with the updated records
      setRecords(response.data);

      // Clear input fields
      setExerciseType("");
      setDistance("");
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
        `https://65b1572dd16d31d11bdeba79.mockapi.io/CardioRecords/${id}`
      );

      // Fetch records again after deleting a record
      const response = await axios.get(
        "https://65b1572dd16d31d11bdeba79.mockapi.io/CardioRecords"
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
    setEditDistanceRun(String(record.distanceRun));
    setEditDate(record.date);

    // Show the edit form
    setShowEditForm(true);
  };

  const handleUpdateRecord = async () => {
    try {
      // Validate input
      if (!editExerciseType || !editDistanceRun || !editDate) {
        console.error("All fields are required.");
        return;
      }

      // Create updated record object
      const updatedRecord = {
        exerciseType: editExerciseType,
        distanceRun: parseFloat(editDistanceRun),
        date: editDate,
      };

      // Send PUT request to Mock API to update the record
      await axios.put(
        `https://65b1572dd16d31d11bdeba79.mockapi.io/CardioRecords/${editRecordId}`,
        updatedRecord
      );

      // Fetch records again after updating the record
      const response = await axios.get(
        "https://65b1572dd16d31d11bdeba79.mockapi.io/CardioRecords"
      );

      // Set state with the updated records
      setRecords(response.data);

      // Hide the edit form
      setShowEditForm(false);

      // Reset state variables for the record being edited
      setEditRecordId(null);
      setEditExerciseType("");
      setEditDistanceRun("");
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
    <div className="RecordCardioListContainer">
      <h2 className="mt-3 mb-4">Cardio Records</h2>
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

            <label>Distance Run (m):</label>
            <input
              type="text"
              value={editDistanceRun}
              onChange={(e) => setEditDistanceRun(e.target.value)}
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

          <label>Distance Run (m):</label>
          <input
            type="text"
            value={distanceRun}
            onChange={(e) => setDistance(e.target.value)}
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
            <th>Distance</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{record.exerciseType}</td>
              <td>{record.distanceRun}</td>
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

export default RecordCardioList;
