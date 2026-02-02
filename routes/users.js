import express from "express";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

let users = [];

// GET all users
router.get("/", (req, res) => {
  res.send(users);
});

// CREATE user
router.post("/", (req, res) => {
  const user = req.body;
  users.push({ ...user, id: uuidv4() });
  res.send("User added successfully");
});

// GET user by ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const foundUser = users.find((u) => u.id === id);
  res.send(foundUser);
});

// DELETE user
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  users = users.filter((u) => u.id !== id);
  res.send("User deleted");
});

// UPDATE user
router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((u) => u.id === id);

  if (req.body.first_name) user.first_name = req.body.first_name;
  if (req.body.last_name) user.last_name = req.body.last_name;
  if (req.body.email) user.email = req.body.email;

  res.send("User updated");
});

export default router;
