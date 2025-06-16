import pool from "./pool.js"

async function getAllProgrammers() {
    const { rows } = await pool.query("SELECT * FROM Programmers");
    return rows; 
}

export default {
    getAllProgrammers,
}