import { type Habit, type Completion } from '../db'

interface HabitCardProps {
  habit: Habit;
  completions: Completion[];  // filtered for this habit
  onCommit: (habitId: number) => void;
}

export type {HabitCardProps}