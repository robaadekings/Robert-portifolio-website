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
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="hidden sm:block absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="hidden sm:block absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="hidden md:block absolute top-1/2 left-1/2 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "4s" }} />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="flex lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-start flex-col lg:items-center">
          
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-6 text-center lg:text-left w-full"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect border">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Available for Freelance</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <AnimatedWords
                words={["Hi,", "I'm", "Robert", "Murungi"]}
                nameIndexes={[2, 3]}
              />
            </h1>

            <p className="text-2xl font-semibold">Fullstack MERN Developer</p>
            <p className="text-xl font-semibold text-muted-foreground">& Graphic Designer</p>

            <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0">
              I craft beautiful, scalable web applications and stunning visual designs.
            </p>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center w-full"
          >
            <div className="relative w-80 h-80 rounded-full overflow-hidden shadow-2xl">
              <img
                src={profileImage}
                alt="Robert Murungi"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>

        {/* MOBILE CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap gap-4 justify-center pt-8 lg:hidden"
        >
          <Button asChild size="lg">
            <Link to="/projects">
              View My Work <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg">
            <Link to="/contact">
              Get In Touch <Mail className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

        {/* SOCIAL ICONS */}
        <motion.div
          className="flex justify-center gap-4 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <a href="https://github.com/robaadekings" target="_blank" rel="noreferrer">
            <Github />
          </a>
          <a href="https://linkedin.com/in/robert-murangiri-40ab24392" target="_blank" rel="noreferrer">
            <Linkedin />
          </a>
          <a href="mailto:robertmurangiri63@gmail.com">
            <Mail />
          </a>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default Home

function AnimatedWords({ words, nameIndexes }) {
  return (
    <span className="inline-flex gap-2 flex-wrap">
      {words.map((word, i) => (
        <motion.span
          key={i}
          className={nameIndexes.includes(i) ? "gradient-text font-bold" : ""}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}
