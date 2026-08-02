import mysql from "mysql2/promise";
import { config } from "dotenv";

config();

const config_DB = mysql.createPool({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME,
    port : process.env.DB_PORT
});

try {
    const connection = await config_DB.getConnection();

    console.log("✅ MySQL connected successfully");
    connection.release(); //adi trj3lna connection ll pool
}catch (err) {
    console.error("❌ MySQL connection failed:");
    console.error(err.message);
}
export default config_DB;
