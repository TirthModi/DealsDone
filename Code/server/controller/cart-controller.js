import User from '../model/user-schema.js';
import Product from '../model/product-schema.js'; 
export const addToCart = async (req, res) => {
    try {
        const { username, id, quantity } = req.body;

        
        if (!username || !id) {
            return res.status(400).json({ message: 'Username and Product ID are required.' });
        }

   
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

      
        const product = await Product.findById(id); 
        if (!product) {
            return res.status(404).json({ message: 'Product not found.' });
        }

        
        const cartItem = user.cart.find(item => item.productId.toString() === id);

        if (cartItem) {
           
            cartItem.quantity += quantity || 1;
        } else {
         
            user.cart.push({ productId: id, quantity: quantity || 1 });
        }

        
        await user.save();

        res.status(200).json({ message: 'Product added to cart successfully.', cart: user.cart });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

export const getCart = async (req, res) => {
    try {
        const { username } = req.params;

        const user = await User.findOne({ username }).populate('cart.productId'); 
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({ cart: user.cart });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};


export const updateCartItem = async (req, res) => {
    try {
        const { username, id, quantity } = req.body;

        if (!username || !id || !quantity) {
            return res.status(400).json({ message: 'Username, Product ID, and quantity are required.' });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const cartItem = user.cart.find(item => item.productId.toString() === id);
        if (!cartItem) {
            return res.status(404).json({ message: 'Product not found in cart.' });
        }

        cartItem.quantity = quantity;
        await user.save();

        res.status(200).json({ message: 'Cart updated successfully.', cart: user.cart });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};


export const removeFromCart = async (req, res) => {
    try {
        const { username, id } = req.body;

        if (!username || !id) {
            return res.status(400).json({ message: 'Username and Product ID are required.' });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const updatedCart = user.cart.filter(item => item.productId.toString() !== id);

        user.cart = updatedCart;
        await user.save();

        res.status(200).json({ message: 'Product removed from cart.', cart: user.cart });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};


export const clearCart = async (req, res) => {
    try {
        const { username } = req.body;

        if (!username) {
            return res.status(400).json({ message: 'Username is required.' });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        user.cart = [];
        await user.save();

        res.status(200).json({ message: 'Cart cleared successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

