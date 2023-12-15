import mongoose from "mongoose";

const requestSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    site: {
      type: String,
      required: true,
      default: "Nfisdha",
    },
    Local: {
      type: String,
      required: true,
      default: "Nfisdha",
    },
    object: {
      type: String,
      required: true,
    },
    visitdate: {
      type: Date,
    },
    visithour: {
      type: Date,
    },
    personnes: [{
      fullname: { type: String, required: true },
      cin: { type: String, required: true },
    }],
    createdAt: {
      type: Date,
    },
    status: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Request = mongoose.model("Request", requestSchema);

export default Request;
