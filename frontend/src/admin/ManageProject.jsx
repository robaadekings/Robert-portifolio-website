import { useEffect, useState } from "react"
import api from "@/api/axios"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Link } from "react-router-dom"

const ManageProjects = () => {
  const [projects, setProjects] = useState([])

  const fetchProjects = async () => {
    const { data } = await api.get("/projects")
    setProjects(data)
  }

  const deleteProject = async (id) => {
    await api.delete(`/projects/${id}`)
    fetchProjects()
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  return (
    <section className="min-h-screen pt-24">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6">Manage Projects</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project._id}>
              <CardContent className="p-4 space-y-3">
                <img
                  src={project.images[0]}
                  className="h-40 w-full object-cover rounded"
                />

                <h3 className="font-semibold">{project.title}</h3>

                <div className="flex gap-2">
                  <Link to={`/admin/edit-project/${project._id}`}>
                    <Button size="sm">Edit</Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteProject(project._id)}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ManageProjects
