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

  const checkCompletions = (date: Date) => {
    return completions.find((item) => {
      const completionDate = new Date(item.completedDate);
      return completionDate.toDateString() === date.toDateString();
    });
  };

const isPastDeadline = () => {
  const today = new Date();
  
  const endDate = new Date(habit.createdAt);
  endDate.setDate(habit.createdAt.getDate() + (habit.length * 7));
  
  return today > endDate;
};


  return (
    <div className="habit-card">
      <div className="left-side">
        <h1>{habit.name}</h1>
        <p>{habit.description}</p>
        <p>Start Date: {habit.createdAt.toLocaleDateString()}</p>

        <div className="toolkit-card">
          {!isPastDeadline() && <button title="Commit">
            <Done className="toolkit-icon" onClick={() => onCommit(habit.id)} />
          </button>}
          <button title="Delete Habit :< " onClick={() => onDelete(habit.id)}>
            <Trash className="toolkit-icon" />
          </button>
        </div>
      </div>

      <div className="right-side">
        <div className="contribution-grid">
          {/* Generate 371 squares (53 weeks × 7 days) */}
          {Array.from({ length: habit.length * 7 }).map((_, index) => {
            const currentDate = new Date(habit.createdAt);
            currentDate.setDate(habit.createdAt.getDate() + index);

            const isCompleted = checkCompletions(currentDate);

            return (
              <div
                key={index}
                className={`square ${isCompleted ? "completed" : ""}`}
                title={`${currentDate.toLocaleDateString()} ${
                  isCompleted ? "✓ Completed" : "○ Not completed"
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HabitCard;
