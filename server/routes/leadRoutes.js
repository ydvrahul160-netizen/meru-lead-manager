const express = require('express')
const router = express.Router()

const {
  getLeads,
  getLeadById,
  createLead,
  updateLead,
  deleteLead,
} = require('../controllers/leadController')

const { validateLead } = require('../validators/leadValidator')
const protect = require('../middleware/authMiddleware')

// All lead routes require login
router.use(protect)

// Get all leads
router.get('/', getLeads)

// Get a single lead
router.get('/:id', getLeadById)

// Create a lead
router.post('/', validateLead, createLead)

// Update a lead
router.put('/:id', validateLead, updateLead)

// Delete a lead
router.delete('/:id', deleteLead)

module.exports = router