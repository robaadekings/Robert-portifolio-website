import { Github, Linkedin, Mail, Heart, ArrowUp } from "lucide-react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const footerLinks = {
    navigation: [
      { label: "Home", path: "/" },
      { label: "About", path: "/about" },
      { label: "Services", path: "/services" },
      { label: "Projects", path: "/projects" },
      { label: "Contact", path: "/contact" }
    ],
    social: [
      { icon: Github, href: "https://github.com/robaadekings", label: "GitHub" },
      { icon: Linkedin, href: "https://linkedin.com/in/robert-murangiri-40ab24392", label: "LinkedIn" },
      { icon: Mail, href: "mailto:robertmurangiri63@gmail.com", label: "Email" }
    ]
  }

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="relative mt-20 border-t"
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Branding */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <h3 className="text-2xl font-bold gradient-text">Robert Murungi</h3>
            </Link>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Fullstack MERN Developer & Graphic Designer crafting beautiful, 
              scalable web applications and stunning visual designs.
            </p>
            <p className="text-sm text-muted-foreground">
              Available for freelance projects and collaborations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Connect</h4>
            <div className="flex flex-col gap-4">
              {footerLinks.social.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg glass-effect border flex items-center justify-center group-hover:border-primary group-hover:scale-110 transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span>{social.label}</span>
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border/50 mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-4">
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            © {new Date().getFullYear()} Robert Murungi. Made with
            <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
            All rights reserved.
          </p>

          {/* Scroll to Top */}
          <Button
            variant="outline"
            size="sm"
            onClick={scrollToTop}
            className="group border-2"
          >
            Back to Top
            <ArrowUp className="w-4 h-4 ml-2 group-hover:-translate-y-1 transition-transform" />
          </Button>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer
