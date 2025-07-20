// src/db.js
import Dexie from 'dexie';

export const db = new Dexie('ExpenseTrackerDB');

// Define your schema (like SQL tables)
db.version(1).stores({
  expenses: '++id, description, amount, date' // ++id = auto-incremented
});
