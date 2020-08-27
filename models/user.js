var mongoose = require("mongoose");
var moment = require("moment"); // for date handling

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
  first_name: {
    type: String,
  },
  family_name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  phone_num: {
    type: String,
  },

  profile_img: {

    type: String,
  },
  summary: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  date_of_birth: {
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
  var fullname = "";

  if (this.first_name && this.family_name) {
    fullname = this.family_name + ", " + this.first_name;
  }

  if (!this.first_name && !this.family_name) {
    fullname = "";
  }
  return fullname;
});

// virtual for user instance URL.
UserSchema.virtual("url").get(function () {
  return "/dashboard/user/" + this._id;
});

// virtual for user's age
UserSchema.virtual("age").get(function () {
  var age_dt = new Date(Date.now());
  return Math.abs(
    age_dt.getUTCFullYear() - this.date_of_birth.getUTCFullYear()
  );
});

module.exports = mongoose.model("User", UserSchema);
