const mongoose = require("mongoose");

const StoreSchema = new mongoose.Schema(
  {
    id_product: {
      type: String,
      required: true,
    },
    sellquantity:{
      type: Number,
      required: true,
      default:0,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Store", StoreSchema);
