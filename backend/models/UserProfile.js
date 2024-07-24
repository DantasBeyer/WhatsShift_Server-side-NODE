const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userProfileSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    whatsApp: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

const userProfile = mongoose.model("UserProfile", userProfileSchema);

module.exports = UserProfile;
