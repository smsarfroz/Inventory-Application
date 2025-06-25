import { Router } from "express";
import db from "../db/queries.js";
const indexRouter = Router();

indexRouter.get("/", async (req, res) => {
    try {
        const result = await db.getAllProgrammers();
        const programmers = await Promise.all(result.map(async (element, i) => {
            const [maxrating, contributions] = await Promise.all([
                db.getmaxratingbyprogrammer_id(element.programmer_id),
                db.getcontributionbyprogrammer_id(element.programmer_id)
            ]);

            return {
                programmer_id: element.programmer_id,
                programmer: element.programmer,
                imageurl: element.imageurl,
                contributionArray: contributions,
                maxrating: maxrating
            };
        }));
        res.render("competitiveProgrammers", {title: "Competitive Programmers", programmers: programmers });
    } catch(error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }    
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

indexRouter.get("/programmers/contribution/:contri", async(req, res) => {
    const { contri } = req.params;
    try {
        const result = await db.getAllProgrammers();
        const programmers = await Promise.all(result.map(async (element, i) => {
            const [maxrating, contributions] = await Promise.all([
                db.getmaxratingbyprogrammer_id(element.programmer_id),
                db.getcontributionbyprogrammer_id(element.programmer_id)
            ]);
            return {
                programmer_id: element.programmer_id,
                programmer: element.programmer,
                imageurl: element.imageurl,
                contributionArray: contributions,
                maxrating: maxrating
            };
        }));
        
        const filteredProgrammers = programmers
        .filter(programmer => programmer.contributionArray.some(obj => obj.contribution === contri));
        
        res.render("competitiveProgrammers", {title: "Competitive Programmers", programmers: filteredProgrammers });
    } catch(error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }  
});

indexRouter.get("/programmers/maxrating/:rating", async(req, res) => {
    const { rating } = req.params;
    try {
        const result = await db.getAllProgrammers();
        const programmers = await Promise.all(result.map(async (element, i) => {
            const [maxrating, contributions] = await Promise.all([
                db.getmaxratingbyprogrammer_id(element.programmer_id),
                db.getcontributionbyprogrammer_id(element.programmer_id)
            ]);
            return {
                programmer_id: element.programmer_id,
                programmer: element.programmer,
                imageurl: element.imageurl,
                contributionArray: contributions,
                maxrating: maxrating
            };
        }));
        
        const filteredProgrammers = programmers
        .filter(programmer => programmer.maxrating === rating);

        res.render("competitiveProgrammers", {title: "Competitive Programmers", programmers: filteredProgrammers });
    } catch(error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    } 
});

export default indexRouter;