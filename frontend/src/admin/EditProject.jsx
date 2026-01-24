import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import api from "@/api/axios"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

const EditProject = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    title: "",
    description: "",
    techStack: "",
  })

  useEffect(() => {
    api.get(`/projects/${id}`).then(({ data }) => {
      setForm({
        title: data.title,
        description: data.description,
        techStack: data.techStack.join(", "),
      })
    })
  }, [id])

  const submitHandler = async (e) => {
    e.preventDefault()
    await api.put(`/projects/${id}`, form)
    navigate("/admin")
  }

  return (
    <section className="min-h-screen pt-24">
      <div className="max-w-xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6">Edit Project</h2>

        <form onSubmit={submitHandler} className="space-y-4">
          <Input
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />
          <Textarea
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
          <Input
            value={form.techStack}
            onChange={(e) =>
              setForm({ ...form, techStack: e.target.value })
            }
          />
          <Button className="w-full">Update Project</Button>
        </form>
      </div>
    </section>
  )
}

export default EditProject
