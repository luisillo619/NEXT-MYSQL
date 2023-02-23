import { createPool } from "mysql2/promise";

// const pool = createPool({
//   host: 'localhost',
//   user: 'root',
//   password: 'ninja619',
//   database: 'productsdb',
//   port: 3306,
// //   socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",
// });

const dbConfig = {
  host: "us-east.connect.psdb.cloud",
  user: "uoe687roo9hekhjwut8h",
  password: "pscale_pw_5UdPmJyLZ37y4bFf33aALJxFK0iK30vvP66rvouEQ5P",
  database: "productsdb",
  ssl: {
    rejectUnauthorized: false,
  },
};

const pool = createPool(dbConfig);

async function connectToDatabase() {
  try {
    const connection = await pool.getConnection();
    console.log("Connected successfully to the database");
    connection.release();
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
}

connectToDatabase();
export { pool };
