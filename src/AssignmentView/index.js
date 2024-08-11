import React, { useEffect, useState } from "react";
import { useLocalState } from "../utils/useLocalStorage";

const AssignmentView = () => {
  const [assignment, setAssignments] = useState(null);
  const [jwt, setJwt] = useLocalState("", "jwt");
  const assignmentId = window.location.href.split("/assignments/")[1];

  useEffect(() => {
    fetch(`/api/assignmentId/${assignmentId}`, {
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
        console.log(assignment);
      });
  });

  return (
    <div>
      <h1>Assignment {assignmentId}</h1>
      {assignment ? (
        <>
          <h2>Status {assignment.status}</h2>

          <h3>
            Github Url: <input type="url" id="githubUrl" />
          </h3>
          <h3>
            Code Review Video url: <input type="url" id="githubUrl" />
          </h3>
          <h3>
            Branch: <input type="text" id="branch" />
          </h3>
          <button>Submit Assignment</button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default AssignmentView;
