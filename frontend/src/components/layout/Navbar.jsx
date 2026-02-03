import { Link, useLocation, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/AuthContext"
import { Menu, X, LogOut, Lock } from "lucide-react"
import { useState } from "react"

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/services", label: "Services" },
    { path: "/projects", label: "Projects" },
  ]

  const isActive = (path) => location.pathname === path

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 w-full z-50 glass-effect border-b"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold gradient-text">
            Robert Murungi
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative transition-colors hover:text-primary ${
                  isActive(link.path) ? "text-primary font-semibold" : ""
                }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
            <Link to="/contact">
              <Button size="sm" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                Contact
              </Button>
            </Link>
            
            {/* Admin Login/Logout */}
            {user ? (
              <>
                <Link to="/admin">
                  <Button size="sm" variant="outline" className="gap-2">
                    <Lock className="w-4 h-4" />
                    Admin
                  </Button>
                </Link>
                <Button size="sm" variant="ghost" onClick={handleLogout} className="gap-2">
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button size="sm" variant="outline" className="gap-2">
                  <Lock className="w-4 h-4" />
                  Admin
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pb-4 space-y-4"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 transition-colors hover:text-primary ${
                  isActive(link.path) ? "text-primary font-semibold" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full bg-gradient-to-r from-primary to-secondary">
                Contact
              </Button>
            </Link>
            
            {/* Admin Login/Logout Mobile */}
            {user ? (
              <>
                <Link to="/admin" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full gap-2">
                    <Lock className="w-4 h-4" />
                    Admin Dashboard
                  </Button>
                </Link>
                <Button variant="ghost" className="w-full gap-2" onClick={() => {
                  handleLogout()
                  setMobileMenuOpen(false)
                }}>
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full gap-2">
                  <Lock className="w-4 h-4" />
                  Admin Login
                </Button>
              </Link>
            )}
            
            <div className="flex justify-center pt-2">
              <ThemeToggle />
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}

export default Navbar
