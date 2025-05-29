import mongoose from "mongoose";

const SettingsSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    theme: {
        type: String,
        default: 'light'
    },
    language: {
        type: String,
        default: 'en'
    }
})

export default mongoose.model('Settings', SettingsSchema);