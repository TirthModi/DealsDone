import nodemailer from "nodemailer";
import { google } from "googleapis";
import{CONGRATULATION_EMAIL_TEMPLATE_BUYER,CONGRATULATION_EMAIL_TEMPLATE_TO_SELLER, OTP_TEMPLATE,PASSWORDRESETSUCCESS_TEMPLATE} from "./emailTemplate.js"
import dotenv from "dotenv";

dotenv.config();

// Replace with your credentials
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URL;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

// Configure OAuth2 client
const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export const sendMail = async(username,email)=> {
    try {
        // Get access token
        const accessToken = await oAuth2Client.getAccessToken();
        console.log("Access Token:", accessToken.token);

        // Configure nodemailer transport
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "dealsdone7x24@gmail.com", // Sender's email address
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken.token,
            },
        });

        // Verify transporter connection
        await transport.verify();
        console.log("Transporter verified successfully.");

        // Email details
        const mailOptions = {
            from: "DealsDone <dealsdone7x24@gmail.com>", // Sender's name and email
            to: email, // Recipient's email
            subject: "Welcome To DealsDone",
            // text: "Hello from Gmail using API", // Plain text body
            html: CONGRATULATION_EMAIL_TEMPLATE_BUYER.replace("{userName}",username), // HTML body
        };

        // Send email
        const result = await transport.sendMail(mailOptions);
        console.log("Email sent successfully:", result);
        return result;
    } catch (error) {
        console.error("Error sending email:", error.message);
        return error;
    }
};

export const sendMailtoSeller = async(username,email)=> {
    try {
        // Get access token
        const accessToken = await oAuth2Client.getAccessToken();
        console.log("Access Token:", accessToken.token);

        // Configure nodemailer transport
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "dealsdone7x24@gmail.com", // Sender's email address
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken.token, 
            },
        });

        // Verify transporter connection
        await transport.verify();
        console.log("Transporter verified successfully.");

        // Email details
        const mailOptions = {
            from: "DealsDone <dealsdone7x24@gmail.com>", // Sender's name and email
            to: email, // Recipient's email
            subject: "Welcome To DealsDone",
            // text: "Hello from Gmail using API", // Plain text body
            html: CONGRATULATION_EMAIL_TEMPLATE_TO_SELLER.replace("{userName}",username), // HTML body
        };

        // Send email
        const result = await transport.sendMail(mailOptions);
        console.log("Email sent successfully:", result);
        return result;
    } catch (error) {
        console.error("Error sending email:", error.message);
        return error;
    }
}

export const sendMailforOtp = async(otp,email)=> {
    try {
        // Get access token
        const accessToken = await oAuth2Client.getAccessToken();
        console.log("Access Token:", accessToken.token);

        // Configure nodemailer transport
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "dealsdone7x24@gmail.com", // Sender's email address
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken.token, 
            },
        });

        // Verify transporter connection
        await transport.verify();
        console.log("Transporter verified successfully.");

        // Email details
        const mailOptions = {
            from: "DealsDone <dealsdone7x24@gmail.com>", // Sender's name and email
            to: email, // Recipient's email
            subject: "Otp For Reset Password",
            // text: "Hello from Gmail using API", // Plain text body
            html: OTP_TEMPLATE.replace("{otpCode}",otp), // HTML body
        };

        // Send email
        const result = await transport.sendMail(mailOptions);
        console.log("Email sent successfully:", result);
        return result;
    } catch (error) {
        console.error("Error sending email:", error.message);
        return error;
    }
}

export const sendMailforsuccessfulResetPassword = async(email)=> {
    try {
        // Get access token
        const accessToken = await oAuth2Client.getAccessToken();
        console.log("Access Token:", accessToken.token);

        // Configure nodemailer transport
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "dealsdone7x24@gmail.com", // Sender's email address
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken.token, 
            },
        });

        // Verify transporter connection
        await transport.verify();
        console.log("Transporter verified successfully.");

        // Email details
        const mailOptions = {
            from: "DealsDone <dealsdone7x24@gmail.com>", // Sender's name and email
            to: email, // Recipient's email
            subject: "Reset Password Successful", 
            // text: "Hello from Gmail using API", // Plain text body
            html: PASSWORDRESETSUCCESS_TEMPLATE, // HTML body
        };

        // Send email
        const result = await transport.sendMail(mailOptions);
        console.log("Email sent successfully:", result);
        return result;
    } catch (error) {
        console.error("Error sending email:", error.message);
        return error;
    }
}
