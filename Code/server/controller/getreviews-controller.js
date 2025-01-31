import Review from '../model/review-schema.js';

export const getreviews = async (req, res) => {
    
    try {
        const { productId } = req.params;

        if (!productId) {
            return res.status(400).json({ message: 'Product ID is required' });
        }

        // Fetch reviews for the given productId and sort them by date (descending)
        const reviews = await Review.find({ productId: productId })
        .exec()
        .then(reviews => {
          reviews.sort((a, b) => new Date(b.date) - new Date(a.date));  // Sorting by date in descending order
          res.status(200).json(reviews);
        })
    } catch (err) {
        // Log the error and return a 500 status with a descriptive message
        console.error('Error fetching reviews:', err);
        return res.status(500).json({ message: 'Error fetching reviews', error: err.message });
    }
};

export default getreviews;
