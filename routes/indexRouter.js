import { Router } from "express";
import db from "../db/queries.js";
const indexRouter = Router();

indexRouter.get("/", async (req, res) => {
    const programmers = await db.getAllProgrammers();
    res.render("competitiveProgrammers", {title: "Competitive Programmers", programmers: programmers, });
});

indexRouter.get("/new", async(req, res) => {
    const contributions = await db.getAllContributions();
    const maxRatings = await db.getAllMaxRatings();
    res.render("programmers/addProgrammer", {title : "Add Programmer", contributions: contributions, maxRatings: maxRatings});
});

indexRouter.post("/new", async(req, res) => {
    const { name, image, contribution, maxRating } = req.body;
    await db.insertProgrammer(name, image);
    const programmer_id = await db.getProgrammer_idByName(name);
    const contribution_id = await db.getContribution_idByName(contribution);
    const maxrating_id = await db.getMaxRating_idByName(maxRating);
    await db.insertprogrammerscontribution(programmer_id, contribution_id);
    await db.insertprogrammersmaxrating(programmer_id, maxrating_id);
    res.redirect('/');
});

indexRouter.get("/:id/update", async(req, res) => {

});

indexRouter.post("/:id/update", async(req, res) => {

});

indexRouter.get("/:id/delete", async(req, res) => {

});

indexRouter.post("/:id/delete", async(req, res) => {

});

export default indexRouter;