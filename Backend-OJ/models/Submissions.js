import { model, Schema } from "mongoose";

const SubmissionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  runtime: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    default: Date.now().toLocaleString(),
  },
});

export const Submission = model("Submission", SubmissionSchema);
