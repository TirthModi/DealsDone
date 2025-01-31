import axios from 'axios';

const URL ='https://dealsdonebackend-2.onrender.com';

export const authenticateSignup = async (data)=>{
    try{
        console.log("success");
        return await axios.post(`${URL}/signup`,data)
        
    }
    catch(error){
        console.log('Error while calling signup api',error);
    }
}

export const authenticateLogin = async (data)=>{
    try{
        console.log("success");
        return await axios.post(`${URL}/login`,data)
        
    }
    catch(error){
        console.log('Error while calling login api',error);
        return error.response;
    }
}

export const authenticateForgotPassword = async (data)=>{
    try{
        console.log("success");
        return await axios.post(`${URL}/forgot-password`,data)
        
    }
    catch(error){
        console.log('Error while calling forgot-password api',error);
    }
}
export const authenticateVerifyOtp = async (data)=>{
    try{
        console.log("success");
        return await axios.post(`${URL}/verify-otp`,data)
        
    }
    catch(error){
        console.log('Error while calling verify-otp api',error);
    }
}

export const authenticatesellerSignup = async (data)=>{
    try{
        console.log("success");
        return await axios.post(`${URL}/sellersignup`,data)
        
    }
    catch(error){
        console.log('Error while calling signup api',error); 
    }
}

export const authenticatesellerLogin = async (data)=>{
    try{
        console.log("success");
        return await axios.post(`${URL}/sellerlogin`,data)
        
    }
    catch(error){
        console.log('Error while calling login api',error);
        return error.response;
    }
}

export const addProduct = async (data) => {
    try{
        console.log("success");
        return await axios.post(`${URL}/addproduct`,data)
    }
    catch(error){
        console.log('Error while updating product',error);
        return error.response;
    }
}

export const authenticateForgotPasswordforSeller = async (data)=>{
    try{
        console.log("success");
        return await axios.post(`${URL}/forgot-password-seller`,data)
        
    }
    catch(error){
        console.log('Error while calling forgot-password api',error);
    }
}
export const authenticateVerifyOtpforSeller = async (data)=>{
    try{
        console.log("success");
        return await axios.post(`${URL}/verify-otp-seller`,data)
        
    }
    catch(error){
        console.log('Error while calling verify-otp api',error);
    }
}

export const submitReview = async (data) => {
    try {
        console.log("success");
        console.log("data is", data);
        return await axios.post(`${URL}/submitreview`,data)
    } 
    catch (error) {
        console.log('Error submitting review:', error);
    }
};

export const getReviewsByProductId = async (productId) => {
    try {
        const response = await axios.get(`${URL}/reviews/${productId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching reviews:', error);
        throw error;
    }
};

export const fetchUserProfile = async () => {
    try {
        const username = localStorage.getItem('username');  
        const response = await axios.get(`${URL}/profilepage`, {
            params: {
                username: username,  
            },
        });
        return response.data;  
    } catch (error) {
        console.error('Error while fetching user profile:', error);
        throw error;
    }
};
