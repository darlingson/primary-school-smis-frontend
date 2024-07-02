import Grade from "./Grade";
import mongoose from "mongoose";
const GradebookSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true
    },
    finalGrade: {
        type: Number,
        required: true
    },
    term: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School',
        required: true
    },
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: true
    },
    grades: [Grade]
});

export default mongoose.models.Gradebook || mongoose.model('Gradebook', GradebookSchema)