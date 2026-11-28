import {
  Menu,
  Search,
  Bell,
  LogOut,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function Header({ onMenuClick }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  const userName = user?.name || user?.fullName || 'User'
  const userEmail = user?.email || 'user@example.com'

  const initials = userName
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:h-20 sm:px-6 lg:px-8">

      {/* Left Section */}
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Toggle navigation menu"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 lg:hidden"
        >
          <Menu size={22} />
        </button>

        <div className="min-w-0">
          <h1 className="truncate text-lg font-bold text-slate-800 sm:text-xl">
            Dashboard
          </h1>
          <p className="hidden text-xs text-slate-500 sm:block">
            Welcome back! Here's what's happening today.
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex shrink-0 items-center gap-2 sm:gap-4">

        {/* Search */}
        <div className="relative hidden lg:block">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search..."
            className="w-56 rounded-lg border border-slate-200 py-2 pl-10 pr-4 text-sm outline-none focus:border-blue-500"
          />
        </div>

        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          className="hidden h-10 w-10 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 sm:flex"
        >
          <Bell size={20} />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-2 border-l border-slate-200 pl-3 sm:gap-3 sm:pl-5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
            {initials}
          </div>

          <div className="hidden md:block">
            <p className="text-sm font-semibold text-slate-800">
              {userName}
            </p>
            <p className="text-xs text-slate-500">
              {userEmail}
            </p>
          </div>
        </div>

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          aria-label="Logout"
          title="Logout"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600"
        >
          <LogOut size={19} />
        </button>
      </div>
    </header>
  )
}

export default Header