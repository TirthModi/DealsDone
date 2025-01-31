import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required: true,
        trim:true,
        min:1,
        max:20
    },
    lastname:{
        type: String,
        required: true,
        trim:true,
        index:true
    },
    username:{
        type: String,
        required: true,
        trim:true,
        unique:true,
        index:true,
        lowercase:true
    },
    email:{
        type: String,
        required: true,
        trim:true,
        unique:true,
        lowercase:true
    },
    password:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    }

});

const Seller = mongoose.model('seller',sellerSchema);

export default Seller;