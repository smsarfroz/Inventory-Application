import db from "../db/queries.js"
import asyncHandler from "express-async-handler";
import { body, query, validationResult } from "express-validator";

const validatenewContribution = [
    body('addContribution')
    .trim()
    .notEmpty().withMessage('Contribution is required')
    .matches(/^-?\d+[+-]$/).withMessage('Must be in format x+ or x- (e.g., 100+ or -50-)')
    .custom(value => {
      const num = parseInt(value.slice(0, -1)); 
      const suffix = value.slice(-1); 
      
      if (suffix === '+') {
        if (num < -300 || num > 300) {
          throw new Error('For x+, x must be between -300 and 300');
        }
      } else if (suffix === '-') {
        if (num < -300 || num > 300) {
          throw new Error('For x-, x must be between -300 and 300');
        }
      }
      return true;
    })
]

const addnewContribution = [validatenewContribution, asyncHandler(async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        await db.insertContribution(req.body.addContribution);
        res.redirect("/contribution");
    } catch (error) {
        console.error("Error adding programmer:", error);
        return res.status(500).json({ errors: [{ msg: "Server error occurred while adding programmer" }]});
    }
})];

export default {
    addnewContribution,
}