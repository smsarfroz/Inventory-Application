import pool from "./pool.js"

async function getAllProgrammers() {
    const { rows } = await pool.query("SELECT * FROM Programmers");
    return rows; 
}

async function getAllContributions() {
    const { rows } = await pool.query("SELECT * FROM Contribution");
    return rows;
}

async function getAllMaxRatings() {
    const { rows } = await pool.query("SELECT * FROM MaxRating");
    return rows;
}

export default {
    getAllProgrammers,
    getAllContributions,
    getAllMaxRatings
}