const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Setup schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  goal: {
    type: String,
  },
  donations: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Donation',
    },
  ],
});

module.exports = mongoose.model('User', userSchema);
// module.exports.get = function (callback, limit) {
//   User.find(callback).limit(limit);
// };
