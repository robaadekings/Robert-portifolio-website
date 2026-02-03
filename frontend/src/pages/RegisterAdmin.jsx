import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import api from "@/api/axios"
import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"
import { Shield, Mail, Lock, ArrowLeft } from "lucide-react"

const RegisterAdmin = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const { toast } = useToast()
  const [form, setForm] = useState({ name: "", email: "", password: "" })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post("/auth/register-admin", form)
      // login to set auth state
      await login(form.email, form.password)
      toast({ title: "Admin registered", description: "You are now signed in as admin" })
      navigate("/admin")
    } catch (err) {
      toast({ title: "Registration failed", description: err.response?.data?.message || err.message, variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen flex items-center justify-center px-6 pt-20 pb-16">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <Link to="/login" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </Link>
        </div>

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-4 pb-4 text-center">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Register Admin</h1>
              <p className="text-sm text-muted-foreground">Create the first administrator account</p>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Name</label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="h-11 mt-2" />
              </div>

              <div>
                <label className="text-sm font-medium">Email</label>
                <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className="h-11 mt-2" />
              </div>

              <div>
                <label className="text-sm font-medium">Password</label>
                <Input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required className="h-11 mt-2" />
              </div>

              <Button type="submit" className="w-full h-11" disabled={loading}>
                {loading ? "Registering..." : "Create Admin"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </motion.section>
  )
}

export default RegisterAdmin
