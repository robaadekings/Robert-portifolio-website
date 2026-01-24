import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import api from "@/api/axios"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Edit, 
  Trash2, 
  Plus, 
  ArrowLeft,
  ExternalLink,
  Github,
  Eye
} from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const ManageProjects = () => {
  const navigate = useNavigate()
  const [projects, setProjects] = useState([])

  const fetchProjects = async () => {
    try {
      const { data } = await api.get("/projects")
      setProjects(data)
    } catch (error) {
      console.error("Error fetching projects:", error)
    }
  }

  const deleteProject = async (id) => {
    try {
      await api.delete(`/projects/${id}`)
      fetchProjects()
    } catch (error) {
      console.error("Error deleting project:", error)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-24 pb-16"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/admin")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-3">
                Manage <span className="gradient-text">Projects</span>
              </h1>
              <p className="text-muted-foreground">
                Edit or delete your portfolio projects
              </p>
            </div>
            <Button
              asChild
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
            >
              <Link to="/admin/add-project">
                <Plus className="w-4 h-4 mr-2" />
                Add New Project
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Projects Grid */}
        {projects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="group border-2 hover:border-primary/50 transition-all overflow-hidden h-full flex flex-col">
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={project.images?.[0] || "/placeholder.png"}
                      alt={project.title}
                      className="h-48 w-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 flex gap-2">
                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Button
                            size="sm"
                            variant="secondary"
                            className="w-8 h-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </a>
                      )}
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Button
                            size="sm"
                            variant="secondary"
                            className="w-8 h-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Github className="w-4 h-4" />
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 line-clamp-1">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {project.description}
                      </p>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.techStack?.slice(0, 3).map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {project.techStack?.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{project.techStack.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-4 border-t">
                      <Link to={`/projects/${project._id}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full gap-2">
                          <Eye className="w-4 h-4" />
                          View
                        </Button>
                      </Link>
                      <Link to={`/admin/edit-project/${project._id}`} className="flex-1">
                        <Button size="sm" className="w-full gap-2">
                          <Edit className="w-4 h-4" />
                          Edit
                        </Button>
                      </Link>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm" className="px-3">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Project</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{project.title}"?
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteProject(project._id)}
                              className="bg-destructive hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <Card className="border-2">
            <CardContent className="p-16 text-center">
              <Plus className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No Projects Yet</h3>
              <p className="text-muted-foreground mb-6">
                Get started by adding your first project
              </p>
              <Button asChild className="bg-gradient-to-r from-primary to-secondary">
                <Link to="/admin/add-project">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Project
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </motion.section>
  )
}

export default ManageProjects
