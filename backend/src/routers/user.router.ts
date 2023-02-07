import { Router } from "express";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { sample_users } from "../data";
import { UserModel } from "../models/user.model";

const router = Router();

// Adds all the user objects from data to database.
router.get(
  "/seed",
  asyncHandler(async (req, res) => {
    const usersCount = await UserModel.countDocuments();
    if (usersCount > 0) {
      res.send("Seed is already done");
      return;
    }

    await UserModel.create(sample_users);
    res.send("Seed is done");
  })
);

// Logs in a user.
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (user) res.send(generateTokenResponse(user));
    else res.status(400).send("Email or password is not valid");
  })
);

// Creates a user's token.
const generateTokenResponse = (user: any) => {
  const token = jwt.sign(
    {
      email: user.email,
      isAdmin: user.isAdmin,
    },
    "SecretKey",
    {
      expiresIn: "30d",
    }
  );

  user.token = token;
  return user;
};

export default router;
