const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PaymentsSchema = new Schema({
    address: {
        type:String, 
        required:true,
        unique:true
    },
}, { timestamps: true });

exports.Payment = mongoose.model('payment', PaymentsSchema);