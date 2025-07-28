const express = require("express");
const prisma = require("../prismaClient");

const router = express.Router();

// Get all todos for a user
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  const todos = await prisma.todo.findMany({
    where: { userId: parseInt(userId) },
    orderBy: { createdAt: "desc" },
  });
  res.json(todos);
});

// Create new todo
router.post("/", async (req, res) => {
  const { title, userId } = req.body;
  const todo = await prisma.todo.create({
    data: { title, userId: parseInt(userId) },
  });
  res.status(201).json(todo);
});

// Update todo
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  const updated = await prisma.todo.update({
    where: { id: parseInt(id) },
    data: { title, completed },
  });

  res.json(updated);
});

// Delete todo
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.todo.delete({
    where: { id: parseInt(id) },
  });
  res.status(204).send();
});

module.exports = router;
