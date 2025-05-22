import { Schema, Types, model } from "mongoose";

const QALogSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
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
    model: {
      type: String,
      default: "meta-llama/llama-4-maverick:free",
    },
  },
  { timestamps: true }
);

QALogSchema.index({ normalizedQuestion: 1 });

export default model("QALog", QALogSchema);
