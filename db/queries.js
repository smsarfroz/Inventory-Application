import pool from "./pool.js"

async function getProgrammer_idByName(name) {
    const query = {
        text : 'SELECT programmer_id FROM Programmers WHERE programmer = $1',
        values : [name]
    }
    const { rows } = await pool.query(query);
    return rows[0].programmer_id;
}

async function getContribution_idByName(name) {
    const query = {
        text : 'SELECT contribution_id FROM contribution WHERE contribution = $1',
        values : [name]
    }
    const { rows } = await pool.query(query);
    return rows[0].contribution_id;
}

async function getMaxRating_idByName(name) {
    const query = {
        text : 'SELECT maxrating_id FROM maxrating WHERE maxrating = $1',
        values : [name]
    }
    const { rows } = await pool.query(query);
    return rows[0].maxrating_id;
}

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

async function insertProgrammer(name, url) {
    const insertQuery = {
        text : "INSERT INTO programmers (programmer, imageurl) VALUES ($1, $2)",
        values : [name, url] 
    }
    await pool.query(insertQuery);
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
        text : 'DELETE FROM MaxRating WHERE maxRating_id = $1',
        values : [id]
    }
    return await pool.query(query);
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
        text : 'DELETE FROM Contribution WHERE contribution_id = $1',
        values : [id]
    }
    await pool.query(query);
}

async function getcontributionbyprogrammer_id(id) {
    const query = {
        text : `SELECT Contribution.contribution
                FROM Contribution
                INNER JOIN ProgrammersContribution
                ON Contribution.contribution_id = ProgrammersContribution.contribution_id
                AND ProgrammersContribution.programmer_id = $1`,
        values : [id]
    }
    const { rows } = await pool.query(query);
    return rows;
}

async function insertprogrammerscontribution(id1, id2) {
    const query = {
        text : `INSERT INTO programmerscontribution 
                VALUES
                ($1, $2)`,
        values : [id1, id2]
    }
    await pool.query(query);
}

async function insertprogrammersmaxrating(id1, id2) {
    const query = {
        text : `INSERT INTO programmersmaxrating
                VALUES
                ($1, $2)`,
        values : [id1, id2]
    }
    await pool.query(query);
}

export default {
    getAllProgrammers,
    getAllContributions,
    getAllMaxRatings,
    insertRating,
    insertProgrammer,
    insertContribution,
    updateRating,
    getRatingAtid,
    deleteRatingAtid,
    updateContribution,
    getContributionAtid,
    deleteContributionAtid,
    getcontributionbyprogrammer_id,
    getProgrammer_idByName,
    getContribution_idByName,
    getMaxRating_idByName,
    insertprogrammerscontribution,
    insertprogrammersmaxrating
}