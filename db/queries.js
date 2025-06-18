import pool from "./pool.js"

async function getAllProgrammers() {
    const { rows } = await pool.query("SELECT * FROM Programmers ORDER BY programmer_id");
    return rows; 
}

async function getAllContributions() {
    const { rows } = await pool.query("SELECT * FROM Contribution ORDER BY contribution_id");
    return rows;
}

async function getAllMaxRatings() {
    const { rows } = await pool.query("SELECT * FROM MaxRating ORDER BY maxRating_id");
    return rows;
}

async function insertRating(rating) {
    const insertQuery = {
        text: "INSERT INTO MaxRating (maxRating) VALUES ($1)",
        values: [rating]
    };
    await pool.query(insertQuery);
}

async function insertContribution(contribution) {
    const insertQuery = {
        text : 'INSERT INTO Contribution (contribution) VALUES ($1)',
        values: [contribution]
    }
    await pool.query(insertQuery);
}

async function updateRating(id, newValue) {
    const updateQuery = {
        text : 'UPDATE MaxRating SET maxRating = $1 WHERE maxRating_id = $2',
        values: [newValue, id]
    };
    await pool.query(updateQuery);
}

async function getRatingAtid(id) {
    const query = {
        text : 'SELECT maxRating FROM MaxRating WHERE maxRating_id = $1',
        values : [id]
    }
    const { rows } = await pool.query(query);
    return rows[0].maxrating;
}

async function deleteRatingAtid(id) {
    const query = {
        text : 'DELETE maxRating FROM MaxRating WHERE maxRating_id = $1',
        values : [id]
    }
    await pool.query(query);
}

async function updateContribution(id, newValue) {
    const updateQuery = {
        text : 'UPDATE Contribution SET contribution = $1 WHERE contribution_id = $2',
        values: [newValue, id]
    };
    await pool.query(updateQuery);
}

async function getContributionAtid(id) {
    const query = {
        text : 'SELECT contribution FROM Contribution WHERE contribution_id = $1',
        values : [id]
    }
    const { rows } = await pool.query(query);
    return rows[0].contribution;
}

async function deleteContributionAtid(id) {
    const query = {
        text : 'DELETE contribution FROM Contribution WHERE contribution_id = $1',
        values : [id]
    }
    await pool.query(query);
}
export default {
    getAllProgrammers,
    getAllContributions,
    getAllMaxRatings,
    insertRating,
    insertContribution,
    updateRating,
    getRatingAtid,
    deleteRatingAtid,
    updateContribution,
    getContributionAtid,
    deleteContributionAtid
}