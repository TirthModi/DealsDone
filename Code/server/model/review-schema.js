import mongoose from "mongoose";

export const reviewSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    reviewText: {
        type: String,
        required: true
    },
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

export default Review; 

