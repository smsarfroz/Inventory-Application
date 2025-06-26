import db from "../db/queries.js"
import asyncHandler from "express-async-handler";
import { body, query, validationResult } from "express-validator";

const validatenewProgrammer = [
    body('name')
      .trim()
      .isLength({ min: 2, max: 10 })
      .withMessage('Name must be between 2-10 characters')
      .matches(/^[A-Za-z\s]+$/)
      .withMessage('Name can only contain letters and spaces'),
    
    body('image')
      .isURL()
      .withMessage('Invalid URL format')
      .custom(value => {
        if (!value.startsWith('https://')) {
          throw new Error('URL must use HTTPS');
        }
        const allowedDomains = ['codeforces.org'];
        const domain = new URL(value).hostname;
        if (!allowedDomains.some(d => domain.endsWith(d))) {
          throw new Error('Image must come from trusted domain');
        }
        return true;
      }),
    
    body('contribution')
      .isArray({ min: 1 })
      .withMessage('Select at least one contribution'),
    
    body('maxRating')
      .notEmpty()
      .withMessage('Title is required')
]

const addnewProgrammer = [validatenewProgrammer, asyncHandler(async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let { name, image, contribution, maxRating } = req.body;
    try {
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
    } catch (error) {
        console.error("Error adding programmer:", error);
        return res.status(500).json({ errors: [{ msg: "Server error occurred while adding programmer" }]});
    }
})];

export default {
    addnewProgrammer,
}