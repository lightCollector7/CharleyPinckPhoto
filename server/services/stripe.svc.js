var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); 

exports.chargeCard = function(token, amountToCharge, descriptionOfCharge) {
    return stripe.charges.create({
        amount: amountToCharge,
        currency: 'usd',
        source: token,
        description: descriptionOfCharge
    });
};


// returning a promise, so when we call .charge, we can use
//.then... 

//in the controller
