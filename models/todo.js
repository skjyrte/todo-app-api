import mongoose from "mongoose";

const toDoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
});

export default mongoose.model("ToDo", toDoSchema);
