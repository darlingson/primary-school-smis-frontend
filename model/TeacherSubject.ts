import mongoose from "mongoose";

const TeacherSubjectSchema = new mongoose.Schema({
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide a teacher"],
  },
  subject: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: [true, "Please provide a subject id"],
    },
    name: {
      type: String,
      required: [true, "Please provide a subject name"],
    },
  },
  class: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: [true, "Please provide a class id"],
    },
    name: {
      type: String,
      required: [true, "Please provide a class name"],
    },
  },
  school: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "Please provide a school id"],
    },
    name: {
      type: String,
      required: [true, "Please provide a school name"],
    },
  },
  Term: {
    type: String,
    enum: ["First Term", "Second Term", "Third Term"],
    required: [true, "Please provide a term"],
  },
  Year: {
    type: Number,
    required: [true, "Please provide a year"],
  },
  AcademicYear: {
    type: String,
    required: [true, "Please provide an academic year"],
  },
});

export default mongoose.models.TeacherSubject || mongoose.model("TeacherSubject", TeacherSubjectSchema);