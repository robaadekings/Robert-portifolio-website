import { useState } from "react"
import api from "@/api/axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send, Linkedin, Github } from "lucide-react"

const Contact = () => {
  const { toast } = useToast()
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)

  const submitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post("/messages", form)
      toast({ 
        title: "Message sent successfully!",
        description: "I'll get back to you as soon as possible."
      })
      setForm({ name: "", email: "", message: "" })
    } catch (error) {
      toast({ 
        title: "Error sending message",
        description: "Please try again later.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "your.email@example.com",
      href: "mailto:your.email@example.com",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+123 456 7890",
      href: "tel:+1234567890",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Your City, Country",
      href: "#",
      color: "from-green-500 to-emerald-500"
    }
  ]

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen pt-24 pb-16"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Get In <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Have a project in mind? Let's work together to create something amazing!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-bold mb-4">Let's Talk</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                I'm always open to discussing new projects, creative ideas, or opportunities 
                to be part of your vision. Feel free to reach out through any of the channels below.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => {
                const Icon = info.icon
                return (
                  <motion.div
                    key={info.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <a
                      href={info.href}
                      className="block"
                      target={info.href.startsWith("http") ? "_blank" : undefined}
                      rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      <Card className="border-2 hover:border-primary/50 transition-all group">
                        <CardContent className="p-6 flex items-center gap-4">
                          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${info.color} p-3 group-hover:scale-110 transition-transform`}>
                            <Icon className="w-full h-full text-white" />
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground mb-1">{info.label}</div>
                            <div className="font-semibold">{info.value}</div>
                          </div>
                        </CardContent>
                      </Card>
                    </a>
                  </motion.div>
                )
              })}
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-xl font-bold mb-4">Connect With Me</h3>
              <div className="flex gap-4">
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl glass-effect border-2 hover:border-primary hover:bg-primary/10 transition-all group"
                >
                  <Github className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="https://linkedin.com/in/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl glass-effect border-2 hover:border-primary hover:bg-primary/10 transition-all group"
                >
                  <Linkedin className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="mailto:your.email@example.com"
                  className="p-4 rounded-xl glass-effect border-2 hover:border-primary hover:bg-primary/10 transition-all group"
                >
                  <Mail className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="border-2">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">Send Me a Message</h3>
                <form onSubmit={submitHandler} className="space-y-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Your Name</label>
                    <Input
                      placeholder="John Doe"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                      className="border-2"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Your Email</label>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                      className="border-2"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Your Message</label>
                    <Textarea
                      placeholder="Tell me about your project..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      required
                      rows={6}
                      className="border-2 resize-none"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 group"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send Message"}
                    <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

export default Contact
