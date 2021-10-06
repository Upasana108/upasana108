import React, { useEffect, useState } from "react";
import "./styles.css";
import ErrorBody from "./ErrorBody";
import RepoTable from "./RepoTable";

const App = (props) => {
  const [user, setUser] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [apiSuccess, setApiSuccess] = useState(false);
  // const [error, setError] = useState(false);

  const url = `https://api.github.com/users/${user}/repos`;
  const fetchData = async () => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setTableData(data);
      if (res.ok) {
        setApiSuccess(true);
      } else {
        setApiSuccess(false);
      }
      console.log("Data** ", res);
    } catch (error) {
      // setError(true);
      console.log("Error** ", error);
    }
  };
  // console.log("Inppur update ", error);
  return (
    <React.Fragment>
      <div className="mainBody">
        <div className="element-position">
          <span>Enter GitHub Username:</span>
          <input
            type="text"
            className="user-input"
            onChange={(event) => {
              setUser(event.target.value);
            }}
          />
        </div>
        <div className="element-position button">
          <input
            type="submit"
            onClick={(event) => {
              event.preventDefault();
              fetchData();
            }}
          />
        </div>
        {!apiSuccess && <ErrorBody userName={user} />}
      </div>
      {apiSuccess && tableData && tableData.length > 0 && (
        <RepoTable data={tableData} />
      )}
    </React.Fragment>
  );
};

export default App;
