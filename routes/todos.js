import express from "express";
const router = express.Router();
import ToDo from "../models/todo.js";

function createResponse(success, message, data) {
  if (data === undefined) {
    return { success: success, message: message };
  } else {
    return { success: success, message: message, data: data };
  }
}

//view route
router.get("/", async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = 2;

  const filter = ((query) => {
    if (query === "Active") return { completed: false };
    if (query === "Completed") return { completed: true };
    else return {};
  })(String(req.query.filter));

  const queryIndex = (page - 1) * limit;
  const currentData = {};

  try {
    currentData.documentCount = await ToDo.find(filter).count();
    currentData.activeDocumentsCount = await ToDo.find({
      completed: true,
    }).count();
    currentData.currentData = await ToDo.find(filter)
      .limit(limit)
      .skip(queryIndex)
      .exec();
    res
      .status(200)
      .send(createResponse(true, "GET Request Called", currentData));
  } catch {
    res.status(500).send(createResponse(false, "Internal Server Fetch Error"));
  }
});

//create route
router.post("/", async (req, res) => {
  const toDo = new ToDo({
    task: req.body.task,
    completed: false,
  });
  const currentData = {};
  try {
    currentData.getCreatedTodo = await toDo.save();
    currentData.activeDocumentsCount = await ToDo.find({
      completed: true,
    }).count();
    res
      .status(200)
      .send(createResponse(true, "POST Request Called", currentData));
  } catch {
    res.status(500).send(createResponse(false, "Internal Server Create Error"));
  }
});

//modify route
router.patch("/:id", async (req, res) => {
  const editedTodo = req.body.task;
  const editedCompleted = req.body.completed;
  /*   console.log(editedTodo);
  console.log(editedCompleted); */

  let toDo;
  const currentData = {};
  try {
    toDo = await ToDo.findById(req.params.id);

    if (editedTodo !== undefined && editedCompleted === undefined) {
      toDo.task = req.body.task;
    } else if (editedTodo === undefined && editedCompleted !== undefined) {
      toDo.completed = req.body.completed;
    } else {
      throw new Error("PATCH: error with input data");
    }
    currentData.getModifiedTodo = await toDo.save();
    currentData.activeDocumentsCount = await ToDo.find({
      completed: true,
    }).count();

    res
      .status(200)
      .send(createResponse(true, "PATCH Request Called", currentData));
  } catch (e) {
    /*     console.log(e); */
    if (toDo == null) {
      res
        .status(404)
        .send(createResponse(false, "ToDo Does Not Exist In Database"));
    } else {
      res
        .status(500)
        .send(createResponse(false, "Internal Server Update Error"));
    }
  }
});

//delete completed route
router.delete("/", async (req, res) => {
  const currentData = {};
  try {
    await ToDo.deleteMany({ completed: true });

    currentData.activeDocumentsCount = await ToDo.find({
      completed: true,
    }).count();

    if (currentData.activeDocumentsCount !== 0) {
      throw new Error("Could not delete all todos.");
    }
    res
      .status(200)
      .send(createResponse(true, "DELETE Request Called", currentData));
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .send(
        createResponse(false, e ? e.message : "Internal Server Deleting Error")
      );
  }
});

//delete route
router.delete("/:id", async (req, res) => {
  let toDo;
  const currentData = {};
  try {
    toDo = await ToDo.findById(req.params.id);
    await toDo.deleteOne();
    currentData.activeDocumentsCount = await ToDo.find({
      completed: true,
    }).count();

    res
      .status(200)
      .send(createResponse(true, "DELETE Request Called", currentData));
  } catch {
    if (toDo == null) {
      res
        .status(404)
        .send(createResponse(false, "ToDo Does Not Exist In Database"));
    } else {
      res
        .status(500)
        .send(createResponse(false, "Internal Server Deleting Error"));
    }
  }
});

export default router;
