
// model/Provider.js
const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  servicesOffered: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
});

module.exports = mongoose.model('Provider', providerSchema);
