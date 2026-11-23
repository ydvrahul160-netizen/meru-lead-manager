import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  Settings,
  HelpCircle,
  BriefcaseBusiness,
} from 'lucide-react'

const navigation = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'All Leads',
    path: '/leads',
    icon: Users,
  },
]

function Sidebar() {
  return (
    <aside className="flex h-screen w-64 flex-col border-r border-slate-200 bg-white px-5 py-6">
      {/* Brand */}
      <div className="mb-10 flex items-center gap-3 px-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
          <BriefcaseBusiness size={21} />
        </div>

        <div>
          <h1 className="text-lg font-bold tracking-tight text-slate-900">
            Meru CRM
          </h1>
          <p className="text-xs text-slate-500">Lead Management</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
        Workspace
      </div>

      <nav className="flex-1 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              <Icon size={19} />
              {item.name}
            </NavLink>
          )
        })}
      </nav>

      {/* Bottom Links */}
      <div className="space-y-2 border-t border-slate-100 pt-5">
        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-600 transition-colors hover:bg-slate-50">
          <HelpCircle size={19} />
          Help & Support
        </button>

        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-600 transition-colors hover:bg-slate-50">
          <Settings size={19} />
          Settings
        </button>
      </div>
    </aside>
  )
}

export default Sidebar