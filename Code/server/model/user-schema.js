import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true, trim: true, min: 1, max: 20 },
    lastname: { type: String, required: true, trim: true, index: true },
    username: { type: String, required: true, trim: true, unique: true, index: true, lowercase: true },
    email: { type: String, required: true, trim: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    cart: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },
            quantity: { type: Number, default: 1 }
        }
    ]
});
const User = mongoose.model('user', userSchema);

export default User;