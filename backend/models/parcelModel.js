const mongoose = require("mongoose");

const parcelSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "credential"
    },
    title: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: [
            "Dispatch", "Ontheway", "Delivered"
        ],
        default: "Dispatch"
    },
    image: [
        {
            type: String,
            required: true
        }
    ],
    trackId: {
        type: Object,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date(Date.now())
    },
    isDeleted: {
        type: Boolean,
        default: false
    }

}, {timestamps: false})

module.exports = mongoose.model("parcel", parcelSchema)
