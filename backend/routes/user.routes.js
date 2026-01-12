import express from "express";
import {handleSignUp} from "../controllers/user.controller.js";
import {handleSignIn} from "../controllers/user.controller.js";
import {authenticate} from "../middlewares/auth.middleware.js";

const router = express.Router();


router.post("/signup", handleSignUp);

router.post("/login", handleSignIn);


router.get("/profile", authenticate, (req, res) => {
    res.json({
        message: "Profile accessed",
        user: req.user
    });
});

export default router;