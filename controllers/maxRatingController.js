import db from "../db/queries.js"
import asyncHandler from "express-async-handler";
import { body, query, validationResult } from "express-validator";

const validatenewRating = [
    body('addTitle')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ min: 2, max: 20 }).withMessage('Title must be between 2-20 characters')
    .matches(/^[A-Za-z\s\-']+$/).withMessage('Title can only contain letters, spaces, hyphens, and apostrophes'),
]

const addnewRating = [validatenewRating, asyncHandler(async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        await db.insertRating(req.body.addTitle);
        res.redirect('/maxRating');
    } catch (error) {
        console.error("Error adding programmer:", error);
        return res.status(500).json({ errors: [{ msg: "Server error occurred while adding programmer" }]});
    }
})];

export default {
    addnewRating,
}