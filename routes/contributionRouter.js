import { Router } from "express";
import db from "../db/queries.js";
const contributionRouter = Router();

contributionRouter.get("/", async (req, res) => {
    const contributions = await db.getAllContributions();
    res.render("contribution", {title: "Contribution", contributions: contributions});
});

contributionRouter.get("/new", async (req, res) => {
    res.render("addContribution", { title: "addContribution"});
});

contributionRouter.post("/new", async (req, res) => {
    await db.insertContribution(req.body.addContribution);
    res.redirect("/contribution");
});

export default contributionRouter;