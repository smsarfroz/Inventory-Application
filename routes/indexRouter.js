import { Router } from "express";
import db from "../db/queries.js";
const indexRouter = Router();

indexRouter.get("/", async (req, res) => {
    const programmers = await db.getAllProgrammers();
    res.render("competitiveProgrammers", {title: "Competitive Programmers", programmers: programmers});
});

export default indexRouter;