import mongoose from "mongoose";
const Schema = mongoose.Schema;
const UserSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role :{
            type : String
        }

    });
export default mongoose.model("user", UserSchema);