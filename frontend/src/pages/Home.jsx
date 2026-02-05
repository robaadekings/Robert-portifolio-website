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
      className="min-h-screen flex items-center justify-center px-5 pt-24 relative overflow-hidden"
    >
      {/* Background Effects (disabled on mobile) */}
      <div className="absolute inset-0 -z-10 hidden sm:block">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float delay-2000" />
      </div>

      <div className="max-w-6xl mx-auto w-full">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          
          {/* TEXT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-5 text-center lg:text-left"
          >
            <div className="flex justify-center lg:justify-start">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect border text-sm">
                <Sparkles className="w-4 h-4 text-primary" />
                Available for Freelance
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <AnimatedWords
                words={["Hi,", "I'm", "Robert", "Murungi"]}
                nameIndexes={[2, 3]}
              />
            </h1>

            <div className="space-y-1">
              <p className="text-xl sm:text-2xl font-semibold">
                Fullstack MERN Developer
              </p>
              <p className="text-lg sm:text-xl text-muted-foreground">
                & Graphic Designer
              </p>
            </div>

            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0">
              I craft beautiful, scalable web applications and create stunning
              visual designs that bring ideas to life.
            </p>
          </motion.div>

          {/* PROFILE IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center"
          >
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 p-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "conic-gradient(from 0deg, #00FFFF, #9D4EDD, #FF006E, #00FFFF)",
                  boxShadow: "0 0 40px rgba(0,255,255,0.6)",
                }}
              />

              <div className="relative w-full h-full rounded-full overflow-hidden z-10 shadow-2xl">
                <img
                  src={profileImage}
                  alt="Robert Murungi"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute -top-3 -right-3 text-xs px-3 py-1 rounded-full glass-effect border">
                🚀 Available
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA BUTTONS (mobile optimized) */}
        <div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center">
          <Button asChild size="lg" className="w-full sm:w-auto bg-gradient-to-r from-primary to-secondary">
            <Link to="/projects">
              View My Work
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

          <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
            <Link to="/contact">
              Get In Touch
              <Mail className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* SOCIAL LINKS – CLEAN MOBILE ROW */}
        <div className="flex justify-center gap-6 mt-8">
          {[Github, Linkedin, Mail].map((Icon, i) => (
            <a
              key={i}
              href={
                i === 0
                  ? "https://github.com/robaadekings"
                  : i === 1
                  ? "https://linkedin.com/in/robert-murangiri-40ab24392"
                  : "mailto:robertmurangiri63@gmail.com"
              }
              target={i !== 2 ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full border glass-effect flex items-center justify-center hover:scale-110 transition"
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </div>

        {/* SCROLL HINT */}
        <div className="text-center mt-14 text-sm text-muted-foreground">
          Scroll to explore ↓
        </div>
      </div>
    </motion.section>
  )
}

export default Home

function AnimatedWords({ words = [], nameIndexes = [] }) {
  return (
    <span className="inline-flex flex-wrap gap-2 justify-center lg:justify-start">
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
