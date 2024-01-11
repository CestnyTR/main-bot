const { model, Schema } = require('mongoose');

let welcomeSchema = new Schema({
  Guild: {
    type: String,
    required: true,
  },
  Channel: {
    type: String,
    required: true,
  },
  registerChannel: {
    type: String,
    required: true,

  },
});

module.exports = model('welcomeSchema', welcomeSchema)