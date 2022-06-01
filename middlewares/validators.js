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

exports.AddGenerationCountValidator = [

    // Address Validator
    check('address', 'Address is empty')
    .notEmpty(),
    
    // Value Validator
    check('value', 'Value is empty')
    .notEmpty(),

];

exports.AddGenerationValidator = [

    // Address Validator
    check('address', 'Address is empty')
    .notEmpty(),
    
    // Value Validator
    check('value', 'Value is empty')
    .notEmpty(),

];

exports.DeductGenerationValidator = [

    // Address Validator
    check('address', 'Address is empty')
    .notEmpty(),
    
    // Value Validator
    check('value', 'Value is empty')
    .notEmpty(),

];