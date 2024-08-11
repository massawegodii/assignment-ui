import React, { useEffect, useState } from "react";
import { useLocalState } from "../utils/useLocalStorage";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [assignments, setAssignments] = useState(null);

  useEffect(() => {
    fetch("api/getAllAssignments", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "GET",
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((assignmentData) => {
        setAssignments(assignmentData);
        console.log(assignmentData);
        // window.location.href = `/assignments/${assignment.id}`;
      });
  }, [])

  function createAsignment() {
    fetch("api/assignments", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "POST",
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((assignment) => {
        window.location.href = `/assignments/${assignment.id}`;
      });
  }

  return (
    <div style={{ margin: "2em" }}>
      {assignments ? (
        assignments.map((assignment) => (
          <div key={assignment.id}>
            <div>
              <Link to={`/assignments/${assignment.id}`}>Assignment Id:{" "}
              {assignment.number}</Link>
            </div>
            <div>Name: {assignment.name}</div>
          </div>
        ))
      ) : (
        <></>
      )}{" "}
      <button onClick={() => createAsignment()}>Submit New Assignment</button>
    </div>
  );
};

export default Dashboard;
