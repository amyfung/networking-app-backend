// routes/contactRoutes.js

const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const authenticate = require('../middleware/authenticate');
const { body, query, validationResult } = require('express-validator');
const { param } = require('express-validator');

// Apply authentication middleware to all routes
router.use(authenticate);

/**
 * GET /api/contacts
 * Retrieves all contacts with optional search, filtering, and pagination.
 */
router.get(
  '/',
  [
    // Validation and sanitization of query parameters
    query('name').optional().trim().escape(),
    query('company').optional().trim().escape(),
    query('role').optional().trim().escape(),
    query('email').optional().trim().isEmail().normalizeEmail(),
    query('phoneNumber').optional().trim().escape(),
    query('notes').optional().trim().escape(),
    query('page').optional().isInt({ min: 1 }).toInt(),
    query('limit').optional().isInt({ min: 1 }).toInt(),
    query('sortBy')
      .optional()
      .isIn(['name', 'company', 'role', 'email', 'phoneNumber'])
      .withMessage('Invalid sort field'),
    query('order')
      .optional()
      .isIn(['asc', 'desc'])
      .withMessage('Invalid sort order'),
    // Handle validation errors
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ],
  contactController.getContacts
);

/**
 * GET /api/contacts/:id
 * Retrieves a single contact by ID.
 */
router.get(
  '/:id',
  [
    param('id').isMongoId().withMessage('Invalid contact ID'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ],
  contactController.getContactById
);

/**
 * POST /api/contacts
 * Creates a new contact.
 */
router.post(
  '/',
  [
    // Validation and sanitization of request body
    body('name').notEmpty().withMessage('Name is required').trim().escape(),
    body('company').optional().trim().escape(),
    body('role').optional().trim().escape(),
    body('howMet').optional().trim().escape(),
    body('linkedinProfile')
      .optional()
      .trim()
      .isURL()
      .withMessage('Invalid URL')
      .escape(),
    body('email').optional().trim().isEmail().normalizeEmail(),
    body('phoneNumber').optional().trim().escape(),
    body('notes').optional().trim().escape(),
    // Handle validation errors
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ],
  contactController.createContact
);

/**
 * PUT /api/contacts/:id
 * Updates an existing contact.
 */
router.put(
  '/:id',
  [
    // Validation and sanitization of request body
    body('name').optional().trim().escape(),
    body('company').optional().trim().escape(),
    body('role').optional().trim().escape(),
    body('howMet').optional().trim().escape(),
    body('linkedinProfile')
      .optional()
      .trim()
      .isURL()
      .withMessage('Invalid URL')
      .escape(),
    body('email').optional().trim().isEmail().normalizeEmail(),
    body('phoneNumber').optional().trim().escape(),
    body('notes').optional().trim().escape(),
    // Handle validation errors
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ],
  contactController.updateContact
);

/**
 * DELETE /api/contacts/:id
 * Deletes a contact.
 */
router.delete('/:id', contactController.deleteContact);

module.exports = router;
