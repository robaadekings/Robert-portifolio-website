import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowRight, Github, Linkedin, Mail, Sparkles } from "lucide-react"
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
        <div
          className="hidden sm:block absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="hidden md:block absolute top-1/2 left-1/2 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="max-w-6xl mx-auto w-full">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10 lg:gap-12 items-start lg:items-center">
          
          {/* RIGHT SIDE – PROFILE IMAGE (FIRST ON MOBILE) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex justify-center lg:justify-end items-center w-full order-1 lg:order-2"
          >
            <div className="relative flex items-center justify-center w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-[28rem] xl:h-[28rem] p-3">
              
              {/* Main Animated Rotating Circle Border */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "conic-gradient(from 0deg, #00FFFF 0%, #00FF88 14%, #00D4FF 28%, #0088FF 42%, #9D4EDD 56%, #FF006E 70%, #FF4500 84%, #FFEA00 100%)",
                  boxShadow:
                    "0 0 50px rgba(0, 255, 255, 0.8), 0 0 100px rgba(157, 78, 221, 0.5), inset 0 0 30px rgba(255, 69, 0, 0.4)",
                }}
              />

              {/* Secondary Rotating Glow */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "conic-gradient(from 0deg, #FFEA00 0%, #FF4500 16%, #FF006E 32%, #9D4EDD 48%, #0088FF 64%, #00D4FF 80%, #00FF88 100%)",
                  filter: "blur(15px)",
                  opacity: 0.6,
                }}
              />

              {/* Profile Image */}
              <motion.div
                whileHover={{ scale: 1.06 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="relative w-60 h-60 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full overflow-hidden shadow-2xl z-10"
              >
                <img
                  src={profileImage}
                  alt="Robert Murungi"
                  className="w-full h-full object-cover rounded-full"
                />
              </motion.div>

              {/* Floating Badges */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 px-4 py-2 rounded-xl glass-effect border shadow-lg"
              >
                🚀 Available
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-4 -left-4 px-4 py-2 rounded-xl glass-effect border shadow-lg"
              >
                ⚡ Fast Delivery
              </motion.div>
            </div>
          </motion.div>

          {/* LEFT SIDE – TEXT CONTENT (SECOND ON MOBILE) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-6 text-center lg:text-left w-full order-2 lg:order-1"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect border mx-auto lg:mx-0"
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

            <div className="space-y-2">
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
        </div>

        {/* CTA Buttons – Mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center pt-10 lg:hidden"
        >
          <Button asChild size="lg" className="bg-gradient-to-r from-primary to-secondary w-full sm:w-auto">
            <Link to="/projects">
              View My Work
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
            <Link to="/contact">
              Get In Touch
              <Mail className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center gap-6 mt-8"
        >
          <a href="https://github.com/robaadekings" target="_blank" rel="noopener noreferrer">
            <Github />
          </a>
          <a href="https://linkedin.com/in/robert-murangiri-40ab24392" target="_blank" rel="noopener noreferrer">
            <Linkedin />
          </a>
          <a href="mailto:robertmurangiri63@gmail.com">
            <Mail />
          </a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-16"
        >
          <p className="text-sm text-muted-foreground">Scroll to explore</p>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default Home

function AnimatedWords({ words = [], nameIndexes = [] }) {
  return (
    <span className="inline-flex flex-wrap gap-2 items-center justify-center lg:justify-start">
      {words.map((word, i) => (
        <motion.span
          key={i}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.12 }}
          className={nameIndexes.includes(i) ? "gradient-text font-extrabold" : ""}
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}
