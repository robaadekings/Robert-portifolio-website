import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import api from "@/api/axios"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, Save } from "lucide-react"

const EditProject = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: "",
    description: "",
    techStack: "",
    liveUrl: "",
    githubUrl: "",
  })
  const [currentImages, setCurrentImages] = useState([])

  useEffect(() => {
    fetchProject()
  }, [id])

  const fetchProject = async () => {
    try {
      const { data } = await api.get(`/projects/${id}`)
      setForm({
        title: data.title,
        description: data.description,
        techStack: data.techStack.join(", "),
        liveUrl: data.liveUrl || "",
        githubUrl: data.githubUrl || "",
      })
      setCurrentImages(data.images || [])
    } catch (error) {
      console.error("Error fetching project:", error)
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await api.put(`/projects/${id}`, form)
      toast({ 
        title: "Success!",
        description: "Project updated successfully!" 
      })
      navigate("/admin/projects")
    } catch (error) {
      toast({ 
        title: "Error",
        description: "Failed to update project",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-24 pb-16"
    >
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/admin/projects")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-3">
            Edit <span className="gradient-text">Project</span>
          </h1>
          <p className="text-muted-foreground">
            Update your project information
          </p>
        </motion.div>

        <Card className="border-2">
          <CardHeader>
            <h3 className="text-xl font-semibold">Project Information</h3>
          </CardHeader>
          <CardContent>
            <form onSubmit={submitHandler} className="space-y-6">
              {/* Current Images */}
              {currentImages.length > 0 && (
                <div>
                  <label className="text-sm font-medium mb-2 block">Current Images</label>
                  <div className="grid grid-cols-3 gap-4">
                    {currentImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Project image ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border-2"
                        />
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    To change images, please delete the project and create a new one
                  </p>
                </div>
              )}

              {/* Title */}
              <div>
                <label className="text-sm font-medium mb-2 block">Project Title *</label>
                <Input
                  placeholder="My Awesome Project"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                  className="border-2"
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-sm font-medium mb-2 block">Description *</label>
                <Textarea
                  placeholder="Describe your project in detail..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  required
                  rows={5}
                  className="border-2 resize-none"
                />
              </div>

              {/* Tech Stack */}
              <div>
                <label className="text-sm font-medium mb-2 block">Tech Stack *</label>
                <Input
                  placeholder="React, Node.js, MongoDB, Tailwind CSS (comma separated)"
                  value={form.techStack}
                  onChange={(e) => setForm({ ...form, techStack: e.target.value })}
                  required
                  className="border-2"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Separate technologies with commas
                </p>
              </div>

              {/* Links */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Live Demo Link</label>
                  <Input
                    placeholder="https://example.com"
                    value={form.liveUrl}
                    onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
                    className="border-2"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">GitHub Link</label>
                  <Input
                    placeholder="https://github.com/username/repo"
                    value={form.githubUrl}
                    onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                    className="border-2"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                  disabled={loading}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? "Updating..." : "Update Project"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/admin/projects")}
                  className="border-2"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </motion.section>
  )
}

export default EditProject
