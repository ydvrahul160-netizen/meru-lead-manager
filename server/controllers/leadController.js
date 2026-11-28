const Lead = require('../models/Lead')

// Get all leads with search and status filter
const getLeads = async (req, res, next) => {
  try {
    const { search, status } = req.query

    const filter = {
      owner: req.user._id,
    }

    if (search) {
      filter.name = { $regex: search.trim(), $options: 'i' }
    }

    if (status) {
      filter.status = status
    }

    const leads = await Lead.find(filter).sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: leads.length,
      data: leads,
    })
  } catch (error) {
    next(error)
  }
}

// Get a single lead
const getLeadById = async (req, res, next) => {
  try {
    const lead = await Lead.findOne({
      _id: req.params.id,
      owner: req.user._id,
    })

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found',
      })
    }

    res.status(200).json({
      success: true,
      data: lead,
    })
  } catch (error) {
    next(error)
  }
}

// Create a new lead
const createLead = async (req, res, next) => {
  try {
    const lead = await Lead.create({
      ...req.body,
      owner: req.user._id,
    })

    res.status(201).json({
      success: true,
      message: 'Lead created successfully',
      data: lead,
    })
  } catch (error) {
    next(error)
  }
}

// Update an existing lead
const updateLead = async (req, res, next) => {
  try {
    const { owner, ...updateData } = req.body

    const lead = await Lead.findOneAndUpdate(
      {
        _id: req.params.id,
        owner: req.user._id,
      },
      updateData,
      {
        new: true,
        runValidators: true,
      }
    )

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found',
      })
    }

    res.status(200).json({
      success: true,
      message: 'Lead updated successfully',
      data: lead,
    })
  } catch (error) {
    next(error)
  }
}

// Delete a lead
const deleteLead = async (req, res, next) => {
  try {
    const lead = await Lead.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    })

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found',
      })
    }

    res.status(200).json({
      success: true,
      message: 'Lead deleted successfully',
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getLeads,
  getLeadById,
  createLead,
  updateLead,
  deleteLead,
}