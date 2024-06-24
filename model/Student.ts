import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
        maxlength: [60, "Name cannot be more than 60 characters"],
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "School",
        required: [true, "Please provide a school"],
    },
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
        required: [true, "Please provide a class"],
    },
    homeAddress: {
        type: String,
        required: [true, "Please provide an address"],
    },
    guardian: {
        type: String,
        required: [true, "Please provide a guardian"],
    },
    guardianPhone: {
        type: String,
        required: [true, "Please provide a phone number"],
    },
    guardianEmail: {
        type: String,
        required: [true, "Please provide an email"],
    },
});