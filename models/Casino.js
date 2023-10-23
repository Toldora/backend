const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  users: [
    {
      type: Types.ObjectId,
      ref: 'User',
    },
  ],
  name: {
    type: String,
    required: true,
  },
});

module.exports = model('Casino', schema);
