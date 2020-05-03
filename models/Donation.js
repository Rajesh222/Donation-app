const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Setup schema
const donationSchema = new Schema({
  monthly: {
    type: Boolean,
  },
  oneTime: {
    type: Boolean,
  },
  raisedAmount: {
    type: Number,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: 'projects',
  },
});

module.exports = mongoose.model('Donation', donationSchema);
