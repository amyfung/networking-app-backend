// controllers/contactController.js
const Contact = require('../models/Contact');

// Get all contacts for a user, with optional search filters
exports.getContacts = async (req, res) => {
  try {
    const userId = req.user.id;
    const filters = { userId };

    // Extract query parameters
    const {
      name,
      company,
      role,
      email,
      phoneNumber,
      notes,
      page = 1,
      limit = 10,
      sortBy = 'name',
      order = 'asc',
    } = req.query;

    // Build filters based on query parameters
    if (name) {
      filters.name = { $regex: name, $options: 'i' }; // Case-insensitive regex search
    }
    if (company) {
      filters.company = { $regex: company, $options: 'i' };
    }
    if (role) {
      filters.role = { $regex: role, $options: 'i' };
    }
    if (email) {
      filters.email = { $regex: email, $options: 'i' };
    }
    if (phoneNumber) {
      filters.phoneNumber = { $regex: phoneNumber, $options: 'i' };
    }
    if (notes) {
      filters.notes = { $regex: notes, $options: 'i' };
    }

    // Pagination calculations
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;

    // Sorting
    const sortOptions = {};
    sortOptions[sortBy] = order === 'desc' ? -1 : 1;

    // Get total count for pagination
    const totalContacts = await Contact.countDocuments(filters);

    // Fetch contacts
    const contacts = await Contact.find(filters)
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNumber);

    res.status(200).json({
      total: totalContacts,
      page: pageNumber,
      pages: Math.ceil(totalContacts / limitNumber),
      contacts,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


// Get a single contact by ID
exports.getContactById = async (req, res) => {
  const contact = await Contact.findOne({ _id: req.params.id, userId: req.user.id });
  if (!contact) {
    return res.status(404).json({ message: 'Contact not found' });
  }
  res.json(contact);
};

// Create a new contact
exports.createContact = async (req, res) => {
  const newContact = new Contact({
    userId: req.user.id,
    ...req.body,
  });
  const savedContact = await newContact.save();
  res.status(201).json(savedContact);
};

// Update an existing contact
exports.updateContact = async (req, res) => {
  const updatedContact = await Contact.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    req.body,
    { new: true }
  );
  if (!updatedContact) {
    return res.status(404).json({ message: 'Contact not found' });
  }
  res.json(updatedContact);
};

// Delete a contact
exports.deleteContact = async (req, res) => {
  const deletedContact = await Contact.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  if (!deletedContact) {
    return res.status(404).json({ message: 'Contact not found' });
  }
  res.json({ message: 'Contact deleted' });
};
