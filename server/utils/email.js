// Dummy email utility (email disabled for now)

const sendPaymentEmail = async () => {
  console.log("📧 Email sending skipped (email disabled)");
  return true;
};

module.exports = { sendPaymentEmail };
