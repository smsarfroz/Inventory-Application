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


contributionRouter.get("/:id/update", async(req, res) => {
    const { id } = req.params;
    const contributionAtId = await db.getContributionAtid(id) || 'empty';
    res.render("contribution/updateContribution", {title: "update contribution", contributionAtId: contributionAtId, id: id});
});

contributionRouter.post("/:id/update", async(req, res) => {
    const { id } = req.params;
    const newValue = req.body.updateContribution;
    const { password } = req.body;

    if (password === process.env.password) {
        await db.deleteprogrammercontributionbycontributionId(id);
        await db.updateContribution(id, newValue);
        res.redirect("/contribution");
    } else {
        res.redirect("/contribution");
    }
});

contributionRouter.post("/:id/delete", async(req, res) => {
    const { id } = req.params;
    const { password } = req.body;

    if (!password || password !== process.env.password) {
        return res.status(403).send("Invalid Password");
    } 
    try {
        await db.deleteprogrammercontributionbycontributionId(id);
        await db.deleteContributionAtid(id);
        res.redirect("/contribution");
    } catch (err) {
        throw err;
    }
});

export default contributionRouter;