import Review from '../model/review-schema.js';

export const submitReview = async (req, res) => {
    try {
        const { productId, rating, reviewText } = req.body;

        // Check if productId, rating, and reviewText are present
        if (!productId || !rating || !reviewText) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Check if rating is a non-empty string
        if (typeof rating !== 'string' || rating.trim() === '') {
            return res.status(400).json({ message: 'Rating must be a non-empty string' });
        }

        // Check if rating is a number and is within a valid range (1-5)
        const numericRating = parseFloat(rating.trim());
        if (isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
            return res.status(400).json({ message: 'Rating must be a number between 1 and 5' });
        }

        // Check if reviewText is a non-empty string
        if (typeof reviewText !== 'string' || reviewText.trim() === '') {
            return res.status(400).json({ message: 'Review text must be a non-empty string' });
        }

        // Create a new review object
        const newReview = new Review({
            productId,
            rating: numericRating,  // Store the numeric value for rating
            reviewText: reviewText.trim(),
            date: new Date(),
        });

        // Save the review to the database
        await newReview.save();

        // Send the response
        res.status(201).json({ message: 'Review submitted successfully', review: newReview });
    } catch (error) {
        console.error('Error submitting review:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
