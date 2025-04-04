// const express = require("express");
// const router = express.Router();

// const Todo = require("../models/todo");

// // GET all todos
// router.get("/", async (req, res) => {
//   const todos = await Todo.find({ is_complete: false });
//   res.send(todos);
// });

// // GET todo based on ID
// router.get("/:id", async (req, res) => {
//   const todo = await Todo.findOne({ _id: req.params.id });
//   res.send(todo);
// });

// // POST create new todo
// router.post("/", async (req, res) => {
//   console.log(req.body);
//   const todo = new Todo({
//     title: req.body.title,
//     description: req.body.description,
//     is_complete: req.body.is_complete || false,
//     due_date: req.body.due_date || new Date(),
//   });
//   await todo.save();
//   res.send(todo);
// });

// // UPDATE todo
// router.patch("/:id", async (req, res) => {
//   try {
//     const todo = await Todo.findOne({ _id: req.params.id });

//     if (req.body.title) {
//       todo.title = req.body.title;
//     }
//     if (req.body.description) {
//       todo.description = req.body.description;
//     }
//     if (req.body.is_complete) {
//       todo.is_complete = req.body.is_complete;
//     }
//     if (req.body.due_date) {
//       todo.due_date = req.body.due_date;
//     }
//     await todo.save();
//     res.send(todo);
//   } catch {
//     res.status(404);
//     res.send({ error: "Todo does not exist!" });
//   }
// });

// // DELETE todo
// router.delete("/:id", async (req, res) => {
//   try {
//     await Todo.deleteOne({ _id: req.params.id });
//     res.status(204).send();
//   } catch {
//     res.status(404);
//     res.send({ error: "Todo does not exist!" });
//   }
// });

// module.exports = router;
const express = require("express");
const router = express.Router();

const Todo = require("../models/todo");

// GET all todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find({ is_complete: false });
    res.status(200).json(todos);
  } catch (err) {
    console.error("Error fetching todos:", err);
    res.status(500).json({ error: "Failed to fetch todos" });
  }
});

// GET todo based on ID
router.get("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.status(200).json(todo);
  } catch (err) {
    console.error("Error fetching todo:", err);
    res.status(500).json({ error: "Failed to fetch todo" });
  }
});

// POST create new todo
router.post("/", async (req, res) => {
  try {
    const todo = new Todo({
      title: req.body.title,
      description: req.body.description,
      is_complete: req.body.is_complete || false,
      due_date: req.body.due_date || new Date(),
    });
    const savedTodo = await todo.save();
    res.status(201).json(savedTodo);
  } catch (err) {
    console.error("Error creating todo:", err);
    res.status(400).json({ error: "Failed to create todo" });
  }
});

// UPDATE todo
router.patch("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    if (req.body.title) {
      todo.title = req.body.title;
    }
    if (req.body.description) {
      todo.description = req.body.description;
    }
    if (req.body.is_complete !== undefined) {
      todo.is_complete = req.body.is_complete;
    }
    if (req.body.due_date) {
      todo.due_date = req.body.due_date;
    }
    const updatedTodo = await todo.save();
    res.status(200).json(updatedTodo);
  } catch (err) {
    console.error("Error updating todo:", err);
    res.status(500).json({ error: "Failed to update todo" });
  }
});

// DELETE todo
router.delete("/:id", async (req, res) => {
  try {
    const result = await Todo.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.status(204).send();
  } catch (err) {
    console.error("Error deleting todo:", err);
    res.status(500).json({ error: "Failed to delete todo" });
  }
});

module.exports = router;
