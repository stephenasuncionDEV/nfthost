const { Payment } = require('../../models/Payments');
const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET);

// Request a payment
exports.requestPayment = async (req, res, next) => {
    try {
        const { email, amount: service } = req.body;
        
        const price = {
            generator: 25 * 100,
            website: 15 * 100
        }[service]

        const paymentIntent = await stripe.paymentIntents.create({
            amount: price,
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