const mongoose = require("mongoose");

const WeightSchema = new mongoose.Schema({
  weight: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // 時間も必要かも
});

module.exports = mongoose.model("Weight", WeightSchema);
