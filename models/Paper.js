import mongoose from "mongoose";

const PaperSchema = new mongoose.Schema(
  {
    title: String,
    category: String,
    year: String,
    fileUrl: String,
    downloads: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Paper ||
  mongoose.model("Paper", PaperSchema);
