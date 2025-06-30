const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  clicks: { type: Number, default: 0 },
  password: { type: String },
  expiresAt: { type: Date },
  analytics: [
    {
      timestamp: { type: Date, default: Date.now },
      ipAddress: { type: String },
      userAgent: { type: String },
      country: { type: String },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Url', urlSchema);
