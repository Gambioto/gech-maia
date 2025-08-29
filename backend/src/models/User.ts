import mongoose from "mongoose"

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tipo: {
        type: String
    }
})

export default mongoose.model("User", UserSchema);