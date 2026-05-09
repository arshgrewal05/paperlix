import mongoose from "mongoose";

const PaperSchema = new mongoose.Schema({
  title: String,
  examType: String, // Competitive / University
  state: String,
  subject: String,
  year: Number,
  pdfUrl: String,
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Paper ||
  mongoose.model("Paper", PaperSchema);