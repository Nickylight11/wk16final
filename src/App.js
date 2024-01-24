import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import RecordBPList from "./Components/RecordBPList";
import RecordCardioList from "./Components/RecordCardioList";
import RecordSquatList from "./Components/RecordSquatList";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/records/bp" element={<RecordBPList />} />
        <Route path="/records/cardio" element={<RecordCardioList />} />
        <Route path="/records/squat" element={<RecordSquatList />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
