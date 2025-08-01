import "./HabitCard.css";
import { type HabitCardProps } from "../types";

const HabitCard = ({ habit, completions, onCommit }: HabitCardProps) => {
  return (
    <div className="habit-card">
      <div className="left-side">
        <h1>Title</h1>
        <p>Description</p>
        <button>Commit</button>
        <button>Trash</button>
      </div>

      <div className="right-side">
        <div className="contribution-grid">
          {/* Generate 371 squares (53 weeks × 7 days) */}
          {Array.from({ length: 371 }).map((_, index) => (
            <div key={index} className="square" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HabitCard;
