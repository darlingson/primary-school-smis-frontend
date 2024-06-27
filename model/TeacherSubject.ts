import mongoose from "mongoose";

const TeacherSubjectSchema = new mongoose.Schema({
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Please provide a teacher"],
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
        required: [true, "Please provide a subject"],
    },
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
        required: [true, "Please provide a class"],
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "School",
        required: [true, "Please provide a school"],
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