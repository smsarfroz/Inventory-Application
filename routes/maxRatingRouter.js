import { Router } from "express";
import db from "../db/queries.js";
const maxRatingRouter = Router();

maxRatingRouter.get("/", async(req, res) => {
    const maxRatings = await db.getAllMaxRatings();
    res.render("maxRating", {title: "maxRating", maxRatings: maxRatings});
});

maxRatingRouter.get("/new", async(req, res) => {
    res.render("addRating", {title: "addRating"});
});

maxRatingRouter.post("/new", async(req, res) => {
    await db.insertRating(req.body.addTitle);
    res.redirect('/maxRating');
});

maxRatingRouter.get("/:id/update", async(req, res) => {
    const { id } = req.params;
    const ratingAtId = await db.getRatingAtid(id) || 'empty';
    res.render("updateRating", {title: "update Rating", ratingAtId: ratingAtId, id: id});
});

maxRatingRouter.post("/:id/update", async(req, res) => {
    const { id } = req.params;
    const newValue = req.body.updateTitle;
    const { password } = req.body;

    if (password === process.env.password) {
        await db.deleteprogrammermaxratingbymaxratingId(id);
        await db.updateRating(id, newValue);
        res.redirect("/MaxRating");
    } else {
        res.redirect("/MaxRating");
    }
});

maxRatingRouter.post("/:id/delete", async(req, res) => {
    const { id } = req.params;
    const { password } = req.body;

    if (!password || password !== process.env.password) {
        return res.status(403).send("Invalid Password");
    } 
    try {
        await db.deleteprogrammermaxratingbymaxratingId(id);
        await db.deleteRatingAtid(id);
        res.redirect("/maxRating");
    } catch (err) {
        throw err;
    }
});

export default maxRatingRouter;