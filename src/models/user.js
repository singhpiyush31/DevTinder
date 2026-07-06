const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema({
    firstName: {
        type: String, 
        required: true,
        minLength: 2,
        maxLength: 30,
    },
    lastName: {
        type: String
    },
    emailID: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        
    },
    password: {
        type: String
    },
    age: {
        type: Number,
        min: 18,
    },
    gender: {
        type: String,
        validate(value) {
            if(!["male", "female", "others"].includes(value)) {
                throw new Error("Gender data is not valid");
            } 
        },
    },
    photoUrl: {
        type: String,
        default: "https://www.magnific.com/free-vector/blue-circle-with-white-user_145857007.htm#fromView=keyword&page=1&position=0&uuid=85c2d831-31dc-40fd-b76b-922e92b2abd3&query=User+profile",
        validate(value) {
            if(!validator.isURL(value)) {
                throw new Error("Invalid Photo URL: " + value); 
            }
        },
    },
    about: {
        type: String,
        default: "This is a default about the user!", 
    },
    skills: {
        type: [String] 
    },
},
{
    timestamps: true,
}
);

module.exports = mongoose.model("User" , userSchema);

