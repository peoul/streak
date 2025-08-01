import { useEffect, useState } from "react";
import "./App.css";
import Light from "./assets/sun.svg?react";
import Night from "./assets/night.svg?react";
import Add from "./assets/add.svg?react";

import { db } from "./db";
import HabitCard from "./components/HabitCard";
import Modal from "./components/Modal";

function App() {
  const [isDark, setIsDark] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const isDarkHandler = () => {
    setIsDark((prev) => !prev);
  };

  const setIsOpenHandler = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light"
    );
  }, [isDark]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={setIsOpenHandler}>
        <h1>Hello</h1>
      </Modal>
      <div className="header">
        <div className="title">
          <h1>Streak</h1>
          <p>Commit Your Habits Like Your Code</p>
        </div>

        <hr />

        <div className="toolbox">
          <button title="Add" onClick={setIsOpenHandler}>
            <Add className="add_btn" />
          </button>
          <button onClick={isDarkHandler} title="Change Mode">
            {isDark ? <Light className="mode" /> : <Night className="mode" />}
          </button>
        </div>

        <div className="habit-list">
          <HabitCard />
        </div>
      </div>
    </>
  );
}

export default App;
