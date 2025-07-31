import Dexie, { type EntityTable } from "dexie";

interface Habit {
  id: number;
  name: string;
  description:string;
  createdAt: Date;
}

interface Completion {
    id: number;
    habitId: number;
    completedDate : string;
}

const db = new Dexie('StreakDatabase') as Dexie & {
    habits: EntityTable<Habit, 'id'>,
    completions: EntityTable<Completion, 'id'>
};

db.version(1).stores({
    habits: `++id, name, description, createdAt`,
    completions: `++id, habitId, compledteDate`
})

export type {Habit, Completion}
export { db }

