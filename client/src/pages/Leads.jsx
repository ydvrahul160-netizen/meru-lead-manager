import { useCallback, useEffect, useState } from 'react'
import {
  Search,
  Users,
  RefreshCw,
  Plus,
  Pencil,
  Trash2,
} from 'lucide-react'

import {
  getLeads,
  createLead,
  updateLead,
  deleteLead,
} from '../services/leadService'

import LeadModal from '../components/leads/LeadModal'
import DeleteConfirmation from '../components/leads/DeleteConfirmation'

function Leads() {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')

  const [modalOpen, setModalOpen] = useState(false)
  const [selectedLead, setSelectedLead] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)

  // Fetch leads from backend
  const fetchLeads = useCallback(async () => {
    try {
      setLoading(true)
      setError('')

      const response = await getLeads({
        search: search.trim(),
        status,
      })

      setLeads(response.data)
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Unable to load leads. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }, [search, status])

  useEffect(() => {
    fetchLeads()
  }, [fetchLeads])

  // Open Add Lead modal
  const handleAddLead = () => {
    setSelectedLead(null)
    setModalOpen(true)
  }

  // Open Edit Lead modal
  const handleEditLead = (lead) => {
    setSelectedLead(lead)
    setModalOpen(true)
  }

  // Close Lead modal
  const handleCloseModal = () => {
    setModalOpen(false)
    setSelectedLead(null)
  }

  // Create or update lead
  const handleSaveLead = async (formData) => {
    try {
      setSaving(true)
      setError('')
      setSuccess('')

      if (selectedLead) {
        await updateLead(selectedLead._id, formData)
        setSuccess('Lead updated successfully.')
      } else {
        await createLead(formData)
        setSuccess('Lead created successfully.')
      }

      handleCloseModal()
      await fetchLeads()
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Unable to save lead. Please try again.'
      )
    } finally {
      setSaving(false)
    }
  }

  // Delete lead
  const handleDeleteLead = async () => {
    if (!deleteTarget) return

    try {
      setDeleting(true)
      setError('')
      setSuccess('')

      await deleteLead(deleteTarget._id)

      setDeleteTarget(null)
      setSuccess('Lead deleted successfully.')

      await fetchLeads()
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Unable to delete lead. Please try again.'
      )
    } finally {
      setDeleting(false)
    }
  }

  // Status badge styles
  const statusStyles = {
    New: 'bg-blue-50 text-blue-700',
    Contacted: 'bg-amber-50 text-amber-700',
    Qualified: 'bg-green-50 text-green-700',
    Lost: 'bg-red-50 text-red-700',
  }

  return (
    <div className="space-y-6">

      {/* Page Heading */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            All Leads
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            View and manage your sales leads.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-slate-200 bg-white px-4 py-2.5">
            <p className="text-xs text-slate-500">
              Total Leads
            </p>

            <p className="text-xl font-bold text-slate-900">
              {leads.length}
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddLead}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <Plus size={18} />
            Add Lead
          </button>
        </div>
      </div>

      {/* Success Message */}
      {success && (
        <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {success}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Search and Filters */}
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white p-4">

        <div className="relative min-w-[220px] flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search by lead name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-400"
          />
        </div>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-400"
        >
          <option value="">All Statuses</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Lost">Lost</option>
        </select>

        <button
          type="button"
          onClick={fetchLeads}
          disabled={loading}
          aria-label="Refresh leads"
          className="rounded-lg border border-slate-200 p-2.5 text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
        >
          <RefreshCw
            size={18}
            className={loading ? 'animate-spin' : ''}
          />
        </button>
      </div>

      {/* Leads Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">

        <div className="border-b border-slate-100 px-5 py-4">
          <h2 className="font-semibold text-slate-900">
            Lead Records
          </h2>
        </div>

        {loading ? (
          <div className="flex items-center justify-center gap-3 py-16 text-sm text-slate-500">
            <RefreshCw size={18} className="animate-spin" />
            Loading leads...
          </div>
        ) : leads.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
            <div className="mb-3 rounded-full bg-slate-100 p-4">
              <Users size={25} className="text-slate-500" />
            </div>

            <h3 className="font-semibold text-slate-800">
              No leads found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Add your first lead or change your search filters.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-left">

              <thead className="bg-slate-50">
                <tr className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <th className="px-5 py-4">Name</th>
                  <th className="px-5 py-4">Company</th>
                  <th className="px-5 py-4">Email</th>
                  <th className="px-5 py-4">Phone</th>
                  <th className="px-5 py-4">Source</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {leads.map((lead) => (
                  <tr
                    key={lead._id}
                    className="transition hover:bg-slate-50"
                  >
                    <td className="px-5 py-4 font-medium text-slate-800">
                      {lead.name}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {lead.company}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {lead.email}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {lead.phone}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {lead.source}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          statusStyles[lead.status] ||
                          'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {lead.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center gap-2">

                        <button
                          type="button"
                          onClick={() => handleEditLead(lead)}
                          aria-label={`Edit ${lead.name}`}
                          className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50"
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          type="button"
                          onClick={() => setDeleteTarget(lead)}
                          aria-label={`Delete ${lead.name}`}
                          className="rounded-lg p-2 text-red-600 transition hover:bg-red-50"
                        >
                          <Trash2 size={17} />
                        </button>

                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <LeadModal
          key={selectedLead?._id || 'new-lead'}
          open={modalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSaveLead}
          initialData={selectedLead}
          loading={saving}
        />
      )}

      {/* Delete Confirmation */}
      <DeleteConfirmation
        open={Boolean(deleteTarget)}
        lead={deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteLead}
        loading={deleting}
      />

    </div>
  )
}

export default Leads