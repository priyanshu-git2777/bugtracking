const mongoose = require('mongoose');

const bugSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  severity:    { type: String, enum: ['Critical', 'Major', 'Minor'], default: 'Minor' },
  status:      { type: String, enum: ['Open', 'In Progress', 'Resolved', 'Closed'], default: 'Open' },
  project:     { type: String, default: 'General' },
  assignedTo:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  reportedBy:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Bug', bugSchema);
