const { check } = require("express-validator");

exports.WalletLoginValidator = [

    // Address Validator
    check('address', 'Address is empty')
    .notEmpty(),

    // Wallet Validator
    check('wallet', 'Wallet is empty')
    .notEmpty(),
    
];

exports.GetMemberByAddressValidator = [

    // Address Validator
    check('address', 'Address is empty')
    .notEmpty(),
    
];