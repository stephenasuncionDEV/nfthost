const { check } = require("express-validator");

exports.WalletLoginValidator = [

    // Address Validator
    check('address', 'address is empty')
    .notEmpty(),

    // Wallet Validator
    check('wallet', 'wallet is empty')
    .notEmpty(),
    
];

exports.GetMemberByAddressValidator = [

    // Address Validator
    check('address', 'address is empty')
    .notEmpty(),
    
];

exports.AddCountValidator = [

    // Address Validator
    check('address', 'address is empty')
    .notEmpty(),

    // Service Validator
    check('service', 'service is empty')
    .notEmpty(),
    
    // Value Validator
    check('value', 'value is empty')
    .notEmpty(),

];

exports.AddFreeValidator = [

    // Address Validator
    check('address', 'address is empty')
    .notEmpty(),

    // Service Validator
    check('service', 'service is empty')
    .notEmpty(),
    
    // Value Validator
    check('value', 'value is empty')
    .notEmpty(),

];

exports.DeductFreeValidator = [

    // Address Validator
    check('address', 'address is empty')
    .notEmpty(),

    // Service Validator
    check('service', 'service is empty')
    .notEmpty(),
    
    // Value Validator
    check('value', 'value is empty')
    .notEmpty(),

];

exports.PaymentRequestValidator = [

    // Email Validator
    check('email', 'email is empty')
    .notEmpty(),
    
    // Amount Validator
    check('amount', 'amount is empty')
    .notEmpty(),

];

exports.CreateWebsiteValidator = [

    // Id Validator
    check('memberId', 'memberId is empty')
    .notEmpty(),

];

exports.GetWebsiteValidator = [

    // websiteId Validator
    check('websiteId', 'websiteId is empty')
    .notEmpty(),
    
]

exports.GetWebsitesValidator = [

    // memberId Validator
    check('memberId', 'memberId is empty')
    .notEmpty(),
    
]

exports.UpdateWebsiteValidator = [

    // websiteId Validator
    check('websiteId', 'websiteId is empty')
    .notEmpty(),

]