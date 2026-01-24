import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

const skills = [
  "React",
  "Node.js",
  "Express",
  "MongoDB",
  "Tailwind CSS",
  "shadcn/ui",
  "Graphic Design",
]

const About = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-24"
    >
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-6">About Me</h2>

        <p className="text-muted-foreground mb-8 leading-relaxed">
          I am a passionate Fullstack MERN Developer and Graphic Designer
          with a strong focus on building clean, scalable, and user-friendly
          applications. I enjoy turning complex problems into elegant solutions
          with great user experience.
        </p>

        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <Badge key={skill}>{skill}</Badge>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

export default About
