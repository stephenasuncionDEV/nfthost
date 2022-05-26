const { check } = require("express-validator");

exports.WalletLoginValidator = [

    // Address Validator
    check('address', 'Address is empty')
    .notEmpty(),

];