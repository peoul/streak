import { db } from "../db";

export const saveHabit = async (
  name: string,
  description: string,
  length: number
) => {
  const habitId = await db.habits.add({
    name,
    description,
    length: length,
    createdAt: new Date(),
  });

  return habitId;
};

export const deleteHabit = async (habitId: number) => {
  const HabitID = await db.habits.delete(habitId);

  return HabitID;
};

export const addCompletions = async (habitId: number, date: Date) => {
  const existingCompletion = await db.completions
    .where("habitId")
    .equals(habitId)
    .and((completion) => {
      const completionDate = new Date(completion.completedDate);
      return completionDate.toDateString() === date.toDateString();
    })
    .first();

  if (existingCompletion) {
    console.log("Completion already exists for this date");
    return null;
  }

  const CompletionID = await db.completions.add({
    habitId: habitId,
    completedDate: new Date(),
  });

  return CompletionID;
};

export const deleteAllCompletions = async (habitID: number) => {
  await db.completions.where("habitId").equals(habitID).delete();
};

export const getAllHabits = async () => {
  const habits = await db.habits.toArray();

  return habits;
};

export const getAllCompletetions = async () => {
  const completions = await db.completions.toArray();

  return completions;
};
