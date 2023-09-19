import express from "express";
const router = express.Router();
import ToDo from "../models/todo.js";

//view route
router.get("/", async (req, res) => {
  try {
    const toDos = await ToDo.find({});
    res.send({ toDos: toDos });
    console.log("data sent successfully");
  } catch {
    console.error("error during display data");
  }
});

//create route
router.post("/", async (req, res) => {
  console.log(req.body);
  const toDo = new ToDo({
    task: req.body.task,
    completed: req.body.completed,
  });
  try {
    await toDo.save();
    console.log("created successfully");
  } catch {
    console.error("error saving ");
  }
});

//view route
router.put("/:id", async (req, res) => {
  let toDo;
  try {
    toDo = await ToDo.findById(req.params.id);
    toDo.task = req.body.task;
    await toDo.save();
    console.log("updated successfully");
  } catch {
    if (toDo == null) {
      console.error("todo does not exist");
    } else {
      console.error("error updating todo");
    }
  }
});

//delete route
router.delete("/:id", async (req, res) => {
  let toDo;
  try {
    toDo = await ToDo.findById(req.params.id);
    await toDo.deleteOne();
    console.log("deleted successfully");
  } catch {
    if (toDo == null) {
      console.error("todo does not exist");
    } else {
      console.error("error deleting todo");
    }
  }
});

export default router;
