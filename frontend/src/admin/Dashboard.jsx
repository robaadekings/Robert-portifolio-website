import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const Dashboard = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-24"
    >
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-10">Admin Dashboard</h1>

        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Projects</h2>
              <p className="text-muted-foreground mb-4">
                Add, edit and delete portfolio projects
              </p>
              <Link to="/admin/add-project">
                <Button className="w-full">Manage Projects</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Messages</h2>
              <p className="text-muted-foreground mb-4">
                View messages sent from contact form
              </p>
              <Link to="/admin/messages">
                <Button className="w-full" variant="secondary">
                  View Messages
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.section>
  )
}

export default Dashboard
