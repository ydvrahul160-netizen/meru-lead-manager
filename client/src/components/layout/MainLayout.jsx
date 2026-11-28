import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

function MainLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={closeMobileMenu}
          className="fixed inset-0 z-30 bg-slate-900/40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <Sidebar
        mobileMenuOpen={mobileMenuOpen}
        onNavigate={closeMobileMenu}
      />

      {/* Main Content */}
      <div className="min-w-0 flex-1">
        <Header onMenuClick={toggleMobileMenu} />

        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default MainLayout