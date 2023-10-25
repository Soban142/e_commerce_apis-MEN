const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const stripeMethod = (req, res) => {
  stripe.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      source: "pkr",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
};

module.exports = stripeMethod;
