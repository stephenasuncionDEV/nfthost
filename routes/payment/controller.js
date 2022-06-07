const { Payment } = require('../../models/Payments');
const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET);

// Request a payment
exports.requestPayment = async (req, res, next) => {
    try {
        const { email, amount } = req.body;
        
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency: 'usd',
            metadata: {
                integration_check: 'accept_a_payment'
            },
            receipt_email: email
        })

        res.status(200).send({ secret: paymentIntent.client_secret });

    } catch (err) {
        next(err);
    }
}

exports.addPayment = async (req, res, next) => {
    try {   
        const payment = new Payment({...req.body});
        const result = await payment.save({ ordered: false });

        res.status(200).send(result);

    } catch (err) {
        next(err);
    }
}