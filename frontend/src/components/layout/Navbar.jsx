import { Link, useLocation, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/AuthContext"
import { Menu, X, LogOut, Shield, Home, FileText, Briefcase, Mail, ArrowRight } from "lucide-react"
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
      className="fixed top-0 w-full z-50 bg-gradient-to-b from-slate-950/98 via-slate-900/95 to-slate-900/80 backdrop-blur-2xl border-b border-slate-700/40 shadow-2xl"
    >
      <div className="w-full px-3 md:px-6 lg:px-8 py-3 md:py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo with enhanced styling - Responsive */}
          <Link to="/" className="flex items-center gap-2 md:gap-3 flex-shrink-0 group">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br from-indigo-500 via-cyan-500 to-emerald-400 rounded-full flex items-center justify-center shadow-lg transform transition hover:shadow-cyan-500/50"
            >
              <span className="text-white font-bold text-base md:text-xl">RM</span>
            </motion.div>
            <div className="hidden sm:flex flex-col gap-0.5">
              <span className="text-sm md:text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-cyan-300 to-emerald-300 group-hover:from-indigo-300 group-hover:to-cyan-300 transition-all">Robert Murungi</span>
              <span className="text-xs md:text-sm text-slate-400">Full Stack Developer</span>
            </div>
          </Link>

          {/* Desktop Navigation - Hidden on mobile and tablet */}
          <div className="hidden md:flex gap-2 items-center">
            {navLinks.map((link) => {
              const Icon = link.icon
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative group"
                >
                  <motion.div
                    whileHover={{ y: -2 }}
                    className={`px-4 py-2 rounded-xl transition-all duration-300 flex items-center gap-2 text-sm font-semibold ${
                      isActive(link.path)
                        ? "text-slate-900 bg-gradient-to-r from-blue-400 to-cyan-400 shadow-lg shadow-cyan-500/30"
                        : "text-slate-300 hover:text-white/95 hover:bg-slate-800/80"
                    }`}
                    style={{ backdropFilter: 'blur(8px)' }}
                  >
                    <Icon className="w-4 h-4" />
                    {link.label}
                  </motion.div>
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-0.5 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {!isActive(link.path) && (
                    <div className="absolute -bottom-0.5 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
                  )}
                </Link>
              )
            })}
          </div>

          {/* Right side - Contact, Theme, Admin - Responsive */}
          <div className="flex gap-2 md:gap-3 items-center">
            {/* Contact Button - Hidden on mobile */}
            <Link to="/contact" className="hidden md:block">
              <motion.div whileHover={{ x: 5 }}>
                <Button className="bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500 text-white border-0 shadow-lg hover:shadow-cyan-500/50 text-xs md:text-sm lg:text-base px-3 md:px-5 py-2 md:py-3">
                  <Mail className="w-3 h-3 md:w-4 md:h-4 mr-1.5 md:mr-2" />
                  <span className="hidden lg:inline">Contact</span>
                </Button>
              </motion.div>
            </Link>

            {/* Admin Area - Responsive */}
            {user ? (
              <div className="flex items-center gap-2 md:gap-3">
                <Link to="/admin" className="hidden md:block">
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Button size="sm" variant="outline" className="px-2 md:px-4 py-2 text-xs md:text-sm border-slate-600 hover:border-cyan-500 hover:bg-slate-800/50">
                      <Shield className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      <span className="ml-1.5 hidden lg:inline">Admin</span>
                    </Button>
                  </motion.div>
                </Link>

                {/* Avatar with hover effect */}
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className="w-9 h-9 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 overflow-hidden flex items-center justify-center shadow-lg"
                >
                  {user.profileImage ? (
                    <img src={user.profileImage} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xs md:text-sm font-bold text-white">{(user.name || "U").split(" ").map(n=>n[0]).slice(0,2).join("")}</span>
                  )}
                </motion.div>

                <motion.div whileHover={{ scale: 1.1 }}>
                  <Button size="sm" variant="ghost" onClick={handleLogout} className="px-2 text-slate-300 hover:text-white hover:bg-slate-800/50">
                    <LogOut className="w-4 h-4" />
                  </Button>
                </motion.div>
              </div>
            ) : (
              <Link to="/login" className="hidden md:block">
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button className="px-3 md:px-4 py-2 text-xs md:text-sm bg-gradient-to-r from-slate-700 to-slate-600 text-white border-0 hover:from-slate-600 hover:to-slate-500">
                    <Shield className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    <span className="ml-1.5 hidden lg:inline">Admin</span>
                  </Button>
                </motion.div>
              </Link>
            )}

            {/* Theme Toggle */}
            <div className="scale-75 md:scale-100 origin-right">
              <ThemeToggle />
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="md:hidden p-2 md:p-2.5 text-slate-300 hover:text-white transition-colors rounded-lg hover:bg-slate-800/50"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile & Tablet Navigation - Full Width */}
        <motion.div
          initial={false}
          animate={{ height: mobileMenuOpen ? "auto" : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="md:hidden overflow-hidden"
        >
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="mt-4 pb-4 space-y-2 border-t border-slate-700/50 pt-4"
            >
              {/* Nav Links */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {navLinks.map((link, idx) => {
                  const Icon = link.icon
                  return (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <Link
                        to={link.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block py-3 px-3 rounded-xl transition-all duration-300 flex flex-col items-center gap-1.5 text-xs md:text-sm font-medium ${
                          isActive(link.path) 
                            ? "bg-gradient-to-br from-blue-500/30 to-cyan-500/30 text-white border border-cyan-500/50 shadow-lg shadow-cyan-500/20" 
                            : "text-slate-300 hover:text-white hover:bg-slate-800/60 border border-slate-700/30"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{link.label}</span>
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
              
              {/* Contact Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="w-full">
                  <Button className="w-full bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500 text-white border-0 py-3 text-sm font-semibold shadow-lg hover:shadow-cyan-500/50 flex items-center justify-center gap-2">
                    <Mail className="w-4 h-4" />
                    Contact Me
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </motion.div>
              
              {/* Admin Mobile Section */}
              {user ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="space-y-2 pt-3 border-t border-slate-700/50"
                >
                  <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="w-full">
                    <Button variant="outline" className="w-full gap-2 border-slate-600 text-slate-200 hover:bg-slate-800/50 py-3 text-sm font-medium">
                      <Shield className="w-4 h-4" />
                      Admin Dashboard
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    className="w-full gap-2 text-slate-300 hover:text-white hover:bg-slate-800/50 py-3 text-sm font-medium"
                    onClick={() => handleLogout()}
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="w-full">
                    <Button variant="outline" className="w-full gap-2 border-slate-600 text-slate-200 hover:bg-slate-800/50 py-3 text-sm font-medium">
                      <Shield className="w-4 h-4" />
                      Admin Login
                    </Button>
                  </Link>
                </motion.div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.nav>
  )
}

export default Navbar
