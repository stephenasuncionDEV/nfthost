const {check} = require("express-validator");

exports.HostValidator = [
    check('title', 'Enter a title')
    .notEmpty()
    .isLength({ min:1, max:30 }).withMessage('Title must be between 1 and 30 characters'),

    check('description', 'Enter a title')
    .notEmpty()
    .isLength({ min:1, max:255 }).withMessage('Description must be between 1 and 255 characters'),

    check('iframe', 'Enter a title')
    .notEmpty()
    .isLength({ min:200, max:350 }).withMessage('Iframe code must be between 200 and 350 characters'),
];

exports.HostValidatorDelete = [
    check('url', 'Enter a URL')
    .notEmpty()
];