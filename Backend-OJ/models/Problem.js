import { model, Schema } from "mongoose";

const ProblemSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  testCases: {
    type: [Schema.Types.ObjectId],
    ref: "TestCase",
    required: true,
  },
});

export const Problem = model("Problem", ProblemSchema);
