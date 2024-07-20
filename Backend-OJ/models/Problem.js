import { model, Schema } from "mongoose";

const ProblemSchema = new Schema({
  title: {
    type: [String],
    required: true,
  },
  description: {
    type: [String],
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  testCases: {
    type: [
      {
        input: {
          type: [String],
          required: true,
        },
        output: {
          type: [String],
          required: true,
        },
      },
    ],
    required: true,
  },
});

export const Problem = model("Problem", ProblemSchema);
