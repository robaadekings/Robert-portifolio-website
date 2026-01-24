import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowRight, Github, Linkedin, Mail, Download, Sparkles } from "lucide-react"

const Home = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex items-center justify-center px-6 pt-20 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "4s" }} />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-6 text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect border"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Available for Freelance</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
              Hi, I'm{" "}
              <span className="gradient-text">
                Robert Murungi
              </span>
            </h1>
            
            <div className="space-y-3">
              <p className="text-2xl md:text-3xl font-semibold text-foreground/90">
                Fullstack MERN Developer
              </p>
              <p className="text-xl md:text-2xl font-semibold text-foreground/80">
                & Graphic Designer
              </p>
            </div>

            <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
              I craft beautiful, scalable web applications and create stunning
              visual designs that bring ideas to life. Let's build something amazing together.
            </p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4"
            >
              <Button asChild size="lg" className="group bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-lg">
                <Link to="/projects">
                  View My Work
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="group border-2">
                <Link to="/contact">
                  Get In Touch
                  <Mail className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex gap-4 justify-center lg:justify-start pt-4"
            >
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl glass-effect border hover:border-primary hover:bg-primary/10 transition-all group"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl glass-effect border hover:border-primary hover:bg-primary/10 transition-all group"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="mailto:your.email@example.com"
                className="p-3 rounded-xl glass-effect border hover:border-primary hover:bg-primary/10 transition-all group"
                aria-label="Email"
              >
                <Mail className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </a>
            </motion.div>
          </motion.div>

          {/* Right Side - Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Animated Glow Ring */}
              <motion.div
                animate={{
                  rotate: 360,
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-accent to-secondary blur-2xl opacity-50"
              />
              
              {/* Inner Rotating Border */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-accent to-secondary p-1"
              >
                <div className="w-full h-full rounded-full bg-background" />
              </motion.div>

              {/* Profile Image Container */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-background shadow-2xl"
              >
                {/* Placeholder - Replace with your actual profile image */}
                <div className="w-full h-full bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white text-6xl font-bold">
                      R
                    </div>
                    <p className="text-sm text-muted-foreground">Add your profile image</p>
                    <p className="text-xs text-muted-foreground mt-1">Replace in Home.jsx</p>
                  </div>
                </div>
                {/* Uncomment and use this when you add your image:
                <img
                  src="/path-to-your-profile-image.jpg"
                  alt="Robert Murungi"
                  className="w-full h-full object-cover"
                />
                */}
              </motion.div>

              {/* Floating Badges */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 px-4 py-2 rounded-xl glass-effect border shadow-lg"
              >
                <span className="text-sm font-semibold">🚀 Available</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-4 -left-4 px-4 py-2 rounded-xl glass-effect border shadow-lg"
              >
                <span className="text-sm font-semibold">⚡ Fast Delivery</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-center mt-16"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex flex-col items-center gap-2 text-muted-foreground"
          >
            <p className="text-sm">Scroll to explore</p>
            <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2">
              <motion.div
                animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-3 bg-muted-foreground/50 rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default Home
