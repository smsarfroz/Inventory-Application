import db from "../db/queries.js"
import asyncHandler from "express-async-handler";
import { body, query, validationResult } from "express-validator";

function endsWith(mainString, searchString) {
  if (searchString.length > mainString.length) {
    return false; 
  }
  const startIndex = mainString.length - searchString.length;

  for (let i = startIndex; i < mainString.length; ++i) {
    if (mainString[i] !== searchString[i]) {
      return false;
    }
  }
  return true;
}

const validatenewProgrammer = [
    body('name')
        .trim()
        .isLength({ min: 2, max: 30 })
        .withMessage('Name must be between 2-30 characters')
        .matches(/^[A-Za-z0-9\s]+$/)  
        .withMessage('Name can only contain letters, numbers, and spaces'),
    body('image')
      .isURL()
      .withMessage('Invalid URL format')
      .custom(value => {
        if (!value.startsWith('https://')) {
          throw new Error('URL must use HTTPS');
        }
        const allowedDomains = ['userpic.codeforces.org'];
        const domain = new URL(value).hostname;
        if (!allowedDomains.some(d => endsWith(domain, d))) {
          throw new Error('Image must come from trusted domain');
        }
        return true;
      }),
    
    body('contribution')
      .isObject().withMessage('Contribution must be an object')
      .custom(async (contributionObj, { req }) => {
        if (!contributionObj || typeof contributionObj !== 'object' || Array.isArray(contributionObj)) {
          throw new Error('Contribution must be a non-array object');
        }

        const contributions = Object.values(contributionObj);
        if (contributions.length === 0) {
          throw new Error('Select at least one contribution');
        }

        const allContributions = await db.getAllContributions(); 
        
        const positiveContribs = contributions.filter(c => c.endsWith('+'));
        const negativeContribs = contributions.filter(c => c.endsWith('-'));
        
        if (positiveContribs.length > 0 && negativeContribs.length > 0) {
          throw new Error('Cannot mix positive and negative contributions');
        }
        
        if (positiveContribs.length > 0) {
          const selectedLevels = positiveContribs.map(c => parseInt(c));
          const minSelected = Math.min(...selectedLevels);
          
          const missing = allContributions
            .filter(c => c.endsWith('+'))
            .filter(c => {
              const level = parseInt(c);
              return level <= minSelected && !contributions.includes(c);
            });
            
          if (missing.length > 0) {
            throw new Error(`Must also include: ${missing.join(', ')}`);
          }
        }
        
        if (negativeContribs.length > 0) {
          const selectedLevels = negativeContribs.map(c => parseInt(c));
          const maxSelected = Math.max(...selectedLevels);
          
          const missing = allContributions
            .filter(c => c.endsWith('-'))
            .filter(c => {
              const level = parseInt(c);
              return level >= maxSelected && !contributions.includes(c);
            });
            
          if (missing.length > 0) {
            throw new Error(`Must also include: ${missing.join(', ')}`);
          }
        }
        
        return true;
      }),
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