import React from "react";
import "./styles.css";
import ErrorBody from "./ErrorBody";
import RepoTable from "./RepoTable";

const App = (props) => {
  return (
    <React.Fragment>
      <div className="mainBody">
        <div className="element-position">
          <span>Enter GitHub Username:</span>
          <input type="text" className="user-input" />
        </div>
        <div className="element-position button">
          <input type="submit" onClick={() => {}} />
        </div>
        <ErrorBody userName="Upasana" />
      </div>
      <RepoTable data="" />
    </React.Fragment>
  );
};

export default App;
