import { useEffect, useState } from "react";
import "./App.css";
import Add from "./assets/add.svg?react";
import Night from "./assets/night.svg?react";
import Light from "./assets/sun.svg?react";

import HabitCard from "./components/HabitCard";
import Modal from "./components/Modal";
import {
  addCompletions,
  deleteAllCompletions,
  deleteHabit,
  getAllCompletetions,
  getAllHabits,
  saveHabit,
} from "./utils/habitUtils";
import { type Completion, type Habit } from "./db";

function App() {
  const [isDark, setIsDark] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [length, setLength] = useState(1);

  const [habits, setHabits] = useState<Habit[]>([]);
  const [completions, setCompletions] = useState<Completion[]>([]);

  const isDarkHandler = () => {
    setIsDark((prev) => !prev);
  };

  const setIsOpenHandler = () => {
    setIsOpen((prev) => !prev);
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLength(parseInt(e.target.value));
  };

  const onChangeNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onChangeDescriptionHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const desc = e.target.value;

    if (desc.length <= 100) {
      setDescription(desc);
    }
  };

  const onSaveHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!name.trim() || !description.trim()) {
      console.log("Please fill in all fields");
      return;
    }
    try {
      await saveHabit(name, description, length);

      setName("");
      setDescription("");
      setLength(1);

      setIsOpenHandler();

      const updatedHabits = await getAllHabits(); //it's local database anyway.
      setHabits(updatedHabits);
    } catch (e) {
      console.error("Failed to save:", e);
    }
  };

  const onDeleteHandler = async (habitId: number) => {
    try {
      await deleteHabit(habitId);
      await deleteAllCompletions(habitId)
      const updatedHabits = await getAllHabits(); //it's local database anyway.
      setHabits(updatedHabits);
      
      const updatedCommits = await getAllCompletetions()
      setCompletions(updatedCommits)

    } catch (e) {
      console.error(e);
    }
  };

  const onCommitHandler = async (habitID: number) => {
    try {
      const today = new Date();
      result = await addCompletions(habitID, today);

      const updatedCommits = await getAllCompletetions()
      setCompletions(updatedCommits)

    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light"
    );
  }, [isDark]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const habitsData = await getAllHabits();
        setHabits(habitsData);

        const completionsData = await getAllCompletetions();
        setCompletions(completionsData);
      } catch (e) {
        console.error("Failed to load habits:", e);
      }
    };

    loadData();
  }, []);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={setIsOpenHandler}
        title="Start A New Habit"
      >
        <div className="modal-input">
          <p>Name: </p>
          <input
            placeholder="Your Habit"
            value={name}
            onChange={onChangeNameHandler}
          />
          <p>Description:</p>
          <textarea
            placeholder="Max.100 Character"
            maxLength={100}
            value={description}
            onChange={onChangeDescriptionHandler}
          />
          <p>Length:</p>
          <select value={length} onChange={onChangeHandler}>
            <option value="1">1 Week</option>
            <option value="2">2 Weeks</option>
            <option value="4">4 Weeks</option>
            <option value="8">8 Weeks</option>
            <option value="12">12 Weeks</option>
            <option value="26">26 Weeks (6 months)</option>
            <option value="52">52 Weeks (1 year)</option>
          </select>
          <button onClick={onSaveHandler}>Save</button>
        </div>
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
          {habits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              completions={completions.filter((item) => item.habitId === habit.id)} // you'll need to get completions too
              onDelete={onDeleteHandler}
              onCommit={onCommitHandler}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
