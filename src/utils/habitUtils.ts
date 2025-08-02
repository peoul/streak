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

export const getAllHabits = async () => {
    const habits = await db.habits.toArray()

    return habits
};
