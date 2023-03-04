const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { connection, UserModel } = require("./model/db");
const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/", async (req, res) => {
  try {
    res.status(200).send("welcome to drag and drop app");
  } catch (err) {
    res.status(404).send({ msg: "404 error" });
  }
});

app.post("/signup", async (req, res) => {
  const { Email, Password } = req.body;

  try {
    bcrypt.hash(Password, 5, async (err, newhashedpass) => {
      if (err) {
        res.status(404).send({ msg: "404 error failed to sign up" });
      } else {
        const user = new UserModel({ Email, Password: newhashedpass });
        await user.save();
        res.status(200).send({ msg: "signedup" });
      }
    });
  } catch (err) {
    res.status(404).send({ msg: "404 error failed to sign up" });
  }
});

app.post("/signin", async (req, res) => {
  const { Email, Password } = req.body;
  try {
    const user = await UserModel.find({ Email });

    const hasedpass = user[0].Password;
    if (user.length > 0) {
      bcrypt.compare(Password, hasedpass, (err, result) => {
        if (result) {
          const token = jwt.sign({ course: "be" }, process.env.key);
          res
            .status(200)
            .send({ msg: "logged in", email: user[0].Email, token: token });
        } else {
          res.status(404).send({ msg: "wrong credentials" });
        }
      });
    } else {
      res.status(404).send({ msg: "new user" });
    }
  } catch (err) {
    res.status(404).send({ msg: "404 error failed to sign up" });
  }
});

app.listen(4500, async (req, res) => {
  try {
    await connection;
    console.log("connected to dbm");
  } catch (err) {
    console.log(err);
  }
  console.log("runing at 4500");
});
