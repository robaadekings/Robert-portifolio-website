import { motion } from "framer-motion"
import { Code, Palette, Smartphone, Database, Globe, Zap } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

const services = [
  {
    icon: Code,
    title: "Web Development",
    description: "Building responsive, modern web applications using React, Node.js, and the latest technologies.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    description: "Creating seamless experiences across all devices with responsive and adaptive design principles.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Database,
    title: "Backend Development",
    description: "Developing robust APIs and server-side applications with Node.js, Express, and MongoDB.",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Palette,
    title: "Graphic Design",
    description: "Crafting stunning visual identities, logos, and marketing materials that stand out.",
    color: "from-orange-500 to-red-500"
  },
  {
    icon: Globe,
    title: "Full Stack Solutions",
    description: "End-to-end application development from concept to deployment and maintenance.",
    color: "from-indigo-500 to-blue-500"
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Enhancing website speed and performance for better user experience and SEO.",
    color: "from-yellow-500 to-orange-500"
  }
]

const Services = () => {
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
          transition={{ delay: 0.2 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            My <span className="gradient-text">Services</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            I offer a comprehensive range of services to help bring your digital vision to life
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                whileHover={{ y: -8 }}
              >
                <Card className="h-full group hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/50">
                  <CardHeader>
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} p-3 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-full h-full text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="gradient-bg rounded-3xl p-12 border-2 border-primary/20">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's work together to create something amazing. Get in touch and let's discuss your ideas!
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-2xl transition-all"
            >
              Contact Me
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default Services
