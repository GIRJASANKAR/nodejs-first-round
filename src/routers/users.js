const express = require("express");
const User = require("../models/user");
const router = new express.Router();

router.post("/users", async (req, res) => {
  const newuser = new User(req.body);
  try {
    await newuser.save();
    res.status(201).send(newuser);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/users", async (req, res) => {
  try {
    const userlist = await User.find({});
    res.status(201).send(userlist);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    const _id = req.params.id;

    const thatuser = await User.findById(_id);
    if (!thatuser) {
      return res.status(404).send(thatuser);
    }
    return res.status(201).send(thatuser);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch("/users/:id", async (req, res) => {
  const trytoupdate = Object.keys(req.body);

  const canOnlyUpdate = ["name", "username"];

  const isValied = trytoupdate.every((updates) => {
    return canOnlyUpdate.includes(updates);
  });
  if (!isValied) {
    return res.status(400).send({ error: "You can't update Password" });
  }

  try {
    const updateduser = await User.findById(req.params.id);

    canOnlyUpdate.forEach((updates) => {
      updateduser[updates] = req.body[updates];
    });

    await updateduser.save();

    if (!updateduser) {
      return res.status(400).send(updateduser);
    }
    return res.status(201).send(updateduser);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(400).send({ error: "there is nothing to delete" });
    }
    res.status(200).send(deletedUser);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
