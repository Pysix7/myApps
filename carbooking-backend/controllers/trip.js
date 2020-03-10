const CONFIGS = require("../configs");

const getDateDiff = (fromDate, toDate) => {
  const date1 = new Date(fromDate);
  const date2 = new Date(toDate);
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  // console.log('diffDays', diffDays);
  return diffDays + 1; // +1 because if from and to date are same it returns 0
};

exports.bookTrip = async (req, res, next) => {
  // console.log("req.body :", req.body);
  const { distance, origin, destination, fromDate, toDate } = req.body;
  // distance * 20 rs/km
  // exaple : 300 * 20 = 6000
  const distanceCharges =
    +distance < CONFIGS.MIN_TRAVEL_DISTANCE
      ? CONFIGS.MIN_TRAVEL_DISTANCE * CONFIGS.RATE_OF_CAR
      : +distance * CONFIGS.RATE_OF_CAR;

  // console.log("distanceCharges :", distanceCharges);

  const numberOfDays = getDateDiff(fromDate, toDate);

  // 250 * number of days
  // exp : 250 * 3 = 750
  const driverCharges = CONFIGS.PER_DAY_CHARGE * numberOfDays;
  // console.log("driverCharges :", driverCharges);

  const totalAmount = distanceCharges + driverCharges;

  const stripe = require("stripe")(
    "sk_test_Jvi28SSuFDoRS4HowNR7wRdc00C1hFBGz3"
  );

  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalAmount,
    currency: "inr",
    // Verify your integration in this guide by including this parameter
    metadata: { integration_check: "accept_a_payment" }
  });

  // console.log("paymentIntent :", paymentIntent);
  res.status(200).json({
    amount: paymentIntent.amount,
    client: paymentIntent.client_secret
  });
};
