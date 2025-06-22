import { Router } from "express";
import db from "../db/queries.js";
const indexRouter = Router();

indexRouter.get("/", async (req, res) => {
    const result = await db.getAllProgrammers();
    console.log(result);
    let programmers = []; 
    let baseObject = {
        programmer_id: 1,
        programmer: 'tourist',
        imageurl: "https://userpic.codeforces.org/422/title/50a270ed4a722867.jpg",
        contributionArray: [],
        maxrating: "tourist"
    };
    await result.map(async (element, i) => {
        const maxrating = await db.getmaxratingbyprogrammer_id(element.programmer_id);
        const contributions = await db.getcontributionbyprogrammer_id(element.programmer_id);
        programmers.push({...baseObject});
        programmers[i].programmer_id = element.programmer_id;
        console.log(programmers[i].programmer, element.programmer);
        programmers[i].programmer = element.progammer;
        console.log(programmers[i].programmer, element.programmer);
        programmers[i].imageurl = element.imageurl;
        programmers[i].maxrating = maxrating;
        programmers[i].contributionArray = contributions;
        console.log(i, programmers[i]);
    });
    console.log(programmers);
    res.render("competitiveProgrammers", {title: "Competitive Programmers", programmers: programmers });
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
    // console.log(name, programmer_id);
    const contribution_id = await db.getContribution_idByName(contribution);
    const maxrating_id = await db.getMaxRating_idByName(maxRating);
    await db.insertprogrammerscontribution(programmer_id, contribution_id);
    await db.insertprogrammersmaxrating(programmer_id, maxrating_id);
    res.redirect('/');
});

indexRouter.get("/:id/update", async(req, res) => {
    const { id } = req.params;
});

indexRouter.post("/:id/update", async(req, res) => {
    const { id } = req.params;
});

indexRouter.post("/:id/delete", async(req, res) => {
    const { id } = req.params;
    await db.deleteprogrammer(id);
    res.redirect('/');
});

export default indexRouter;