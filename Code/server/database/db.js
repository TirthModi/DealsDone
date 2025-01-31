import mongoose from 'mongoose';

export const Connection =async(username,password) =>
{
    const url = `mongodb+srv://${username}:${password}@marketplace.dem5a.mongodb.net/?retryWrites=true&w=majority&appName=Marketplace`;
    try {
        await mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });
        console.log("Database connected successfully");
    }
    catch (error) {
        console.log("Error while connecting to database", error);
    }
}

export default Connection;

