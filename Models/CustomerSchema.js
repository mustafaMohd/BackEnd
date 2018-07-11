// var mongoose = require('mongoose');

import mongoose from 'mongoose';

// var connection = mongoose.createConnection();
var Schema = mongoose.Schema;
//var autoIncrement = require('mongoose-auto-increment');
//autoIncrement.initialize(connection);

//create customer and related schema using mongoose

var image = new Schema({ path: String }, {
    _id: false
});

var ridesList = new Schema({
    rideId: {
        type: String,
        required: true
    },
    rating: Number,
    reviews: String,
    images: [image]
}, {
    _id: false
});


var customerSchema = new Schema({
    custId: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    rides: [ridesList],
    verifyStatus: { type: Boolean, default: false },
    isIgnored: { type: Boolean, default: false }
}, {
    versionKey: false
});

//create Customers model from schema
var Customers = mongoose.model('Customers', customerSchema);

customerSchema.plugin(autoIncrement.plugin, {
    model: 'Customers',
    field: 'custId',
    startAt: 1,
    incrementBy: 1
});