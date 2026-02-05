import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import api from "@/api/axios"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { X, ExternalLink, Github, Calendar, ChevronLeft, ChevronRight } from "lucide-react"

const ProjectDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    api.get(`/projects/${id}`).then((res) => setProject(res.data))
  }, [id])

  const nextImage = () => {
    if (project?.images) {
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length)
    }
  }

  const prevImage = () => {
    if (project?.images) {
      setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length)
    }
  }

  if (!project) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
        onClick={() => navigate(-1)}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25 }}
          className="bg-background w-full max-w-5xl rounded-2xl shadow-2xl relative my-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <Button
            className="absolute top-4 right-4 z-10 rounded-full w-10 h-10 p-0 glass-effect border-2"
            variant="ghost"
            onClick={() => navigate(-1)}
          >
            <X className="w-5 h-5" />
          </Button>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 p-4 sm:p-6 lg:p-8">
            {/* Left Side - Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative group">
                <div className="relative h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden border-2 border-border">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImageIndex}
                      src={project.images[currentImageIndex]}
                      alt={`${project.title} - Image ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </AnimatePresence>

                  {/* Navigation Arrows */}
                  {project.images.length > 1 && (
                    <>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 rounded-full w-8 h-8 sm:w-10 sm:h-10 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={prevImage}
                      >
                        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 rounded-full w-8 h-8 sm:w-10 sm:h-10 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={nextImage}
                      >
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                      </Button>
                    </>
                  )}

                  {/* Image Counter */}
                  {project.images.length > 1 && (
                    <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 px-2 sm:px-3 py-1 rounded-full glass-effect border text-xs sm:text-sm font-medium">
                      {currentImageIndex + 1} / {project.images.length}
                    </div>
                  )}
                </div>
              </div>

              {/* Thumbnail Strip */}
              {project.images.length > 1 && (
                <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2">
                  {project.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-16 sm:w-24 h-12 sm:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        currentImageIndex === index
                          ? "border-primary ring-2 ring-primary/20"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Side - Details */}
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4">{project.title}</h1>

                {project.createdAt && (
                  <div className="flex items-center gap-3 sm:gap-4 text-muted-foreground mb-3 sm:mb-4 flex-wrap">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm sm:text-base">
                        Created: {new Date(project.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </span>
                    </div>
                    {project.featured && (
                      <div className="px-3 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/50">
                        <span className="text-xs sm:text-sm font-semibold text-yellow-500">⭐ Featured</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Description */}
              <Card className="border-2">
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Project Description</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {project.description || "No description provided"}
                  </p>
                </CardContent>
              </Card>

              {/* Tech Stack */}
              <Card className="border-2">
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack && project.techStack.length > 0 ? (
                      project.techStack.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-sm px-3 py-1">
                          {tech}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No technologies specified</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Links Section */}
              <Card className="border-2">
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Project Links</h3>
                  <div className="space-y-2 sm:space-y-3">
                    {project.liveUrl ? (
                      <div className="flex items-center justify-between p-2 sm:p-3 bg-muted rounded-lg">
                        <div className="truncate">
                          <p className="text-sm font-medium">Live Demo</p>
                          <p className="text-xs sm:text-sm text-muted-foreground truncate">{project.liveUrl}</p>
                        </div>
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="ml-2">
                          <Button size="sm" variant="secondary" className="gap-2">
                            <ExternalLink className="w-4 h-4" />
                            Visit
                          </Button>
                        </a>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No live demo URL</p>
                    )}

                    {project.githubUrl ? (
                      <div className="flex items-center justify-between p-2 sm:p-3 bg-muted rounded-lg">
                        <div className="truncate">
                          <p className="text-sm font-medium">GitHub Repository</p>
                          <p className="text-xs sm:text-sm text-muted-foreground truncate">{project.githubUrl}</p>
                        </div>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="ml-2">
                          <Button size="sm" variant="secondary" className="gap-2">
                            <Github className="w-4 h-4" />
                            View Code
                          </Button>
                        </a>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No GitHub URL</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-2 sm:pt-4">
                {project.liveUrl && (
                  <Button
                    asChild
                    className="flex-1 sm:flex-none bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                  >
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Live Demo
                    </a>
                  </Button>
                )}
                {project.githubUrl && (
                  <Button
                    asChild
                    variant="outline"
                    className="flex-1 sm:flex-none border-2"
                  >
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      View Code
                    </a>
                  </Button>
                )}
              </div>

              {/* Additional Info */}
              {(project.features || project.challenges) && (
                <div className="space-y-4">
                  {project.features && (
                    <Card className="border-2">
                      <CardContent className="p-4 sm:p-6">
                        <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Key Features</h3>
                        <ul className="space-y-1 sm:space-y-2 text-muted-foreground text-sm sm:text-base">
                          {project.features.map((feature, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ProjectDetails
