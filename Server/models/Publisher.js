const mongoose = require("mongoose");

const PublisherSchema = new mongoose.Schema(
  {
    publisher_name: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
      type: String,
      required:true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Publisher", PublisherSchema);
