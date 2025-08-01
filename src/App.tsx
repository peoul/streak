import { useEffect, useState } from "react";
import "./App.css";
import Light from "./assets/sun.svg?react";
import Night from "./assets/night.svg?react";
import Add from "./assets/add.svg?react";

import { db } from "./db";

function App() {
  const [isDark, setIsDark] = useState(true);

  const isDarkHandler = () => {
    setIsDark((prev) => !prev);
  };

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light"
    );
  }, [isDark]);

  return (
    <>
      <div className="header">
        <h1>Streak</h1>
        <p>Commit Your Habits Like Your Code</p>
        <hr />

        <div className="toolbox">
          <button><Add className="add_btn"/></button>
          <button onClick={isDarkHandler}>
            {isDark ? <Light className="mode" /> : <Night className="mode"/>}
          </button>
          
        </div>
      </div>
    </>
  );
}

export default App;
