import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import api from "@/api/axios"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const ProjectDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)

  useEffect(() => {
    api.get(`/projects/${id}`).then((res) => setProject(res.data))
  }, [id])

  if (!project) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center"
    >
      <div className="bg-background max-w-3xl w-full p-6 rounded-lg relative">
        <Button
          className="absolute top-4 right-4"
          variant="ghost"
          onClick={() => navigate(-1)}
        >
          ✕
        </Button>

        <img
          src={project.images[0]}
          className="w-full h-64 object-cover rounded mb-4"
        />

        <h2 className="text-3xl font-bold mb-2">{project.title}</h2>
        <p className="text-muted-foreground mb-4">
          {project.description}
        </p>

        <div className="flex gap-2 flex-wrap">
          {project.techStack.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectDetails
