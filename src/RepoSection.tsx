import React, { useEffect, useState } from "react";
import ErrorBody from "./ErrorBody";
import RepoTable from "./RepoTable";

interface RepoProps {}

const RepoSection: any = (props: RepoProps) => {
  let {} = props;

  const [user, setUser]: any = useState(null);
  const [userFinal, setUserFinal]: any = useState(null);
  const [tableData, setTableData]: any = useState([]);
  const [apiSuccess, setApiSuccess]: any = useState(false);
  const [error, setError]: any = useState(false);

  const url = `https://api.github.com/users/${user}/repos`;

  const fetchData: any = async () => {
    try {
      const res: any = await fetch(url);
      const data: any = await res.json();
      setTableData(data);
      if (res.ok) {
        setApiSuccess(true);
        setError(false);
      } else {
        setApiSuccess(false);
        setError(true);
      }
    } catch (error) {
      // setError(true);
    }
  };

  let showtable: any = apiSuccess && tableData && tableData.length > 0;

  return (
    <div className="repo-section" id="repo-section">
      <div
        className={` ${showtable ? "remove-position" : "element-position"}`}
        id="input-section"
      >
        <input
          type="text"
          // tabIndex={0}
          className="user-input"
          placeholder="GitHub Username"
          onChange={(event) => {
            setUser(event.target.value);
          }}
        />
        <div className="submit-section">
          <input
            type="submit"
            disabled={user === null ? true : false}
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
