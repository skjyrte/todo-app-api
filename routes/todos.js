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
  try {
    const toDos = await ToDo.find({});
    res.status(200).send(createResponse(true, "GET Request Called", toDos));
    console.log("data sent successfully");
  } catch {
    //console.error("error during display data");
    res.status(500).send(createResponse(false, "Internal Server Fetch Error"));
  }
});

//create route
router.post("/", async (req, res) => {
  const toDo = new ToDo({
    task: req.body.task,
    completed: false,
  });
  console.log(req.body);
  try {
    await toDo.save();
    //console.log("created successfully");
    res.status(200).send(createResponse(true, "POST Request Called"));
  } catch {
    //console.error("error saving");
    res.status(500).send(createResponse(false, "Internal Server Create Error"));
  }
});

//view route
router.put("/:id", async (req, res) => {
  let toDo;

  try {
    toDo = await ToDo.findById(req.params.id);
    toDo.task = req.body.task;
    await toDo.save();
    //console.log("updated successfully");
    res.status(200).send(createResponse(true, "PUT Request Called"));
  } catch {
    if (toDo == null) {
      //console.error("todo does not exist");
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

//delete route
router.delete("/:id", async (req, res) => {
  let toDo;
  try {
    //throw new Error("ABCD");
    toDo = await ToDo.findById(req.params.id);
    await toDo.deleteOne();
    //console.log("success: DELETE Request Called");
    res.status(200).send(createResponse(true, "DELETE Request Called"));
    console.log(createResponse(true, "DELETE Request Called"));
  } catch {
    if (toDo == null) {
      //console.error("error: Todo Does Not Exist");
      res
        .status(404)
        .send(createResponse(false, "ToDo Does Not Exist In Database"));
    } else {
      //console.error("error: Error Deleting ToDo");
      res
        .status(500)
        .send(createResponse(false, "Internal Server Deleting Error"));
    }
  }
});

export default router;
