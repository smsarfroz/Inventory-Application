import { Router } from "express";
import db from "../db/queries.js";
const contributionRouter = Router();

contributionRouter.get("/", async (req, res) => {
    const contributions = await db.getAllContributions();
    res.render("contribution", {title: "Contribution", contributions: contributions});
});

export default contributionRouter;