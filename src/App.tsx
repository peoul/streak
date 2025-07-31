import { useEffect, useState } from "react";
import "./App.css";
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
      <hr/>
    </div>
    <button onClick={isDarkHandler}>{isDark ? "☀️" : "🌙"}</button>
  </>
);
}

export default App;
