const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'A tour must have a name'],
        unique: [true, 'Tour name already exists. This must be unique']
    },
    price: {
        type: Number,
        default: 1
    },
    rating: {
        type: Number,
        required: [true, 'A tour must have a rating']
    }
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;