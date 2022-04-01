const razorpay = require("razorpay")

var razorpay_credentials = {
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET
}

const rpay = new razorpay(razorpay_credentials)
const getOrderId = async (amount, res) => {
  console.log("getorderid")
  var options = {
    amount: amount,
    currency: 'INR'
  }
  await rpay.orders.create(options, (err, order) => {
    return res(order, err)
  })
}

const verifyOrder = async (payload, res) => {
  let body = payload.razorpay_order_id + '|' + payload.razorpay_payment_id
  var expected_signature = crypto.createHmac('sha256', razorpay_credentials.key_secret)
    .update(body.toString())
    .digest('hex');
  if (payload.razorpay_signature === expected_signature) {
    return res(true, null)
  }
  else
    return res(false, 'payload signature not matching expected signature')
}

const refundPayement = async (paymentId) => {
  try {
    instance.payments.refund(paymentId, function (err, refund) {
      return refund;
    });
  } catch (error) {
    return error;
  }
};

module.exports = { getOrderId, verifyOrder, refundPayement }