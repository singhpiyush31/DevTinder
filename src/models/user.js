const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
        enum: {
            values: ["male", "female", "others"],
            message: `{VALUE} is not a valid gender type.`,
        }

        // validate(value) {
        //     if(!["male", "female", "others"].includes(value)) {
        //         throw new Error("Gender data is not valid");
        //     } 
        // },
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

userSchema.methods.getJWT = async function () {
    const user  = this;

    const token = await jwt.sign({ _id: user._id }, "Dev@Tinder$989", {
        expiresIn: "7d",
    });

    return token;

};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
    return isPasswordValid;
}

module.exports = mongoose.model("User" , userSchema);

