import { Schema, Types, model } from "mongoose";

const QALogSchema = new Schema(
  {
    question: {
      type: String,
      required: [true, "Question is required"],
    },
    normalizedQuestion: {
      type: String,
      required: [true, "Normalized question is required"],
    },
    answer: {
      type: String,
      required: [true, "Answer is required"],
    },
  },
  { timestamps: true }
);

export default model("QALog", QALogSchema);
