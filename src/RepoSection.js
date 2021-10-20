import React, { useEffect, useState } from "react";
import ErrorBody from "./ErrorBody";
import RepoTable from "./RepoTable";

const RepoSection = (props) => {
  let {} = props;

  const [user, setUser] = useState(null);
  const [userFinal, setUserFinal] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [apiSuccess, setApiSuccess] = useState(false);
  const [error, setError] = useState(false);

  const url = `https://api.github.com/users/${user}/repos`;

  const fetchData = async () => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setTableData(data);
      if (res.ok) {
        setApiSuccess(true);
        setError(false);
      } else {
        setApiSuccess(false);
        setError(true);
      }
      console.log("Data** ", res);
    } catch (error) {
      // setError(true);
      console.log("Error** ", error);
    }
  };

  let showtable = apiSuccess && tableData && tableData.length > 0;

  return (
    <div className="repo-section" id="repo-section">
      <div
        className={` ${showtable ? "remove-position" : "element-position"}`}
        id="input-section"
      >
        <input
          type="text"
          className="user-input"
          placeholder="GitHub Username"
          onChange={(event) => {
            setUser(event.target.value);
          }}
        />
        <div className="submit-section">
          <input
            type="submit"
            className="submit-button"
            onClick={(event) => {
              event.preventDefault();
              fetchData();
              setUserFinal(user);
            }}
          />
        </div>
      </div>
      {error && <ErrorBody userName={userFinal} />}
      {showtable ? (
        <RepoTable data={tableData} />
      ) : apiSuccess && tableData && tableData.length === 0 ? (
        "There is no Repo created for this user."
      ) : (
        ""
      )}
    </div>
  );
};

export default RepoSection;
