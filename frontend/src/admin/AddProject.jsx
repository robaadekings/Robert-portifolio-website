import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "@/api/axios"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, Upload, Save } from "lucide-react"

const AddProject = () => {
  const { toast } = useToast()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: "",
    description: "",
    techStack: "",
    liveUrl: "",
    githubUrl: "",
    images: [],
  })
  const [previewImages, setPreviewImages] = useState([])

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    setForm({ ...form, images: files })
    
    // Create preview URLs
    const previews = files.map(file => URL.createObjectURL(file))
    setPreviewImages(previews)
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const data = new FormData()
      data.append("title", form.title)
      data.append("description", form.description)
      data.append("techStack", form.techStack)
      data.append("liveUrl", form.liveUrl)
      data.append("githubUrl", form.githubUrl)

      for (let img of form.images) {
        data.append("images", img)
      }

      await api.post("/projects", data)
      toast({ 
        title: "Success!",
        description: "Project added successfully!" 
      })
      navigate("/admin/projects")
    } catch (error) {
      toast({ 
        title: "Error",
        description: "Failed to add project",
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
          <h1 className="text-4xl font-bold mb-3">
            Add New <span className="gradient-text">Project</span>
          </h1>
          <p className="text-muted-foreground">
            Fill in the details to add a new project to your portfolio
          </p>
        </motion.div>

        <Card className="border-2">
          <CardHeader>
            <h3 className="text-xl font-semibold">Project Information</h3>
          </CardHeader>
          <CardContent>
            <form onSubmit={submitHandler} className="space-y-6">
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

              {/* Images */}
              <div>
                <label className="text-sm font-medium mb-2 block">Project Images *</label>
                <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <Input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer text-sm text-muted-foreground"
                  >
                    Click to upload or drag and drop
                    <br />
                    <span className="text-xs">PNG, JPG, GIF up to 10MB (multiple files allowed)</span>
                  </label>
                </div>

                {/* Image Previews */}
                {previewImages.length > 0 && (
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    {previewImages.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border-2"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                          <span className="text-white text-sm">Image {index + 1}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                  disabled={loading}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? "Saving..." : "Save Project"}
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

export default AddProject
