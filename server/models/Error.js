import mongoose, {Mongoose} from "mongoose";

const ErrorSchema = mongoose.Schema({
    message: String,
    stack: String,
    date: { type: Date, default: Date.now },
    controller: String,
    meta: mongoose.Schema.Types.Mixed
});

export default mongoose.model('Error', ErrorSchema);