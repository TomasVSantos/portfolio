"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Palette,
  Database,
  Globe,
  ChevronDown,
  Send,
  MapPin,
  Calendar,
  Check,
  X,
} from "lucide-react";
import emailjs from "emailjs-com";

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const projects = [
    {
      id: 1,
      title: "Portfolio",
      description: "This exact website you are looking at right now!",
      image: "https://6b4ysh6u19.ufs.sh/f/Q1LXecKPH6vKvMDpthsObfGhCyr04dNuxgtFkKnsYe2cAm9Z",
      technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
      liveUrl: "https://tomasvsantos.pt",
      codeUrl: "https://github.com/TomasVSantos/portfolio",
      featured: true,
    },
  ];

  const skills = [
    { name: "JavaScript", icon: Code },
    { name: "TypeScript", icon: Code },
    { name: "React/Next.js", icon: Globe },
    { name: "Node.js", icon: Database },
    { name: "Python", icon: Code },
    { name: ".NET", icon: Code },
    { name: "Swift", icon: Code },
    { name: "SQL", icon: Database },
  ];

  const experiences = [
    {
      id: 1,
      title: "Junior Software Developer",
      company: "Host Hotel Systems, Lda",
      period: "Apr. 2024 - Present",
      location: "Torres Vedras, Lisbon, Portugal",
      description:
        "Led front-end development for a large-scale Property Management System (>3M LOC) using React, delivering critical UI features that streamlined hotel operations for thousands of users. Built and integrated new .NET API endpoints and SQL-backed features to support core platform functionality, contributing to full-stack enhancements. Worked closely with the CTO and PMs to define and deliver product features, acting as one of the primary front-end points of contact within the team.",
      technologies: ["React", ".NET", "SQL"],
    },
    {
      id: 2,
      title: "Intern, iOS Developer",
      company: "eAvio d.o.o",
      period: "Sep. 2023 - Dec. 2023",
      location: "Maribor, Slovenia",
      description:
        "Contributed as an iOS Developer Intern at eAvio d.o.o, a specialized provider of aviation software solutions, as part of an Erasmus program. Enhanced eFlyBag app for in-flight document management and updated and integrated eLoadSheet into eFlyBag, enriching its capabilities. Conducted debugging, testing, and optimizations for both apps while contributing innovative ideas in team meetings.",
      technologies: ["Swift"],
    },
    {
      id: 3,
      title: "Intern, Web Developer",
      company: "Fatias Urbanas, Lda",
      period: "Jan. 2023 - Mar. 2023",
      location: "Torres Vedras, Lisbon, Portugal",
      description:
        "Collaborated with Fatias Urbanas Lda, a local restaurant, to design and develop a user-friendly website. Created and implemented a responsive and visually appealing website for the restaurant, utilizing web development skills to enhance online presence and customer engagement. Worked closely with the restaurant team to ensure the website met their specific needs and branding.",
      technologies: ["HTML", "CSS", "JavaScript", "PHP"],
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "projects", "skills", "experience", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "lol nice try";
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "lol nice try";
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "lol nice try";

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: "tomasvsantos04@gmail.com",
        },
        publicKey
      );

      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error sending email:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background */}
      <motion.div className="absolute inset-0 opacity-30" style={{ y: backgroundY }}>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </motion.div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 px-6 py-4">
            <div className="flex items-center justify-between">
              <motion.div
                className="text-2xl font-bold text-white"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                Tomás Santos
              </motion.div>
              <div className="hidden md:flex space-x-8">
                {["hero", "projects", "skills", "experience", "contact"].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`capitalize transition-all duration-300 ${
                      activeSection === section ? "text-white font-semibold" : "text-white/70 hover:text-white"
                    }`}
                  >
                    {section === "hero" ? "Home" : section}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="backdrop-blur-md bg-white/10 rounded-3xl border border-white/20 p-12 shadow-2xl"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 p-1"
            >
              <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                <img
                  src="https://6b4ysh6u19.ufs.sh/f/Q1LXecKPH6vKaXDjg6TFb6lPH3z29Kokg1QNtcYXWqjvuRrJ"
                  alt="Tomás Santos"
                  className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center"
                />
              </div>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Tomás Santos
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Full Stack Developer and UI/UX Enthusiast
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Button
                onClick={() => scrollToSection("projects")}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                View My Work
              </Button>
              <Button
                onClick={() => scrollToSection("contact")}
                variant="outline"
                className="border-white/30 text-gradient-to-r from-purple-500 to-blue-500 hover:bg-white/10 px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300"
              >
                Get In Touch
              </Button>
            </motion.div>

            <motion.div
              className="flex justify-center space-x-6 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <a
                href="https://github.com/TomasVSantos"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors duration-300 transform hover:scale-110"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/tomasvsantos/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors duration-300 transform hover:scale-110"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="mailto:tomasvsantos04@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors duration-300 transform hover:scale-110"
              >
                <Mail className="w-6 h-6" />
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-12"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <ChevronDown
              className="w-8 h-8 text-white/50 mx-auto cursor-pointer"
              onClick={() => scrollToSection("projects")}
            />
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Featured Projects</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              A showcase of my recent work, featuring full-stack applications and creative solutions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className="backdrop-blur-md bg-white/10 border-white/20 rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500">
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0" />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                      {project.featured && (
                        <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">Featured</Badge>
                      )}
                    </div>
                    <p className="text-white/70 mb-4 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="border-white/30 text-white/80">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex space-x-4">
                      <Button asChild className="bg-white/10 hover:bg-white/20 text-white border-white/30 flex-1">
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="border-white/30 text-gradient-to-r from-purple-500 to-blue-500 hover:bg-white/10 flex-1"
                      >
                        <a href={project.codeUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Skills & Expertise</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Technologies and tools I use to bring ideas to life
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => {
              const IconComponent = skill.icon;
              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className="group"
                >
                  <Card className="backdrop-blur-md bg-white/10 border-white/20 rounded-2xl p-6 text-center hover:bg-white/15 transition-all duration-300">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 p-3 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-full h-full text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">{skill.name}</h3>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Experience</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">My professional journey and the impact I've made</p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-blue-500 hidden md:block" />

            <div className="space-y-12">
              {experiences.map((experience, index) => (
                <motion.div
                  key={experience.id}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-6 w-4 h-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full hidden md:block" />

                  <Card className="backdrop-blur-md bg-white/10 border-white/20 rounded-2xl p-6 md:ml-16 hover:bg-white/15 transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">{experience.title}</h3>
                        <p className="text-xl text-purple-300 font-semibold">{experience.company}</p>
                      </div>
                      <div className="flex flex-col md:items-end mt-2 md:mt-0">
                        <div className="flex items-center text-white/70 mb-1">
                          <Calendar className="w-4 h-4 mr-2" />
                          {experience.period}
                        </div>
                        <div className="flex items-center text-white/70">
                          <MapPin className="w-4 h-4 mr-2" />
                          {experience.location}
                        </div>
                      </div>
                    </div>

                    <p className="text-white/80 mb-4 leading-relaxed">{experience.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="border-white/30 text-white/80">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Get In Touch</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Ready to start your next project? Let's create something amazing together
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="backdrop-blur-md bg-white/10 border-white/20 rounded-2xl p-8 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-semibold mb-2">Name</label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="bg-white/10 border-white/30 text-white placeholder-white/50 focus:border-purple-400 focus:ring-purple-400 placeholder:text-white/50"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-semibold mb-2">Email</label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="bg-white/10 border-white/30 text-white placeholder-white/50 focus:border-purple-400 focus:ring-purple-400 placeholder:text-white/50"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Subject</label>
                  <Input
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="bg-white/10 border-white/30 text-white placeholder-white/50 focus:border-purple-400 focus:ring-purple-400 placeholder:text-white/50"
                    placeholder="Project inquiry"
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Message</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="bg-white/10 border-white/30 text-white placeholder-white/50 focus:border-purple-400 focus:ring-purple-400 min-h-32 placeholder:text-white/50"
                    placeholder="Tell me about your project..."
                  />
                </div>

                {submitStatus === "success" && (
                  <div className="flex items-center space-x-2 text-green-400 bg-green-400/10 border border-green-400/30 rounded-lg p-3">
                    <Check className="w-5 h-5" />
                    <span>Message sent successfully! I'll get back to you soon.</span>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="flex items-center space-x-2 text-red-400 bg-red-400/10 border border-red-400/30 rounded-lg p-3">
                    <X className="w-5 h-5" />
                    <span>Failed to send message. Please try again or email me directly.</span>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-3 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/20">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-white/70 mb-4">© 2025 Tomás Santos. All rights reserved.</p>
          <div className="flex justify-center space-x-6">
            <a
              href="https://github.com/TomasVSantos"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors duration-300 transform hover:scale-110"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/tomasvsantos/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors duration-300 transform hover:scale-110"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="mailto:tomasvsantos04@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors duration-300 transform hover:scale-110"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
