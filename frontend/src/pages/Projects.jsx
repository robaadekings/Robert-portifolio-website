import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import api from "@/api/axios"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const Projects = () => {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    api.get("/projects").then((res) => setProjects(res.data))
  }, [])

  return (
    <section className="min-h-screen pt-24">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-10">Projects</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <motion.div
              key={project._id}
              whileHover={{ scale: 1.03 }}
            >
              <Card>
                <CardHeader>
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="rounded-md h-48 w-full object-cover"
                  />
                </CardHeader>
                <CardContent>
                  <h3 className="text-xl font-semibold mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
