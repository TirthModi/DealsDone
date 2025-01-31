import User from '../model/user-schema.js';
import { sendMail, sendMailforOtp,sendMailforsuccessfulResetPassword } from '../Mail/email.js';
import Otp from '../model/otp-schema.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../config/jwtUtils.js';

export const userSignup = async(request,response) =>{
    try{

       const exist = await User.findOne({username:request.body.username});
        
       if(exist){
        return response.status(401).json({message:'Username already exist'});
       }

        let user = request.body;

        const hashedPassword = await bcrypt.hash(user.password, 10);
        
        const newUser = new User({
            ...user,
            password:hashedPassword
        });

        await newUser.save();

        const username = newUser.username;
        const email = newUser.email;

        sendMail(username, email)
        .then((result) => console.log("Email sent successfully:", result))
        .catch((error) => console.error("Error:", error.message));

        const token = generateToken({
            _id: newUser._id,
            username: newUser.username,
            role: "Buyer"
        });

        // user.token = token;

        return response.status(200).json({user:newUser,token});
    }
    catch(error){
        return response.status(500).json({message:error.message});
    }
}

export const userLogin = async (request,response) => {
    try{
        const username = request.body.username;
        const password = request.body.password;

        let user = await User.findOne({username: username});

        if(!user){
            return response.status(401).json('Invalid Login');
        }

        const passMatch = await bcrypt.compare(password, user.password);

        if(passMatch){

            const token = generateToken({
                _id: user._id,
                username: user.username,
                role: "Buyer"
            });

           // user.token = token;
            return response.status(200).json({user,token});
        }
        else{
            return response.status(401).json('Invalid Login');
        }
    }
    catch(error){
        return response.status(500).json('Error',error.message);
    }
}

export const forgot_password = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: "An email is required." });

        // Email validation (basic regex pattern for email format)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format.' });
        }

        // Check if user exists
        const user = await User.findOne({ email: email });

        if (!user) {
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
        await sendMailforOtp(otp, user.email);
        
        return res.status(200).json({
            message: "Password reset OTP email sent",
            data: {
                email: user.email,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

export const verify_otp = async (req, res) => {
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
        const userOTPRecords = await Otp.findOne({ email : email });

        if (!userOTPRecords) {
            return res.status(400).json({ message: "Account record doesn't exist" });
        }

        // OTP record exists
        const expiresAt = userOTPRecords.expiresAt;
        const existing_otp = userOTPRecords.otp;

        if (expiresAt < Date.now()) {
            await Otp.deleteMany({ email });
            return res.status(409).json({ message: "Code has expired. Please request again" });
        }

        if (otp !== existing_otp) {
            return res.status(401).json({ message: "Invalid OTP. Please try again." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.findOneAndUpdate({ email: email }, {password: hashedPassword});

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