import mongoose from "mongoose";

const GradeSchema = new mongoose.Schema({
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true
  },
  assessmentName: {
    type: String,
    required: true
  },
  grade: {
    type: Number,
    required: true
  },
  finalGrade: {
    type: Number,
    required: false
  }
});

export default mongoose.models.Grade || mongoose.model('Grade', GradeSchema)