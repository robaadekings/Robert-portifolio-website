import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Code2, Palette, Trophy, Users } from "lucide-react"

const skills = {
  frontend: ["React", "Next.js", "Tailwind CSS", "shadcn/ui", "Framer Motion", "TypeScript"],
  backend: ["Node.js", "Express", "MongoDB", "REST APIs", "Authentication", "WebSockets"],
  design: ["Graphic Design", "UI/UX Design", "Adobe Creative Suite", "Figma", "Branding"],
  tools: ["Git", "VS Code", "Postman", "Docker", "npm/yarn", "Linux"]
}

const stats = [
  { icon: Code2, label: "Projects Completed", value: "50+", color: "from-blue-500 to-cyan-500" },
  { icon: Users, label: "Happy Clients", value: "30+", color: "from-purple-500 to-pink-500" },
  { icon: Trophy, label: "Years Experience", value: "3+", color: "from-orange-500 to-red-500" },
  { icon: Palette, label: "Designs Created", value: "100+", color: "from-green-500 to-emerald-500" }
]

const About = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen pt-24 pb-16"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            About <span className="gradient-text">Me</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Passionate about creating digital experiences that make a difference
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="text-center p-6 border-2 hover:border-primary/50 transition-all">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${stat.color} p-3`}>
                    <Icon className="w-full h-full text-white" />
                  </div>
                  <div className="text-3xl font-bold mb-2 gradient-text">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* About Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <Card className="gradient-bg border-2">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-6">My Journey</h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  I am a passionate <span className="text-foreground font-semibold">Fullstack MERN Developer</span> and{" "}
                  <span className="text-foreground font-semibold">Graphic Designer</span> with a strong focus on building 
                  clean, scalable, and user-friendly applications.
                </p>
                <p>
                  My journey in web development started with a curiosity about how things work on the internet. 
                  Today, I specialize in creating full-stack applications using modern technologies while maintaining 
                  a keen eye for design and user experience.
                </p>
                <p>
                  I enjoy turning complex problems into elegant solutions with great user experience. Whether it's 
                  building a responsive web application or designing a brand identity, I bring creativity and 
                  technical expertise to every project.
                </p>
                <p>
                  When I'm not coding or designing, you'll find me exploring new technologies, contributing to 
                  open-source projects, or sharing my knowledge with the developer community.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Technical Skills</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Frontend */}
            <Card className="border-2 hover:border-primary/50 transition-all">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <Code2 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">Frontend Development</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.frontend.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Backend */}
            <Card className="border-2 hover:border-primary/50 transition-all">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                    <Code2 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">Backend Development</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.backend.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Design */}
            <Card className="border-2 hover:border-primary/50 transition-all">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <Palette className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">Design</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.design.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tools */}
            <Card className="border-2 hover:border-primary/50 transition-all">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">Tools & Technologies</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.tools.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default About
