import db from "../db/queries.js"

async function getProgrammers(req, res) {
    const programmers = await db.getAllProgrammers();
    console.log("Programmers: ", programmers);
    res.send("Programmers: " + programmers.map(programmer => programmer.name).join(", "));
}

export default {
    getProgrammers,
}