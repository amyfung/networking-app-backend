// models/Contact.js
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    company: { type: String },
    role: { type: String },
    howMet: { type: String },
    linkedinProfile: { type: String },
    email: { type: String },
    phoneNumber: { type: String },
    notes: { type: String },
  },
  { timestamps: true }
);

// Add indexes for search optimization
contactSchema.index({ userId: 1, name: 1 });
contactSchema.index({ userId: 1, company: 1 });
contactSchema.index({ userId: 1, role: 1 });
contactSchema.index({ userId: 1, email: 1 });
contactSchema.index({ userId: 1, phoneNumber: 1 });
contactSchema.index(
    {
      name: 'text',
      company: 'text',
      role: 'text',
      howMet: 'text',
      notes: 'text',
    },
    {
      weights: {
        name: 5,
        company: 3,
        role: 3,
        notes: 1,
      },
    }
  );
  
  module.exports = mongoose.model('Contact', contactSchema);