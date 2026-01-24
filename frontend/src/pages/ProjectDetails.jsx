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
          className="bg-background max-w-5xl w-full rounded-2xl shadow-2xl relative my-8"
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

          <div className="grid lg:grid-cols-2 gap-8 p-8">
            {/* Left Side - Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative group">
                <div className="relative h-96 rounded-xl overflow-hidden border-2 border-border">
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
                        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full w-10 h-10 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={prevImage}
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full w-10 h-10 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={nextImage}
                      >
                        <ChevronRight className="w-5 h-5" />
                      </Button>
                    </>
                  )}

                  {/* Image Counter */}
                  {project.images.length > 1 && (
                    <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full glass-effect border text-sm font-medium">
                      {currentImageIndex + 1} / {project.images.length}
                    </div>
                  )}
                </div>
              </div>

              {/* Thumbnail Strip */}
              {project.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {project.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-24 h-20 rounded-lg overflow-hidden border-2 transition-all ${
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
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
                
                {project.createdAt && (
                  <div className="flex items-center gap-2 text-muted-foreground mb-4">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>

              {/* Description */}
              <Card className="border-2">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">About This Project</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </CardContent>
              </Card>

              {/* Tech Stack */}
              <Card className="border-2">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-sm px-3 py-1">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                {project.liveLink && (
                  <Button
                    asChild
                    className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                  >
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Live Demo
                    </a>
                  </Button>
                )}
                {project.githubLink && (
                  <Button
                    asChild
                    variant="outline"
                    className="flex-1 border-2"
                  >
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
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
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                        <ul className="space-y-2 text-muted-foreground">
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
