import mongoose from "mongoose";

const SubjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
        maxlength: [60, "Name cannot be more than 60 characters"],
    },
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
        required: [true, "Please provide a class"],
    },
    type: {
        type: String,
        enum: ["science","humanities","socialStudies","language","other"],
        required: [true, "Please specify a type"],
    }
});