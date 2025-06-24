import { Router } from "express";
import db from "../db/queries.js";
const indexRouter = Router();

indexRouter.get("/", async (req, res) => {
    const result = await db.getAllProgrammers();
    // console.log(result);
    const programmers = []; 
    const baseObject = {
        programmer_id: 1,
        programmer: 'tourist',
        imageurl: "https://userpic.codeforces.org/422/title/50a270ed4a722867.jpg",
        contributionArray: [],
        maxrating: "tourist"
    };
    await Promise.all(result.map(async (element, i) => {
        const maxrating = await db.getmaxratingbyprogrammer_id(element.programmer_id);
        const contributions = await db.getcontributionbyprogrammer_id(element.programmer_id);
        programmers.push({...baseObject});
        console.log(element);
        programmers[i].programmer_id = element.programmer_id;
        programmers[i].programmer = element.programmer;
        programmers[i].imageurl = element.imageurl;
        programmers[i].maxrating = maxrating;
        programmers[i].contributionArray = contributions;
        // console.log(contributions);
    }));
    // console.log(programmers);
    // console.log(programmers[0].contributionArray);
    // console.log(programmers[0].maxrating);
    res.render("competitiveProgrammers", {title: "Competitive Programmers", programmers: programmers });
});

indexRouter.get("/new", async(req, res) => {
    const contributions = await db.getAllContributions();
    const maxRatings = await db.getAllMaxRatings();
    res.render("programmers/addProgrammer", {title : "Add Programmer", contributions: contributions, maxRatings: maxRatings});
});

indexRouter.post("/new", async(req, res) => {
    let { name, image, contribution, maxRating } = req.body;
    await db.insertProgrammer(name, image);
    const programmer_id = await db.getProgrammer_idByName(name);

    // console.log(contribution);
    
    let contributionArray = (Array.isArray(contribution) ? contribution : [contribution]);
    await Promise.all(contributionArray.map(async (contribution) => {
        const contribution_id = await db.getContribution_idByName(contribution);
        await db.insertprogrammerscontribution(programmer_id, contribution_id);
    }));

    const maxrating_id = await db.getMaxRating_idByName(maxRating);
    await db.insertprogrammersmaxrating(programmer_id, maxrating_id);

    res.redirect('/');
});

indexRouter.get("/:id/update", async(req, res) => {
    const { id } = req.params;
    const contributions = await db.getAllContributions();
    const maxRatings = await db.getAllMaxRatings();
    const { programmer, imageurl } = await db.getprogrammernameimageurlbyId(id);
    // console.log(programmer, imageurl);
    const maxrating = await db.getmaxratingbyprogrammer_id(id);
    const contributionA = await db.getcontributionbyprogrammer_id(id);
    const contributionArray = [];
    contributionA.map(c => {
        contributionArray.push(c.contribution);
    });
    // console.log(contributionArray);
    res.render("programmers/updateProgrammer", { title: 'update Programmer', contributions: contributions, maxRatings: maxRatings,
    programmer: programmer, imageurl : imageurl, maxrating: maxrating, contributionArray: contributionArray, id: id });
});

indexRouter.post("/:id/update", async(req, res) => {
    // console.log(req.params);
    const { id } = req.params;
    // console.log(req.body);
    // console.log(id);
    const { name, image, contribution, maxRating } = req.body;
    await db.updatenameimagebyId(name, image, id);
    await db.deletecontributionratingbyprogrammer_id(id);
    
    let contributionArray = (Array.isArray(contribution) ? contribution : [contribution]);
    await Promise.all(contributionArray.map(async (contribution) => {
        const contribution_id = await db.getContribution_idByName(contribution);
        await db.insertprogrammerscontribution(id, contribution_id);
    }));

    const maxrating_id = await db.getMaxRating_idByName(maxRating);
    await db.insertprogrammersmaxrating(id, maxrating_id);
    res.redirect('/');
});

indexRouter.post("/:id/delete", async(req, res) => {
    const { id } = req.params;
    await db.deleteprogrammer(id);
    res.redirect('/');
});

export default indexRouter;