import sqlite3 from "sqlite3";
import { open } from "sqlite";
sqlite3.verbose();
const db = await open({
  driver: sqlite3.Database,
  filename: "./animals.db"
});
db.on("trace", (data: any) => console.error(data));
await db.exec(
  `CREATE TABLE IF NOT EXISTS animals(
    id INTEGER PRIMARY KEY,
    name NVARCHAR(60)
  )`);

export default db;
