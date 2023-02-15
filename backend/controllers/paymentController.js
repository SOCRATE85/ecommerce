const catchAsyncError = require("../middleware/catchAsyncError");
const stripe = require("stripe")(process.env.STRIPE_SECRETE_KEY);

exports.processPayment = catchAsyncError(async(req, res, _next)=>{
    const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "USD",
        metadata: {
            company: "Ecommerce"
        }
    });

    res.status(200).json({
        success: true,
        client_secret: myPayment.client_secret
    })
});

exports.sendStripeApiKey = catchAsyncError(async (_req, res, _next) => {
   res.status(200).json({stripeApiKey: process.env.STRIPE_API_KEY}) 
});
