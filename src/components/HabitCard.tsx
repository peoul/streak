import "./HabitCard.css";
import { type HabitCardProps } from "../types";
import Trash from "../assets/trash.svg?react";
import Done from "../assets/done.svg?react";


const HabitCard = ({
  habit,
  completions,
  onCommit,
  onDelete,
}: HabitCardProps) => {
  console.log(habit);
  console.log(completions);



  return (
    <div className="habit-card">
      <div className="left-side">
        <h1>{habit.name}</h1>
        <p>{habit.description}</p>
        <p>Start Date: {habit.createdAt.toLocaleDateString()}</p>

        <div className="toolkit-card">
          <button title="Commit">
            <Done className="toolkit-icon" />
          </button>
          <button title="Delete Habit :< " value={habit.id} onClick={()=> onDelete(habit.id)}>
            <Trash className="toolkit-icon" />
          </button>
        </div>
      </div>

      <div className="right-side">
        <div className="contribution-grid">
          {/* Generate 371 squares (53 weeks × 7 days) */}
          {Array.from({ length: habit.length * 7 }).map((_, index) => (
            <div key={index} className="square" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HabitCard;
