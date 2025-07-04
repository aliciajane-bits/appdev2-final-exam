const mongoose = require("mongoose");

const eventSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
          },
        date: {
            type: Date,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },

    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;