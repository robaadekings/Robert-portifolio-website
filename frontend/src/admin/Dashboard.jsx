import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import api from "@/api/axios"
import { 
  FolderOpen, 
  Mail, 
  Plus, 
  Edit, 
  TrendingUp, 
  Eye,
  BarChart3,
  Activity
} from "lucide-react"

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalMessages: 0,
    recentProjects: 0
  })
  const [recentProjects, setRecentProjects] = useState([])
  const [recentMessages, setRecentMessages] = useState([])

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [projectsRes, messagesRes] = await Promise.all([
        api.get("/projects"),
        api.get("/messages")
      ])
      
      setStats({
        totalProjects: projectsRes.data.length,
        totalMessages: messagesRes.data.length,
        recentProjects: projectsRes.data.slice(-5).length
      })
      
      setRecentProjects(projectsRes.data.slice(-3).reverse())
      setRecentMessages(messagesRes.data.slice(-3).reverse())
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    }
  }

  const statCards = [
    {
      icon: FolderOpen,
      label: "Total Projects",
      value: stats.totalProjects,
      color: "from-blue-500 to-cyan-500",
      change: "+3 this month"
    },
    {
      icon: Mail,
      label: "Total Messages",
      value: stats.totalMessages,
      color: "from-purple-500 to-pink-500",
      change: `${stats.totalMessages} unread`
    },
    {
      icon: Activity,
      label: "Recent Projects",
      value: stats.recentProjects,
      color: "from-green-500 to-emerald-500",
      change: "Last 5 added"
    },
    {
      icon: TrendingUp,
      label: "Portfolio Views",
      value: "1.2k",
      color: "from-orange-500 to-red-500",
      change: "+12% this week"
    }
  ]

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen pt-24 pb-16"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Admin <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Welcome back! Here's an overview of your portfolio
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
        >
          {statCards.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.03 }}
              >
                <Card className="border-2 hover:border-primary/50 transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} p-2.5`}>
                        <Icon className="w-full h-full text-white" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground mb-2">{stat.label}</div>
                    <div className="text-xs text-primary font-medium">{stat.change}</div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
        >
          <Card className="border-2 hover:border-primary/50 transition-all group cursor-pointer">
            <Link to="/admin/add-project">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Plus className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-lg">Add Project</div>
                  <div className="text-sm text-muted-foreground">Create new</div>
                </div>
              </CardContent>
            </Link>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-all group cursor-pointer">
            <Link to="/admin/projects">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Edit className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-lg">Manage Projects</div>
                  <div className="text-sm text-muted-foreground">Edit or delete</div>
                </div>
              </CardContent>
            </Link>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-all group cursor-pointer">
            <Link to="/admin/messages">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-lg">View Messages</div>
                  <div className="text-sm text-muted-foreground">Check inbox</div>
                </div>
              </CardContent>
            </Link>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-all group cursor-pointer">
            <Link to="/projects">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Eye className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-lg">View Portfolio</div>
                  <div className="text-sm text-muted-foreground">Public view</div>
                </div>
              </CardContent>
            </Link>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Projects */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="border-2">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <FolderOpen className="w-5 h-5 text-primary" />
                    Recent Projects
                  </h3>
                  <Link to="/admin/projects">
                    <Button variant="ghost" size="sm">View All</Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentProjects.length > 0 ? (
                    recentProjects.map((project) => (
                      <div
                        key={project._id}
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent/50 transition-colors"
                      >
                        <img
                          src={project.images?.[0] || "/placeholder.png"}
                          alt={project.title}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold truncate">{project.title}</div>
                          <div className="text-sm text-muted-foreground truncate">
                            {project.techStack?.slice(0, 2).join(", ")}
                          </div>
                        </div>
                        <Link to={`/admin/edit-project/${project._id}`}>
                          <Button variant="ghost" size="sm">Edit</Button>
                        </Link>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-center py-8">No projects yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Messages */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="border-2">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Mail className="w-5 h-5 text-primary" />
                    Recent Messages
                  </h3>
                  <Link to="/admin/messages">
                    <Button variant="ghost" size="sm">View All</Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentMessages.length > 0 ? (
                    recentMessages.map((message) => (
                      <div
                        key={message._id}
                        className="p-4 rounded-lg border hover:border-primary/50 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="font-semibold">{message.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(message.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground mb-2">{message.email}</div>
                        <div className="text-sm line-clamp-2">{message.message}</div>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-center py-8">No messages yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

export default Dashboard
