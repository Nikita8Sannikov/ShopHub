import { check, validationResult } from "express-validator";

export const validationRegister = [
    check("email", "Invalid email").isEmail(),
    check("password", "Password must be at least 6 characters").isLength({
        min: 6,
    }),
];

export const validationLogin = [
    // check("email", "Correct email required").normalizeEmail().isEmail(),
    check("email", "Correct email required").isEmail(),
    check("password", "Password required").exists(),
];

export const validationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array(),
            message: "Invalid login data",
        });
        return;
    }
    next();
}