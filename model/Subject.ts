import mongoose from "mongoose";

const SubjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
        maxlength: [60, "Name cannot be more than 60 characters"],
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "School",
        required: [true, "Please provide a school"],
    }
});