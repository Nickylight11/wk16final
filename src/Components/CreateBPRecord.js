import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateBPRecord = () => {
  const navigate = useNavigate();
  const [exerciseType, setExerciseType] = useState("");
  const [weightLifted, setWeightLifted] = useState("");
  const [repetitions, setRepetitions] = useState("");
  const [date, setDate] = useState("");
  const [records, setRecords] = useState([]);

  useEffect(() => {
    // Fetch records from the Mock API when the component mounts
    fetchRecords();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const fetchRecords = async () => {
    try {
      const response = await axios.get(
        "https://65b1572dd16d31d11bdeba79.mockapi.io/BenchPressRecords"
      );
      setRecords(response.data);
    } catch (error) {
      console.error("Error fetching records:", error.message);
    }
  };

  const handleCreateBPRecord = async () => {
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
        "https://65b1572dd16d31d11bdeba79.mockapi.io/BenchPressRecords",
        newRecord
      );

      // Fetch records again after creating a new record
      fetchRecords();

      // Clear input fields
      setExerciseType("");
      setWeightLifted("");
      setRepetitions("");
      setDate("");

      // Use navigate to programmatically navigate to the desired location
      navigate("/");
    } catch (error) {
      // Handle errors (e.g., display error message)
      console.error("Error creating record:", error.message);

      // Check for error response from the API
      if (error.response) {
        console.log("API Response (Error):", error.response.data);
      }
    }
  };

  return (
    <div>
      <h2>Create Personal Record</h2>
      <form>
        <label>Exercise Type:</label>
        <input
          type="text"
          value={exerciseType}
          onChange={(e) => setExerciseType(e.target.value)}
        />

        <label>Weight Lifted:</label>
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

        <button type="button" onClick={handleCreateBPRecord}>
          Create Record
        </button>
      </form>

      <h2>Records</h2>
      <table>
        <thead>
          <tr>
            <th>Exercise Type</th>
            <th>Weight Lifted</th>
            <th>Repetitions</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{record.exerciseType}</td>
              <td>{record.weightLifted}</td>
              <td>{record.repetitions}</td>
              <td>{record.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CreateBPRecord;
