"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Download,
  Code,
  BookOpen,
  Calendar,
  ExternalLink,
  Menu,
  X,
  Sun,
  Moon,
  Star,
} from "lucide-react"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("inicio")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    subject: "",
    message: "",
  })
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  useEffect(() => {
    setMounted(true)
    // Cargar tema desde localStorage o detectar preferencia del sistema
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    const initialTheme = savedTheme || systemTheme

    setTheme(initialTheme)
    document.documentElement.classList.toggle("dark", initialTheme === "dark")
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  const handleDownloadCV = () => {
    const link = document.createElement("a")
    link.href = "/CV%20HENRY%20NAVARRO%20-%20ES.docx.pdf"
    link.download = "CV-Henry-Navarro.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormStatus("loading")

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setFormStatus("success")
        setFormData({ name: "", lastname: "", email: "", subject: "", message: "" })
      } else {
        setFormStatus("error")
      }
    } catch (error) {
      setFormStatus("error")
    }
  }

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    setIsMenuOpen(false)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["inicio", "sobre-mi", "experiencia", "proyectos", "contacto"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const technologies = [
    {
      name: "Python",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      level: 5,
      levelText: "Avanzado",
    },
    {
      name: "JavaScript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      level: 4,
      levelText: "Intermedio-Avanzado",
    },
    {
      name: "TypeScript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      level: 4,
      levelText: "Intermedio-Avanzado",
    },
    {
      name: "React",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      level: 4,
      levelText: "Intermedio",
    },
    {
      name: "Next.js",
      icon: "/next.svg",
      level: 4,
      levelText: "Intermedio",
    },
    {
      name: "Node.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      level: 3,
      levelText: "Intermedio",
    },
    {
      name: "Express",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
      level: 3,
      levelText: "Intermedio",
    },
    {
      name: "NestJS",
      icon: "./nestjs.svg",
      level: 2,
      levelText: "Básico-Intermedio",
    },
    {
      name: "Java",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
      level: 2,
      levelText: "Básico-Intermedio",
    },
    {
      name: "Odoo",
      icon: "https://odoocdn.com/openerp_website/static/src/img/assets/svg/odoo_logo.svg",
      level: 5,
      levelText: "Avanzado",
    },
    {
      name: "PostgreSQL",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
      level: 4,
      levelText: "Avanzado",
    },
    {
      name: "Docker",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
      level: 3,
      levelText: "Intermedio",
    },
    {
      name: "Git",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
      level: 4,
      levelText: "Avanzado",
    },
    {
      name: "HTML",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
      level: 5,
      levelText: "Avanzado",
    },
    {
      name: "CSS",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
      level: 4,
      levelText: "Avanzado",
    },
    {
      name: "Django",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
      level: 3,
      levelText: "Intermedio",
    },
    {
      name: "Linux",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
      level: 4,
      levelText: "Intermedio-Avanzado",
    },
  ]

  const projects = [
    {
      title: "Localización Fiscal para Odoo",
      description:
        "Desarrollo de módulos de localización fiscal para Venezuela, Panamá, Colombia, Estados Unidos y España, cumpliendo con las normativas tributarias específicas de cada país.",
      technologies: ["Python", "Odoo", "XML", "PostgreSQL"],
      type: "Desarrollo Backend",
    },
    {
      title: "Integración de Pasarelas de Pago",
      description:
        "Implementación de integraciones con múltiples pasarelas de pago y máquinas fiscales mediante consumo de APIs REST.",
      technologies: ["Python", "APIs REST", "Odoo", "JavaScript"],
      type: "Integración de Sistemas",
    },
    {
      title: "Sistema de Control de Asistencia",
      description:
        "Desarrollo de módulo personalizado para control de asistencia integrado con dispositivos biométricos y sistemas de recursos humanos.",
      technologies: ["Python", "Odoo", "PostgreSQL", "APIs"],
      type: "Desarrollo FullStack",
    },
    {
      title: "Plataforma de Gestión Empresarial",
      description:
        "Desarrollo de módulos personalizados para gestión integral de empresas, incluyendo inventario, ventas, compras y contabilidad.",
      technologies: ["Python", "Odoo", "JavaScript", "PostgreSQL"],
      type: "Desarrollo FullStack",
    },
  ]

  const skills = [
    "Adaptabilidad",
    "Resolución de Problemas",
    "Proactividad",
    "Trabajo en equipo",
    "Comunicación Efectiva",
    "Pensamiento Crítico",
    "Atención al Cliente",
    "Iniciativa",
    "Autodidacta",
  ]

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 transition-colors duration-500">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-700"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold text-gray-900 dark:text-white"
            >
              Henry Navarro
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {[
                { id: "inicio", label: "Inicio" },
                { id: "sobre-mi", label: "Sobre mí" },
                { id: "experiencia", label: "Experiencia" },
                { id: "proyectos", label: "Proyectos" },
                { id: "contacto", label: "Contacto" },
              ].map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                    activeSection === item.id ? "text-blue-600 dark:text-blue-400" : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" size="sm" onClick={toggleTheme} className="text-gray-700 dark:text-gray-300">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={theme}
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </motion.div>
                  </AnimatePresence>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={handleDownloadCV}
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Descargar CV
                </Button>
              </motion.div>
            </div>

            {/* Mobile menu button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="md:hidden text-gray-900 dark:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isMenuOpen ? "close" : "open"}
                  initial={{ rotate: 0 }}
                  animate={{ rotate: isMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700"
              >
                <div className="flex flex-col space-y-4">
                  {[
                    { id: "inicio", label: "Inicio" },
                    { id: "sobre-mi", label: "Sobre mí" },
                    { id: "experiencia", label: "Experiencia" },
                    { id: "proyectos", label: "Proyectos" },
                    { id: "contacto", label: "Contacto" },
                  ].map((item, index) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      onClick={() => scrollToSection(item.id)}
                      className={`text-left text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                        activeSection === item.id
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {item.label}
                    </motion.button>
                  ))}
                  <div className="flex items-center justify-between pt-4">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleTheme}
                        className="text-gray-700 dark:text-gray-300"
                      >
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={theme}
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                          </motion.div>
                        </AnimatePresence>
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        onClick={handleDownloadCV}
                        className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 flex-1 ml-4"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Descargar CV
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        id="inicio"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="pt-24 pb-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white"
                >
                  ¡Hola, soy <span className="text-blue-600 dark:text-blue-400">Henry Navarro!</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="text-xl text-gray-600 dark:text-gray-300"
                >
                  Desarrollador FullStack especializado en Odoo
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-wrap gap-4"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                    <Mail className="w-5 h-5 mr-2" />
                    Contactar
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={handleDownloadCV}
                    className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Descargar CV
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="flex flex-wrap gap-6 text-sm text-gray-600 dark:text-gray-400"
              >
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  +58 412-2953884
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Ciudad Guayana, Venezuela
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                className="w-80 h-80 mx-auto bg-gradient-to-br from-blue-400 to-purple-500 dark:from-blue-500 dark:to-purple-600 rounded-full flex items-center justify-center"
              >
                <div className="w-72 h-72 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
                  <motion.div
                    animate={{
                      rotate: [0, -360],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  >
                    <Code className="w-32 h-32 text-blue-600 dark:text-blue-400" />
                  </motion.div>
                </div>
              </motion.div>
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 dark:bg-yellow-500 rounded-full flex items-center justify-center"
              >
                <span className="text-2xl">💡</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        id="sobre-mi"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Sobre mí</h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="h-1 bg-blue-600 dark:bg-blue-400 mx-auto"
            ></motion.div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Estudiante de 9º semestre en Ingeniería en Informática, con una sólida experiencia de 3 años en el
                entorno de Odoo. Durante este tiempo, he desarrollado módulos personalizados que se ajustan a las
                normativas y requerimientos tributarios de clientes en países como Venezuela, Panamá, Colombia, Estados
                Unidos y España.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Mi enfoque está en ofrecer soluciones adaptadas a las necesidades específicas de cada cliente,
                asegurando que el sistema funcione de manera óptima y cumpla con sus expectativas. Me apasiona el
                desarrollo de software y la resolución de problemas complejos.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold text-blue-600 dark:text-blue-400"
                  >
                    3+
                  </motion.div>
                  <div className="text-gray-600 dark:text-gray-400">Años de experiencia</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold text-blue-600 dark:text-blue-400"
                  >
                    5
                  </motion.div>
                  <div className="text-gray-600 dark:text-gray-400">Países atendidos</div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Habilidades</h3>
              <div className="grid grid-cols-2 gap-3">
                {skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Badge
                      variant="secondary"
                      className="p-2 justify-center dark:bg-gray-700 dark:text-gray-300 w-full"
                    >
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="pt-6"
              >
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Idiomas</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-700 dark:text-gray-300">Español</span>
                    <span className="text-gray-600 dark:text-gray-400">Nativo</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700 dark:text-gray-300">Inglés</span>
                    <span className="text-gray-600 dark:text-gray-400">Básico-Intermedio</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Technologies Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Tecnologías</h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="h-1 bg-blue-600 dark:bg-blue-400 mx-auto"
            ></motion.div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Card className="p-6 dark:bg-gray-800 dark:border-gray-700 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center mb-4">
                      <img
                        src={tech.icon}
                        alt={tech.name}
                        className="w-10 h-10 mr-4"
                      />
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{tech.name}</h3>
                        <div className="flex items-center gap-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < tech.level ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} fill={i < tech.level ? 'currentColor' : 'none'} />
                          ))}
                          <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">{tech.levelText}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Experience Section */}
      <motion.section
        id="experiencia"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Experiencia</h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="h-1 bg-blue-600 dark:bg-blue-400 mx-auto"
            ></motion.div>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="p-8 dark:bg-gray-700 dark:border-gray-600">
                <CardHeader className="pb-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <CardTitle className="text-2xl text-gray-900 dark:text-white">
                        Desarrollador FullStack en Odoo
                      </CardTitle>
                      <CardDescription className="text-lg text-blue-600 dark:text-blue-400 font-medium">
                        3DVisión, C.A. • Puerto Ordaz, Venezuela
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span>Diciembre 2021 - Presente</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                    {[
                      "Elaboración de localizaciones para Odoo conforme a las leyes de los países de los clientes.",
                      "Desarrollo de módulos personalizados en Odoo según los requerimientos del cliente.",
                      "Integración del sistema con pasarelas de pago, máquinas fiscales y controles de asistencias mediante consumo de APIs.",
                      "Supervisión del equipo de desarrollo.",
                      "Levantamiento y análisis de requerimientos de los clientes para alinear desarrollos con sus expectativas.",
                      "Formación de nuevos empleados en herramientas y procesos de Odoo.",
                      "Soporte y asistencia a clientes para ofrecer capacitación al uso del sistema.",
                      "Elaboración de manuales de usuario y guías de uso.",
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-3"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 flex-shrink-0"
                        ></motion.div>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-8"
            >
              <Card className="p-6 dark:bg-gray-700 dark:border-gray-600">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    <div>
                      <CardTitle className="text-xl dark:text-white">Educación</CardTitle>
                      <CardDescription className="dark:text-gray-400">
                        Universidad Nacional Experimental De Guayana
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">Ingeniería en Informática</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Cursante de 9no semestre</div>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Abril 2016 - Presente</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section
        id="proyectos"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Proyectos</h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="h-1 bg-blue-600 dark:bg-blue-400 mx-auto"
            ></motion.div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.2 },
                }}
              >
                <Card className="group hover:shadow-xl dark:hover:shadow-gray-900/20 transition-all duration-300 dark:bg-gray-800 dark:border-gray-700 h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2 dark:text-white">{project.title}</CardTitle>
                        <motion.div whileHover={{ scale: 1.05 }}>
                          <Badge variant="outline" className="mb-3 dark:border-gray-600 dark:text-gray-300">
                            {project.type}
                          </Badge>
                        </motion.div>
                      </div>
                      <motion.div whileHover={{ scale: 1.1, rotate: 15 }} whileTap={{ scale: 0.9 }}>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="opacity-0 group-hover:opacity-100 transition-opacity dark:text-gray-300 dark:hover:bg-gray-700"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </motion.div>
                    </div>
                    <CardDescription className="text-base leading-relaxed dark:text-gray-400">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <motion.div
                          key={techIndex}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: techIndex * 0.1 }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.1 }}
                        >
                          <Badge variant="secondary" className="dark:bg-gray-700 dark:text-gray-300">
                            {tech}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contacto"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Contacto</h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="h-1 bg-blue-600 dark:bg-blue-400 mx-auto"
            ></motion.div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">¡Trabajemos juntos!</h3>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                  Estoy disponible para nuevos proyectos y oportunidades. No dudes en contactarme para discutir cómo
                  puedo ayudarte con tus necesidades de desarrollo.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  { icon: Mail, title: "Correo electrónico", value: "henrymanuelnavarro@gmail.com", href: "mailto:henrymanuelnavarro@gmail.com" },
                  { icon: Phone, title: "Teléfono", value: "+58 412-2953884", href: "tel:+584122953884" },
                  { icon: Linkedin, title: "LinkedIn", value: "linkedin.com/in/henry-navarro/", href: "https://www.linkedin.com/in/henry-navarro/" },
                  { icon: Github, title: "GitHub", value: "github.com/HenryNavarro1998", href: "https://github.com/HenryNavarro1998" },
                  { icon: MapPin, title: "Ubicación", value: "Ciudad Guayana, Venezuela" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-4"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center"
                    >
                      <item.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </motion.div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{item.title}</div>
                      {item.href ? (
                        <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:underline">
                          {item.value}
                        </a>
                      ) : (
                        <div className="text-gray-600 dark:text-gray-400">{item.value}</div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 dark:bg-gray-700 dark:border-gray-600">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="dark:text-white">Envíame un mensaje</CardTitle>
                  <CardDescription className="dark:text-gray-400">
                    Completa el formulario y te responderé lo antes posible.
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-0 pb-0">
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                      className="grid grid-cols-2 gap-4"
                    >
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Nombre
                        </label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleFormChange}
                          placeholder="Tu nombre"
                          className="dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Apellido
                        </label>
                        <Input
                          name="lastname"
                          value={formData.lastname}
                          onChange={handleFormChange}
                          placeholder="Tu apellido"
                          className="dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                          required
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      viewport={{ once: true }}
                    >
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Correo electrónico
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        placeholder="tu@email.com"
                        className="dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                        required
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Asunto</label>
                      <Input
                        name="subject"
                        value={formData.subject}
                        onChange={handleFormChange}
                        placeholder="Asunto del mensaje"
                        className="dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                        required
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Mensaje</label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleFormChange}
                        placeholder="Escribe tu mensaje aquí..."
                        rows={5}
                        className="dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                        required
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        disabled={formStatus === 'loading'}
                        className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                      >
                        {formStatus === 'loading' ? 'Enviando...' : 'Enviar mensaje'}
                      </Button>
                    </motion.div>
                    {formStatus === 'success' && (
                      <p className="text-green-600 dark:text-green-400 text-center">¡Mensaje enviado con éxito!</p>
                    )}
                    {formStatus === 'error' && (
                      <p className="text-red-600 dark:text-red-400 text-center">Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.</p>
                    )}
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-gray-900 dark:bg-black text-white py-8 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex justify-center space-x-6 mb-6"
          >
            {[
              {Icon: Mail, href: "mailto:henrymanuelnavarro@gmail.com"},
              {Icon: Linkedin, href: "https://www.linkedin.com/in/henry-navarro/"},
              {Icon: Github, href: "https://github.com/hmnavarro"}
            ].map(({Icon, href}, index) => (
              <motion.a key={index} href={href} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.2, y: -2 }} whileTap={{ scale: 0.9 }}>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <Icon className="w-5 h-5" />
                </Button>
              </motion.a>
            ))}
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-400"
          >
            © 2024 Henry Navarro. Todos los derechos reservados.
          </motion.p>
        </div>
      </motion.footer>
    </div>
  )
}
