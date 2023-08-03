import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import User from "../Models/UserModel.js";
import { generateToken, isAuth } from "../utils.js";

const userRouter = express.Router();
userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({ _id: user._id, name: user.name, email: user.email, token: generateToken(user) });
        return;
      }
    }
    res.status(401).send({ message: "Invalid Credentials" });
  })
);

userRouter.post(
  "/signup",
  expressAsyncHandler(async (req, res) => {
    try {
      const newUser = new User({ name: req.body.name, email: req.body.email, password: bcrypt.hashSync(req.body.password) });
      const user = await newUser.save();
      res.send({ _id: user._id, name: user.name, email: user.email, token: generateToken(user) });
    } catch (error) {
      res.status(400).send({ message: "email already in database" });
    }
  })
);

/*
userRouter.post(
  "/signUp",
  expressAsyncHandler(async (req, res) => {
    try {
      const { email, password, name } = req.body;
      const newUser = new User({
        name: name,
        email: email,
        password: bcrypt.hashSync(password),
      });
      const user = await newUser.save();
      return res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user),
      });
    } catch (error) {
      res.status(400).send({ message: "email already in database" });
    }
  })
);
*/

userRouter.get("/", isAuth, async (req, res) => {
  res.status(200).send({ message: "ok" });
});

export default userRouter;
