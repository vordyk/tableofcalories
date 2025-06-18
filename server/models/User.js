import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    avatar: {
      type: String,
      required: false,
    },
   email: {
       type: String,
       required: true,
       unique: true
   },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
       type: String,
    }
}, { timestamps: true });

export default mongoose.model("User", UserSchema);