import React, { useState } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
import Quiz from "./components/Quiz/Quiz";
import SignIn from "./components/Signin/Signin";

function App() {
  const [userExist, setUserExist] = useState<any>("");
  const [startQuiz, setStartQuiz] = useState<any>(false);
  return (
    <div className="app">
      {/* {userExist.length === 0 && (
        <SignIn userExist={userExist} setUserExist={setUserExist} />
      )} */}
      {/* {userExist && } */}
      {/* {userExist.length !== 0 && userExist[0]?.isAdmin === "true" && (
        <>
          <h1 className="center pt-20">Welcome to Quiz App Dashboard</h1>
          <Dashboard />
        </>
      )} */}
      {/* {userExist.length !== 0 && userExist[0]?.isAdmin !== "true" && (
        <>
          <h1 className="center pt-20">Welcome to Quiz App</h1>
          <Quiz userEmail={userExist?.email} />
        </>
      )} */}
      <h1 className="center pt-20">Welcome to Quiz App</h1>
      {!startQuiz && (
        <button
          onClick={() => setStartQuiz(true)}
          type="button"
          className="btn"
          style={{ position: "absolute", left: "47%", top: "50%" }}
        >
          Start Quiz
        </button>
      )}
      {startQuiz && (
        <Quiz setStartQuiz={setStartQuiz} userEmail={userExist?.email} />
      )}
    </div>
  );
}

export default App;
