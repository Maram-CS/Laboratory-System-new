import mysql from "mysql2/promise";
import { config } from "dotenv";

config();

const configDB = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 3306,
});

const verifyConnection = async () => {
  try {
    const connection = await configDB.getConnection();
    console.log("✅ MySQL connected successfully");
    connection.release();
  } catch (error) {
    console.error("❌ MySQL connection failed:");
    console.error(error.message);
  }
};

verifyConnection();

export default configDB;
