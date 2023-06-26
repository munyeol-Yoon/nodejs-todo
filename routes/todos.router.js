const express = require("express");

const Todo = require("../models/todo");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hi");
});

router.post("/todos", async (req, res) => {
  const { value } = req.body;
  const maxOrderByUserId = await Todo.findOne().sort("-order").exec();

  const order = maxOrderByUserId ? maxOrderByUserId.order + 1 : 1;

  const todo = new Todo({ value, order });
  await todo.save();

  return res.send({ todo });
});

router.get("/todos", async (req, res) => {
  const todos = await Todo.find().sort("-order").exec();

  res.send({ todos });
});

module.exports = router;
