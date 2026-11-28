import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  Settings,
  HelpCircle,
  Briefcase,
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

function Sidebar({ mobileMenuOpen, onNavigate }) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex h-screen w-64 shrink-0 flex-col border-r border-slate-200 bg-white px-5 py-6 transition-transform duration-300 lg:static lg:z-auto lg:translate-x-0 ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* Logo */}
      <div className="mb-10 flex items-center gap-3 px-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
          <Briefcase size={22} />
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-800">
            Meru Leads
          </h2>
          <p className="text-xs text-slate-500">
            Lead Management
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Workspace
        </p>

        {navigation.map((item) => {
          const Icon = item.icon

          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onNavigate}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              <Icon size={20} />
              {item.name}
            </NavLink>
          )
        })}
      </nav>

      {/* Bottom Links */}
      <div className="space-y-2 border-t border-slate-100 pt-5">
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
        >
          <HelpCircle size={20} />
          Help & Support
        </button>

        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
        >
          <Settings size={20} />
          Settings
        </button>
      </div>
    </aside>
  )
}

export default Sidebar