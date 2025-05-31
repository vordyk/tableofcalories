import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    avatar: {
      type: String,
      required: false,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
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