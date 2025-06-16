import { Router } from "express";
import db from "../db/queries.js";
const maxRatingRouter = Router();

maxRatingRouter.get("/", async (req, res) => {
    const maxRatings = await db.getAllMaxRatings();
    console.log('elo');
    console.log(maxRatings);
    res.render("maxRating", {title: "maxRating", maxRatings: maxRatings});
});

export default maxRatingRouter;