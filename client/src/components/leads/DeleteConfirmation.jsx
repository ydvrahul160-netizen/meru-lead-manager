import { AlertTriangle, X } from 'lucide-react'

function DeleteConfirmation({ open, lead, onClose, onConfirm, loading }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        {/* Icon and Close */}
        <div className="flex items-start justify-between">
          <div className="rounded-xl bg-red-50 p-3 text-red-600">
            <AlertTriangle size={24} />
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            aria-label="Close confirmation"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
          >
            <X size={19} />
          </button>
        </div>

        {/* Message */}
        <h2 className="mt-5 text-lg font-bold text-slate-900">
          Delete Lead?
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Are you sure you want to delete{' '}
          <span className="font-semibold text-slate-800">
            {lead?.name}
          </span>
          ? This action cannot be undone.
        </p>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
          >
            {loading ? 'Deleting...' : 'Delete Lead'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirmation