import { useState } from "react"
import api from "@/api/axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"

const Contact = () => {
  const { toast } = useToast()
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  })

  const submitHandler = async (e) => {
    e.preventDefault()
    await api.post("/messages", form)
    toast({ title: "Message sent successfully!" })
    setForm({ name: "", email: "", message: "" })
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-24"
    >
      <div className="max-w-xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-6">Contact Me</h2>

        <form onSubmit={submitHandler} className="space-y-4">
          <Input
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input
            placeholder="Your email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Textarea
            placeholder="Your message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
          <Button type="submit" className="w-full">
            Send Message
          </Button>
        </form>
      </div>
    </motion.section>
  )
}

export default Contact
