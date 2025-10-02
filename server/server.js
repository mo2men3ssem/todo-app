const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const Todo = require("./models/Todo");

const PORT = 3000;
const DBURL = "mongodb://127.0.0.1:27017/todo";

app.use(express.json());
app.use(cors());

// Connct with db
const connectDB = async () => {
  try {
    await mongoose.connect(DBURL);
    console.log("Success connect with db");
  } catch (error) {
    console.error("Failed connect with db:", error);
  }
};
connectDB();

// Get Todos
app.get("/", (req, res) => {
  res.redirect("/todos");
});

app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();

    if (!todos) {
      return res.status(404).json({ message: "Todos not found" });
    }

    res.json(todos);
  } catch (error) {
    console.log("Error while get todos:", error);
    res.status(500).json({ message: "Error fetching todos", error });
  }
});

// Get Todo
app.get("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json(todo);
  } catch (error) {
    console.error("Error while get todo:", error);
    res.status(500).json({ message: "Error fetching todo", error });
  }
});

// Create Todo
app.post("/todos", async (req, res) => {
  const payload = {
    title: req.body.title,
    description: req.body.description,
    completed: req.body.completed,
  };
  try {
    const newTodo = await Todo.create(payload);
    newTodo.save();
    res.json({ message: "Success added todo", newTodo });
  } catch (error) {
    console.log("Error while added todo:", error);
    res.status(500).json({ message: "Error added todo", error });
  }
});

// Update Todo
app.put("/todos/:id", async (req, res) => {
  const payload = {
    title: req.body.title,
    description: req.body.description,
    completed: req.body.completed,
  };
  try {
    const id = req.params.id;
    const updatedTodo = await Todo.findByIdAndUpdate(id, payload);
    updatedTodo.save();
    res.json({ message: "Success updated todo", updatedTodo });
  } catch (error) {
    console.log("Error while updated todo:", error);
    res.status(500).json({ message: "Error updated todo", error });
  }
});

// Delete Todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedTodo = await Todo.findByIdAndDelete(id);
    res.json({ message: "Success deleted todo", id });
  } catch (error) {
    console.log("Error while deleted todo:", error);
    res.status(500).json({ message: "Error deleted todo", error });
  }
});

app.listen(PORT, (_) => {
  console.log(`Listening in port http://localhost:${PORT}`);
});
