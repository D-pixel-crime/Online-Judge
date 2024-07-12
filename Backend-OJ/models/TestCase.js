import { model, Schema } from "mongoose";

const TestCaseSchema = new Schema({
  input: {
    type: String,
    required: true,
  },
  output: {
    type: String,
    required: true,
  },
});

export const TestCase = model("TestCase", TestCaseSchema);
