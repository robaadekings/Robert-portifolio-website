import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"
import { Lock, Mail, Eye, EyeOff, ArrowLeft, Shield } from "lucide-react"

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const { toast } = useToast()
  const [form, setForm] = useState({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await login(form.email, form.password)
      toast({ 
        title: "Login successful!",
        description: "Welcome back to the admin panel"
      })
      navigate("/admin")
    } catch (error) {
      toast({
        title: "Login failed",
        description: error.response?.data?.message || "Invalid credentials",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex items-center justify-center px-6 pt-20 pb-16 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md">
        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-2 shadow-xl">
            <CardHeader className="space-y-4 pb-6">
              {/* Icon */}
              <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
              
              {/* Title */}
              <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold">
                  <span className="gradient-text">Admin Panel</span>
                </h1>
                <p className="text-muted-foreground">
                  Sign in to manage your portfolio
                </p>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email Field */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary" />
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@portfolio.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    className="border-2 h-11"
                  />
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium flex items-center gap-2">
                    <Lock className="w-4 h-4 text-primary" />
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      required
                      className="border-2 h-11 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full h-11 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Signing in...
                    </span>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>

              {/* Default Credentials Info */}
              <div className="pt-4 border-t">
                <div className="p-4 rounded-lg bg-muted/50 space-y-2">
                  <p className="text-sm font-medium flex items-center gap-2">
                    <Shield className="w-4 h-4 text-primary" />
                    Default Credentials:
                  </p>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p className="font-mono">Email: admin@portfolio.com</p>
                    <p className="font-mono">Password: admin123</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Please change these credentials after first login
                  </p>
                  <div className="mt-3 text-center">
                    <Link to="/register-admin" className="text-sm text-primary hover:underline">Register as Admin</Link>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center text-xs text-muted-foreground pt-2">
                <p>Protected area for site administrators only</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default Login
