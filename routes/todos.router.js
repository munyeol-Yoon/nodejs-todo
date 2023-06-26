const express = require("express");

const Todo = require("../models/todo");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hi");
});

// todo 생성
router.post("/todos", async (req, res) => {
  const { value } = req.body;
  const maxOrderByUserId = await Todo.findOne().sort("-order").exec();

  const order = maxOrderByUserId ? maxOrderByUserId.order + 1 : 1;

  const todo = new Todo({ value, order });
  await todo.save();

  return res.send({ todo });
});

// todo 전체 조회
router.get("/todos", async (req, res) => {
  const todos = await Todo.find().sort("-order").exec();

  res.send({ todos });
});

// todo 수정, 순서변경

router.patch("/todos/:todoId", async (req, res) => {
  const { todoId } = req.params;
  const { order } = req.body;

  const currentTodo = await Todo.findById(todoId);
  if (!currentTodo) {
    return res.status(400).json({ message: "존재하지 않는 할 일입니다." });
  }

  if (order) {
    const targetTodo = await Todo.findOne({ order }).exec();
    if (targetTodo) {
      targetTodo.order = currentTodo;
      await targetTodo.save();
    }
    currentTodo.order = order;
    await currentTodo.save();
  }
});

module.exports = router;
