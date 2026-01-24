import { useState } from "react"
import api from "@/api/axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

const AddProject = () => {
  const { toast } = useToast()
  const [form, setForm] = useState({
    title: "",
    description: "",
    techStack: "",
    images: [],
  })

  const submitHandler = async (e) => {
    e.preventDefault()

    const data = new FormData()
    data.append("title", form.title)
    data.append("description", form.description)
    data.append("techStack", form.techStack)

    for (let img of form.images) {
      data.append("images", img)
    }

    await api.post("/projects", data)
    toast({ title: "Project added successfully!" })
  }

  return (
    <section className="min-h-screen pt-24">
      <div className="max-w-xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6">Add Project</h2>

        <form onSubmit={submitHandler} className="space-y-4">
          <Input
            placeholder="Project title"
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <Textarea
            placeholder="Description"
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
          <Input
            placeholder="Tech stack (comma separated)"
            onChange={(e) =>
              setForm({ ...form, techStack: e.target.value })
            }
          />
          <Input
            type="file"
            multiple
            onChange={(e) =>
              setForm({ ...form, images: e.target.files })
            }
          />

          <Button className="w-full">Save Project</Button>
        </form>
      </div>
    </section>
  )
}

export default AddProject
