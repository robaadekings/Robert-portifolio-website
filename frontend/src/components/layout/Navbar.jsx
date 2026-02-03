import { Link, useLocation, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/AuthContext"
import { Menu, X, LogOut, Shield, Home, FileText, Briefcase, Mail } from "lucide-react"
import { useState } from "react"
import ThemeToggle from "@/components/ThemeToggle"

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { path: "/", label: "Home", icon: Home },
    { path: "/about", label: "About", icon: FileText },
    { path: "/services", label: "Services", icon: Briefcase },
    { path: "/projects", label: "Projects", icon: Briefcase },
  ]

  const isActive = (path) => location.pathname === path

  const handleLogout = () => {
    logout()
    navigate("/")
    setMobileMenuOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 w-full z-50 bg-gradient-to-b from-slate-950/95 to-slate-900/80 backdrop-blur-xl border-b border-slate-800/50"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo with enhanced styling */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-md transition-transform hover:scale-105">
              <span className="text-white font-semibold">RM</span>
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-sm font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">Robert Murungi</span>
              <span className="text-xs text-slate-300">Developer & Designer</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex gap-4 items-center">
            {navLinks.map((link) => {
              const Icon = link.icon
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative group"
                >
                  <div
                    className={`px-3 py-2 rounded-md transition-colors duration-200 flex items-center gap-2 text-sm ${
                      isActive(link.path)
                        ? "text-slate-900 bg-slate-50"
                        : "text-slate-300 hover:text-slate-100 hover:bg-slate-800"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {link.label}
                  </div>
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {!isActive(link.path) && (
                    <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                  )}
                </Link>
              )
            })}
          </div>

          {/* Right side - Contact, Theme, Admin */}
          <div className="flex gap-3 items-center">
            {/* Contact Button */}
            <Link to="/contact" className="hidden sm:block">
              <Button size="sm" className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0 shadow-sm hover:opacity-95">
                <Mail className="w-4 h-4 mr-2" />
                Contact
              </Button>
            </Link>

            {/* Admin Area */}
            {user ? (
              <div className="flex items-center gap-3">
                <Link to="/admin">
                  <Button size="sm" variant="outline" className="px-3 py-1 text-sm">
                    <Shield className="w-4 h-4" />
                    <span className="ml-1 hidden sm:inline">Admin</span>
                  </Button>
                </Link>

                {/* Avatar if profileImage exists, else initials */}
                <div className="w-8 h-8 rounded-full bg-slate-700 overflow-hidden flex items-center justify-center">
                  {user.profileImage ? (
                    <img src={user.profileImage} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-sm text-slate-100">{(user.name || "U").split(" ").map(n=>n[0]).slice(0,2).join("")}</span>
                  )}
                </div>

                <Button size="sm" variant="ghost" onClick={handleLogout} className="px-2">
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button size="sm" className="px-3 py-1 text-sm bg-slate-800 text-white">
                  <Shield className="w-4 h-4" />
                  <span className="ml-1 hidden sm:inline">Admin</span>
                </Button>
              </Link>
            )}

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-slate-300 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden mt-6 pb-6 space-y-3 border-t border-slate-800/50 pt-4"
          >
            {navLinks.map((link) => {
              const Icon = link.icon
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-3 px-4 rounded-lg transition-all duration-300 flex items-center gap-3 ${
                    isActive(link.path) 
                      ? "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-white border border-blue-500/50" 
                      : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              )
            })}
            
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0">
                <Mail className="w-4 h-4 mr-2" />
                Contact
              </Button>
            </Link>
            
            {/* Admin Mobile */}
            {user ? (
              <div className="space-y-2 pt-2 border-t border-slate-800/50">
                <Link to="/admin" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full gap-2 border-slate-700 text-slate-200">
                    <Shield className="w-4 h-4" />
                    Admin Dashboard
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  className="w-full gap-2 text-slate-300 hover:text-white"
                  onClick={() => handleLogout()}
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full gap-2 border-slate-700 text-slate-200">
                  <Shield className="w-4 h-4" />
                  Admin Login
                </Button>
              </Link>
            )}
            
            <div className="flex justify-center pt-2 border-t border-slate-800/50">
              <ThemeToggle />
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}

export default Navbar
