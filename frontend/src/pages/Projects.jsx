import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import api from "@/api/axios"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Eye } from "lucide-react"

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    api.get("/projects").then((res) => setProjects(res.data))
  }, [])

  const categories = ["all", ...new Set(projects.flatMap(p => p.techStack))]
  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(p => p.techStack.includes(filter))

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen pt-20 pb-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-10 sm:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            My <span className="gradient-text">Projects</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
            A showcase of my recent work and creative projects
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ y: 0, scale: 1.02 }}
            >
              <Card className="h-full group border-2 hover:border-primary/50 transition-all overflow-hidden">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden">
                    <img
                      src={project.images?.[0] || "/placeholder.png"}
                      alt={project.title}
                      className="h-44 sm:h-56 md:h-64 w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col sm:flex-row items-center justify-center sm:justify-end gap-2 p-2 sm:p-4">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Button size="sm" variant="secondary" className="gap-2 w-full sm:w-auto">
                            <ExternalLink className="w-4 h-4" />
                            Live Demo
                          </Button>
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Button size="sm" variant="secondary" className="gap-2 w-full sm:w-auto">
                            <Github className="w-4 h-4" />
                            Code
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                    {project.techStack?.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs sm:text-sm">
                        {tech}
                      </Badge>
                    ))}
                    {project.techStack?.length > 3 && (
                      <Badge variant="outline" className="text-xs sm:text-sm">
                        +{project.techStack.length - 3} more
                      </Badge>
                    )}
                  </div>
                  <Link to={`/projects/${project._id}`}>
                    <Button variant="ghost" className="w-full group/btn">
                      View Details
                      <Eye className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 sm:py-20"
          >
            <p className="text-xl sm:text-2xl text-muted-foreground">No projects found</p>
            <p className="text-sm sm:text-base text-muted-foreground mt-2">Try selecting a different filter</p>
          </motion.div>
        )}
      </div>
    </motion.section>
  )
}

export default Projects
