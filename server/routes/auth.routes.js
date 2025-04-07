import { Router } from "express";

import { getMeController, logoutController, registerController, loginController } from "../controllers/auth.controllers.js";
import { validationRegister, validationLogin, validationErrors } from "../middleware/validation.js";

const router = Router();

// /api/auth/register
router.post("/register", validationRegister, validationErrors, registerController);

// /api/auth/login
router.post("/login", validationLogin, validationErrors, loginController);

// /api/auth/logout
router.post("/logout", logoutController);

// /api/auth/me
router.get("/me", getMeController);

export default router;