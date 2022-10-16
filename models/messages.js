const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const messsageSchema = mongoose.Schema(
  {
    title: { type: String, required: [true, 'Please add a title'] },
    text: { type: String, required: [true, 'Please add a text message'] },
    user: { type: String },
    date: { type: Date },
  },
  {
    timestamps: true,
  }
);

messsageSchema.virtual('date_formated').get(function () {
  return DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATE_MED);
});

module.exports = mongoose.model('Message', messsageSchema);
