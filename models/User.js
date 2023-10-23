const { Schema, model, ObjectId } = require('mongoose');

const schema = new Schema({
  email: {
    type: String,
    required: true,
  },
  browser: {
    type: String,
  },
  registeredOn: {
    type: ObjectId,
    ref: 'Casino',
    required: true,
  },
});

module.exports = model('User', schema);
