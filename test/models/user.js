const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    phoneNum: {
        type: String,
    },

    profileImg: {
        type: String,
    },
    summary: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
    },
    popularity: {
        type: Number,
    },
    infoDisplayConsent: {
        type: Boolean,
    },
    emailConsent: {
        type: Boolean,
    },
    isAdmin: {
        type: Boolean,
    },
});

// Virtual for user "full" name.
UserSchema.virtual("name").get(function () {
    var fullName = "";

    if (this.firstName && this.lastName) {
        fullName = this.lastName + ", " + this.firstName;
    }

    if (!this.firstName && !this.lastName) {
        fullName = "";
    }
    return fullName;
});

// virtual for user instance URL.
UserSchema.virtual("url").get(function () {
    return "/dashboard/user/" + this._id;
});

// virtual for user's age
UserSchema.virtual("age").get(function () {
    var age_dt = new Date(Date.now());
    return Math.abs(
        age_dt.getUTCFullYear() - this.dateOfBirth.getUTCFullYear()
    );
});

module.exports = mongoose.model("User", UserSchema);