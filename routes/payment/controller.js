const { NFTError } = require('../../middlewares/errorHandler');
const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET);

exports.requestPayment = (req, res, next) => {
    try {
        const { amount, email } = req.body;
        
        stripe.paymentIntents.create({
            amount,
            currency: 'usd',
            metadata: {
                integration_check: 'accept_a_payment'
            },
            receipt_email: email
        })
        .then(response => {
            res.status(200).send(response.client_secret);
        })
        .catch(err => {
            throw new NFTError(err.message, 400);
        })

    } catch (err) {
        next(err);
    }
}