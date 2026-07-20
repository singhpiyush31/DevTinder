const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({

    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the user collections
        required: true, 
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["ignored", "interested", "accepted", "rejected"],
            message: `{VALUE} is incorrect status type`
        }
    }

}, { timestamps: true, }
);



connectionRequestSchema.pre("save", function () {
    const connectionRequest = this;

    // Check if the fromUserId is same as toUserId
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error("Cannot sent request to yourself!");
    }

})

const connectionRequestModel = new mongoose.model("ConnectionRequest", connectionRequestSchema);

module.exports = connectionRequestModel;