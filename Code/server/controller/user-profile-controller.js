import User from '../model/user-schema.js';

export const getUserProfile = async (req, res) => {
    const { username } = req.query;

    if (!username) {
        return res.status(400).json({ message: 'Username is required' });
    }

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return the user's profile if found
        return res.status(200).json({
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
            email: user.email,
            phone: user.phone,
            cart: user.cart,
        });

    } catch (error) {
        console.error('Error fetching user profile:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};
