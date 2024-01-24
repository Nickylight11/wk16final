import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditCardioRecord = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [record, setRecord] = useState(null);

  useEffect(() => {
    const fetchRecordDetails = async () => {
      try {
        const response = await axios.get(
          `https://65b1572dd16d31d11bdeba79.mockapi.io/CardioRecords/${id}`
        );

        setRecord(response.data);
      } catch (error) {
        console.error("Error fetching record details:", error.message);
      }
    };

    fetchRecordDetails();
  }, [id]);

  const handleUpdateRecord = async (updatedData) => {
    console.log("Checking for updated data", updatedData);
    try {
      const response = await axios.put(
        `https://65b1572dd16d31d11bdeba79.mockapi.io/CardioRecords/${id}`,
        updatedData
      );

      // Check if the update was successful
      if (response.status === 200) {
        console.log("Record updated successfully");
        // Redirect to the record list page or another appropriate location
        navigate("/");
      } else {
        console.error(
          "Failed to update record. Server responded with:",
          response
        );
      }
    } catch (error) {
      console.error("Error updating record:", error.message);
      console.error("Error stack trace:", error.stack);
    }
  };

  return (
    <div>
      <h2>Edit Record {id}</h2>
      {record ? (
        <div>
          {/* Render form fields for editing record */}
          <button onClick={handleUpdateRecord}>Update Record</button>
        </div>
      ) : (
        <p>Loading record details...</p>
      )}
    </div>
  );
};

export default EditCardioRecord;
