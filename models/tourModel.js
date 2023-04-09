const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: [true, 'A tour must have a name'],
        unique: [true, 'Tour name already exists. This must be unique']
    },
    duration: {
        type: Number,
        required: [true, 'A tour must have a duration']
    },
    maxGroupSize: {
        type: Number,
        required: [true, 'A tour must have a group size']
    },
    difficulty: {
        type: String,
        required: [true, 'A tour must have a difficulty']
    },
    price: {
        type: Number,
        default: 1
    },
    priceDiscount: {
        type: Number,
        default: 0
    },
    summary: {
        type: String,
        trim: true,
        required: [true, 'A tour must have a description']
    },
    imageCover: {
        type: String,
        required: [true, 'A tour must have a cover image']
    },
    images: {
        type: [String] //array of string for multiple images
    },
    rating: {
        type: Number,
        required: [true, 'A tour must have a rating']
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false //excludes field from select statement
    },
    startDates: {
        type: [Date]
    }
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;