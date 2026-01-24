import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "@/api/axios"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Mail, 
  User, 
  Calendar, 
  ArrowLeft,
  Trash2,
  ExternalLink
} from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const Messages = () => {
  const navigate = useNavigate()
  const [messages, setMessages] = useState([])
  const [selectedMessage, setSelectedMessage] = useState(null)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const { data } = await api.get("/messages")
      setMessages(data)
    } catch (error) {
      console.error("Error fetching messages:", error)
    }
  }

  const deleteMessage = async (id) => {
    try {
      await api.delete(`/messages/${id}`)
      fetchMessages()
    } catch (error) {
      console.error("Error deleting message:", error)
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-24 pb-16"
    >
      <div className="max-w-7xl mx-auto px-6">
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-3">
                <span className="gradient-text">Messages</span>
              </h1>
              <p className="text-muted-foreground">
                View and manage contact form submissions
              </p>
            </div>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {messages.length} Total
            </Badge>
          </div>
        </motion.div>

        {/* Messages Grid */}
        {messages.length > 0 ? (
          <div className="grid lg:grid-cols-2 gap-6">
            {messages.map((message, index) => (
              <motion.div
                key={message._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="border-2 hover:border-primary/50 transition-all group">
                  <CardContent className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-lg">{message.name}</div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            {new Date(message.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </div>
                        </div>
                      </div>
                      
                      {/* Delete Button */}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Message</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this message from {message.name}?
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteMessage(message._id)}
                              className="bg-destructive hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>

                    {/* Email */}
                    <div className="flex items-center gap-2 mb-4 p-3 rounded-lg bg-accent/50">
                      <Mail className="w-4 h-4 text-primary" />
                      <a
                        href={`mailto:${message.email}`}
                        className="text-sm hover:underline"
                      >
                        {message.email}
                      </a>
                      <ExternalLink className="w-3 h-3 ml-auto text-muted-foreground" />
                    </div>

                    {/* Message */}
                    <div className="p-4 rounded-lg bg-muted/50 border">
                      <p className="text-sm text-muted-foreground mb-1 font-medium">
                        Message:
                      </p>
                      <p className="text-sm leading-relaxed">
                        {message.message}
                      </p>
                    </div>

                    {/* Reply Button */}
                    <div className="mt-4 pt-4 border-t">
                      <Button
                        asChild
                        variant="outline"
                        className="w-full border-2"
                      >
                        <a href={`mailto:${message.email}?subject=Re: Your message`}>
                          <Mail className="w-4 h-4 mr-2" />
                          Reply via Email
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <Card className="border-2">
            <CardContent className="p-16 text-center">
              <Mail className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No Messages Yet</h3>
              <p className="text-muted-foreground">
                Messages from your contact form will appear here
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </motion.section>
  )
}

export default Messages
