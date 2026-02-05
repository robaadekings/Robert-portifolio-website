import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowRight, Github, Linkedin, Mail, Download, Sparkles } from "lucide-react"
import profileImage from "@/assets/profile.jpg"

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
        <div className="hidden sm:block absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="hidden sm:block absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="hidden md:block absolute top-1/2 left-1/2 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "4s" }} />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="flex lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-start flex-col lg:items-center">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-6 text-center lg:text-left w-full"
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

            <motion.h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
              <AnimatedWords
                words={["Hi,", "I'm", "Robert", "Murungi"]}
                nameIndexes={[2, 3]}
              />
            </motion.h1>
            
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
          </motion.div>

          {/* Right Side - Profile Image (appears after text on mobile) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex justify-center lg:justify-end items-center w-full"
          >
            <div className="relative flex items-center justify-center w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-[28rem] xl:h-[28rem] p-3">
              {/* Main Animated Rotating Circle Border */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 left-0 right-0 bottom-0 rounded-full"
                style={{
                  background: "conic-gradient(from 0deg, #00FFFF 0%, #00FF88 14%, #00D4FF 28%, #0088FF 42%, #9D4EDD 56%, #FF006E 70%, #FF4500 84%, #FFEA00 100%)",
                  boxShadow: "0 0 50px rgba(0, 255, 255, 0.8), 0 0 100px rgba(157, 78, 221, 0.5), inset 0 0 30px rgba(255, 69, 0, 0.4)",
                }}
              />

              {/* Secondary Rotating Glow - Opposite Direction */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 left-0 right-0 bottom-0 rounded-full"
                style={{
                  background: "conic-gradient(from 0deg, #FFEA00 0%, #FF4500 16%, #FF006E 32%, #9D4EDD 48%, #0088FF 64%, #00D4FF 80%, #00FF88 100%)",
                  filter: "blur(15px)",
                  opacity: 0.6,
                  boxShadow: "0 0 40px rgba(255, 234, 0, 0.6), inset 0 0 30px rgba(0, 136, 255, 0.3)",
                }}
              />

              {/* Profile Image Container - Centered */}
              <motion.div
                whileHover={{ scale: 1.06 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="relative w-60 h-60 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full overflow-hidden shadow-2xl z-10 flex items-center justify-center"
                style={{
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  boxShadow: "0 0 30px rgba(0, 217, 255, 0.3), inset 0 0 20px rgba(0, 0, 0, 0.1)",
                }}
              >
                <img
                  src={profileImage}
                  alt="Robert Murungi"
                  className="w-full h-full object-cover object-center rounded-full"
                />
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

        {/* CTA Buttons - Below Profile Image on Mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap gap-4 justify-center pt-8 lg:hidden"
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
        >
          <a
            href="https://github.com/robaadekings"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl glass-effect border hover:border-primary hover:bg-primary/10 transition-all group"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5 group-hover:scale-110 transition-transform" />
          </a>
          <a
            href="https://linkedin.com/in/robert-murangiri-40ab24392"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl glass-effect border hover:border-primary hover:bg-primary/10 transition-all group"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5 group-hover:scale-110 transition-transform" />
          </a>
          <a
            href="mailto:robertmurangiri63@gmail.com"
            className="p-3 rounded-xl glass-effect border hover:border-primary hover:bg-primary/10 transition-all group"
            aria-label="Email"
          >
                <Mail className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </a>
        </motion.div>

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

function AnimatedWords({ words = [], nameIndexes = [] }) {
  // Each word will follow a gentle circular-like keyframe (x,y) path.
  // Staggered delays make words follow each other.
  return (
    <span className="inline-flex flex-wrap gap-2 items-center">
      {words.map((word, i) => {
        const isName = nameIndexes.includes(i)
        const delay = i * 0.12
        return (
          <motion.span
            key={i}
            className={`inline-block ${isName ? "gradient-text font-extrabold" : "text-foreground/95"}`}
            animate={{
              x: [0, 10, 20, 10, 0, -10, 0],
              y: [0, -6, 0, 6, 0, -6, 0],
            }}
            transition={{
              delay,
              duration: 3.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {word}
          </motion.span>
        )
      })}
    </span>
  )
}
