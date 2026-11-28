import API from './api'

// Get all leads
export const getLeads = async (params = {}) => {
  const response = await API.get('/leads', { params })
  return response.data
}

// Get single lead
export const getLeadById = async (id) => {
  const response = await API.get(`/leads/${id}`)
  return response.data
}

// Create lead
export const createLead = async (leadData) => {
  const response = await API.post('/leads', leadData)
  return response.data
}

// Update lead
export const updateLead = async (id, leadData) => {
  const response = await API.put(`/leads/${id}`, leadData)
  return response.data
}

// Delete lead
export const deleteLead = async (id) => {
  const response = await API.delete(`/leads/${id}`)
  return response.data
}