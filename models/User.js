const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  email: {
    type: String,
    required: true,
  },
  browser: {
    type: String,
  },
  registeredOn: { type: Types.ObjectId, ref: 'Casino', required: true },
});

module.exports = model('User', schema);
