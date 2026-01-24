import { Github, Linkedin, Mail } from "lucide-react"
import { motion } from "framer-motion"

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="border-t mt-20"
    >
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Branding */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold">Murungi.dev</h3>
          <p className="text-sm text-muted-foreground">
            Fullstack MERN Developer & Graphic Designer
          </p>
        </div>

        {/* Social Links */}
        <div className="flex gap-6">
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noreferrer"
            className="hover:text-primary transition"
          >
            <Github />
          </a>
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noreferrer"
            className="hover:text-primary transition"
          >
            <Linkedin />
          </a>
          <a
            href="mailto:youremail@example.com"
            className="hover:text-primary transition"
          >
            <Mail />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-sm text-muted-foreground text-center">
          © {new Date().getFullYear()} Robert Murungi. All rights reserved.
        </p>
      </div>
    </motion.footer>
  )
}

export default Footer
