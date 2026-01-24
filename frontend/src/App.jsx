import { Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"

import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import ProtectedRoute from "@/components/ProtectedRoute"

// Pages
import Home from "@/pages/Home"
import About from "@/pages/About"
import Services from "@/pages/Services"
import Projects from "@/pages/Projects"
import ProjectDetails from "@/pages/ProjectDetails"
import Contact from "@/pages/Contact"
import Login from "@/pages/Login"

// Admin
import Dashboard from "@/admin/Dashboard"
import AddProject from "@/admin/AddProject"
import ManageProjects from "@/admin/ManageProject"
import EditProject from "@/admin/EditProject"
import Messages from "@/admin/Messages"

function App() {
  const location = useLocation()

  return (
    <>
      <Navbar />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />

          {/* Admin */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/add-project"
            element={
              <ProtectedRoute>
                <AddProject />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/projects"
            element={
              <ProtectedRoute>
                <ManageProjects />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/edit-project/:id"
            element={
              <ProtectedRoute>
                <EditProject />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/messages"
            element={
              <ProtectedRoute>
                <Messages />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AnimatePresence>

      <Footer />
    </>
  )
}

export default App
