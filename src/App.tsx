import React, { useEffect, useState } from "react";
import "./styles.css";
import RepoSection from "./RepoSection";

interface AppProps {}
const App = (props: AppProps) => {
  return (
    <div className="mainBody">
      <RepoSection />
    </div>
  );
};

export default App;
