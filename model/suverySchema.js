const mongoose = require("mongoose");

const SuverySchema = mongoose.Schema(
  {
    requestId: String,
    requestTimestamp: Number,
    responseTimestamp: Number,
    responseTime: Number,
  },
  {
    timestamps: true,
  }
);
const Suvery = mongoose.model("results", SuverySchema);

module.exports = Suvery;
