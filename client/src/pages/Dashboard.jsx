import { useEffect, useState } from 'react'
import {
  Users,
  UserPlus,
  PhoneCall,
  Trophy,
  XCircle,
  RefreshCw,
  TrendingUp,
} from 'lucide-react'

import { getLeads } from '../services/leadService'

function Dashboard() {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        setError('')

        const response = await getLeads()
        setLeads(response.data)
      } catch (err) {
        setError(
          err.response?.data?.message ||
            'Unable to load dashboard data.'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const stats = [
    {
      title: 'Total Leads',
      value: leads.length,
      icon: Users,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'New Leads',
      value: leads.filter((lead) => lead.status === 'New').length,
      icon: UserPlus,
      color: 'bg-indigo-50 text-indigo-600',
    },
    {
      title: 'Contacted',
      value: leads.filter((lead) => lead.status === 'Contacted').length,
      icon: PhoneCall,
      color: 'bg-amber-50 text-amber-600',
    },
    {
      title: 'Qualified',
      value: leads.filter((lead) => lead.status === 'Qualified').length,
      icon: Trophy,
      color: 'bg-green-50 text-green-600',
    },
    {
      title: 'Lost',
      value: leads.filter((lead) => lead.status === 'Lost').length,
      icon: XCircle,
      color: 'bg-red-50 text-red-600',
    },
  ]

  const recentLeads = [...leads]
    .sort(
      (a, b) =>
        new Date(b.createdAt) - new Date(a.createdAt)
    )
    .slice(0, 5)

  const statusStyles = {
    New: 'bg-blue-50 text-blue-700',
    Contacted: 'bg-amber-50 text-amber-700',
    Qualified: 'bg-green-50 text-green-700',
    Lost: 'bg-red-50 text-red-700',
  }

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center gap-3 text-sm text-slate-500">
        <RefreshCw size={18} className="animate-spin" />
        Loading dashboard...
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
        <p className="text-sm text-red-600">{error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-7">

      {/* Heading */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Dashboard Overview
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Track your sales pipeline and manage your leads.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {stats.map((stat) => {
          const Icon = stat.icon

          return (
            <div
              key={stat.title}
              className="rounded-xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">
                  {stat.title}
                </p>

                <div className={`rounded-lg p-2.5 ${stat.color}`}>
                  <Icon size={19} />
                </div>
              </div>

              <h2 className="mt-4 text-3xl font-bold text-slate-900">
                {stat.value}
              </h2>
            </div>
          )
        })}
      </div>

      {/* Recent Leads */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">

        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div>
            <h2 className="font-semibold text-slate-900">
              Recent Leads
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Your latest 5 lead records
            </p>
          </div>

          <TrendingUp size={20} className="text-blue-600" />
        </div>

        {recentLeads.length === 0 ? (
          <div className="px-5 py-16 text-center">
            <Users
              size={28}
              className="mx-auto mb-3 text-slate-400"
            />

            <h3 className="font-semibold text-slate-800">
              No leads available
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Add your first lead to see dashboard statistics.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left">

              <thead className="bg-slate-50">
                <tr className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <th className="px-5 py-4">Name</th>
                  <th className="px-5 py-4">Company</th>
                  <th className="px-5 py-4">Email</th>
                  <th className="px-5 py-4">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {recentLeads.map((lead) => (
                  <tr key={lead._id} className="hover:bg-slate-50">
                    <td className="px-5 py-4 text-sm font-medium text-slate-800">
                      {lead.name}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {lead.company}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {lead.email}
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
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}
      </div>

    </div>
  )
}

export default Dashboard