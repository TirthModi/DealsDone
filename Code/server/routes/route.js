import express from 'express';

import { userSignup , userLogin, forgot_password, verify_otp} from '../controller/user-controller.js';
import { getProducts, getProductById } from '../controller/product-controller.js';
import { sellerSignup, sellerLogin,forgot_password_seller,verify_otp_seller} from '../controller/seller-controller.js'
import { addProduct } from '../controller/addProduct-controller.js';
import { authenticateTokenSeller, authenticateToken} from '../middleware/authentication.js';
import { submitReview } from '../controller/submitReview-controller.js'
import { getreviews } from '../controller/getreviews-controller.js'
import { addToCart, getCart , updateCartItem, removeFromCart, clearCart} from '../controller/cart-controller.js';
import { getUserProfile } from '../controller/user-profile-controller.js';


const router = express.Router();

router.post('/sellersignup',sellerSignup);
router.post('/sellerlogin',sellerLogin);

router.post('/signup',userSignup);
router.post('/login',userLogin);
router.post('/forgot-password',forgot_password);
router.post('/verify-otp',verify_otp);

router.post('/forgot-password-seller',forgot_password_seller);
router.post('/verify-otp-seller',verify_otp_seller);

router.get('/products',getProducts);
router.get('/product/:id', getProductById);

router.post('/addproduct', addProduct);

router.post('/submitreview', submitReview);
router.get('/reviews/:productId', getreviews);

router.post('/cart/add', addToCart); 
router.get('/cart/:userId', getCart); 
router.put('/cart/update', updateCartItem);
router.delete('/cart/remove', removeFromCart); 
router.delete('/cart/clear', clearCart); 

router.get('/profilepage', getUserProfile);

export default router;
 