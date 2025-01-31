import Seller from '../model/seller-schema.js';
import {sendMailtoSeller,sendMailforOtp,sendMailforsuccessfulResetPassword} from '../Mail/email.js';
import Otp from '../model/otp-schema.js';
import { generateToken } from '../config/jwtUtils.js';
import bcrypt from 'bcrypt';

export const sellerSignup = async(request,response) =>{
    try{

       const exist = await Seller.findOne({username:request.body.username});
        
       if(exist){
        return response.status(401).json({message:'Username already exist'});
       }

        let seller = request.body;

        const hashedPassword = await bcrypt.hash(seller.password, 10);
    

        const newSeller = new Seller({
            ...seller,
            password: hashedPassword
        });
        await newSeller.save();

        const username = newSeller.username;
        const email = newSeller.email;

        sendMailtoSeller(username, email)
        .then((result) => console.log("Email sent successfully:", result))
        .catch((error) => console.error("Error:", error.message));

        const token = generateToken({
            _id: newSeller._id,
            username: newSeller.username,
            role: "Seller"
        });

        // seller.token = token;

        return response.status(200).json({seller : newSeller,token});
    }
    catch(error){
        return response.status(500).json({message:error.message});
    }
}

export const sellerLogin = async (request,response) => {
    try{
        const username = request.body.username;
        const password = request.body.password;

        let seller = await Seller.findOne({username: username});

        if(!seller){
            return response.status(401).json('Invalid Login');
        }

        const passMatch = await bcrypt.compare(password, seller.password);

        if(passMatch){

            const token = generateToken({
                _id: seller._id,
                username: seller.username,
                role: "Seller"
            });

            // user.token = token;
            return response.status(200).json({seller,token});
        }
        else{
            return response.status(401).json('Invalid Login');
        }
    }
    catch(error){
        return response.status(500).json('Error',error.message);
    }
};

export const forgot_password_seller = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: "An email is required." });

        // Email validation (basic regex pattern for email format)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format.' });
        }

        // Check if user exists
        const seller = await Seller.findOne({ email: email });

        if (!seller) {
            return res.status(401).json({message: "No account found with the provided email."});
        }

        const existing_otp = await Otp.findOne({email : email});
        if(existing_otp){
            return res.status(200).json({message : "Otp already sent"});
        }

        const otp = `${Math.floor(1000 + Math.random() * 9000)}`;   

        // Save OTP to database
        const otpRecord = new Otp({
            email: email,
            otp: otp,
            createdAt: Date.now(),
            expiresAt: Date.now() + 600000  // 10 minutes
        });

        await otpRecord.save();
        
        // Send OTP email for password reset
        await sendMailforOtp(otp, seller.email);
        
        return res.status(200).json({
            message: "Password reset OTP email sent",
            data: {
                email: seller.email,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

export const verify_otp_seller = async (req, res) => {
    try {
        const { email, otp, password } = req.body;

        if (!email || !otp || !password) {
            return res.status(400).json({message: "Email and OTP are required" });
        }

        // Check password length (e.g., minimum 8 characters)
        if (password.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters long.' });
        }

        // Find OTP records for the user by email
        const sellerOTPRecords = await Otp.findOne({ email : email });

        if (!sellerOTPRecords) {
            return res.status(400).json({ message: "Account record doesn't exist" });
        }

        // OTP record exists
        const expiresAt = sellerOTPRecords.expiresAt;
        const existing_otp = sellerOTPRecords.otp;

        if (expiresAt < Date.now()) {
            await Otp.deleteMany({ email });
            return res.status(409).json({ message: "Code has expired. Please request again" });
        }

        if (otp !== existing_otp) {
            return res.status(401).json({ message: "Invalid OTP. Please try again." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await Seller.findOneAndUpdate({ email: email }, {password: hashedPassword});

        await Otp.deleteMany({ email });

        await sendMailforsuccessfulResetPassword(email);

        return res.status(200).json({
            message: "Password changed successfully."
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};