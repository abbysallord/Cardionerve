"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  ChevronDown,
  Mail,
  MapPin,
  Phone,
  CheckCircle2,
  Users,
  Award,
  Sun,
  Moon,
  Smartphone,
  Brain,
  Bell,
  Activity,
  Shield,
  Lock,
  Clock,
  Loader2,
} from "lucide-react";
import { useTheme } from "./next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
} from "@/components/ui/resizable-navbar";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  delay = 0,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
    >
      <Card className="group h-full border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:-translate-y-2">
        <CardContent className="p-8">
          <div className="mb-6 inline-flex rounded-2xl bg-primary/10 p-4 text-primary transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
            {icon}
          </div>
          <h3 className="mb-3 text-xl font-semibold text-foreground">
            {title}
          </h3>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

interface StepCardProps {
  number: string;
  title: string;
  description: string;
  delay?: number;
  isLast?: boolean;
}

const StepCard: React.FC<StepCardProps> = ({
  number,
  title,
  description,
  delay = 0,
  isLast = false,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{ duration: 0.6, delay }}
      className="relative flex gap-6"
    >
      <div className="flex flex-col items-center">
        <div className="z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground shadow-lg">
          {number}
        </div>
        <div 
          className={`-mt-1 h-full w-1 ${
            isLast 
              ? "bg-gradient-to-b from-primary to-transparent" 
              : "bg-primary"
          }`} 
        />
      </div>
      <div className="flex-1 pb-12">
        <h3 className="mb-2 text-xl font-semibold text-foreground">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};

const CardioNerveWebsite: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { theme, setTheme } = useTheme();

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitting(false);
        setIsSuccess(true);
        
        // Wait 1 second to show the "Sent!" button state
        setTimeout(() => {
          setFormSubmitted(true);
          setIsSuccess(false);
          
          // Reset form data and view after showing "Message Sent!" card for 3 seconds
          setTimeout(() => {
            setFormData({ name: "", email: "", message: "" });
            setFormSubmitted(false);
          }, 3000);
        }, 1000);
      } else {
        setIsSubmitting(false);
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsSubmitting(false);
      alert("An error occurred. Please try again later.");
    }
  };

  const navLinks = [
    { label: "Home", id: "home" },
    { label: "Features", id: "features" },
    { label: "How It Works", id: "how-it-works" },
    { label: "Privacy", id: "privacy" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <Navbar>
        <NavBody>
          <div className="flex w-full flex-row items-center justify-between">
            <div className="flex items-center gap-2 text-2xl font-bold px-2">
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                CardioNerve
              </span>
            </div>
            
            <NavItems 
              items={navLinks.map((link) => ({ name: link.label, link: `#${link.id}` }))}
              onItemClick={(e, item) => {
                e.preventDefault();
                const id = item.link.replace("#", "");
                scrollToSection(id);
              }}
            />

            <div className="flex items-center gap-4 px-2">
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-lg hover:bg-accent transition-colors"
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {theme === "dark" ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon className="h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
              <Button
                onClick={() => scrollToSection("contact")}
                className="bg-primary text-primary-foreground hover:bg-primary/90 hidden md:inline-flex"
              >
                Start Free Trial
              </Button>
            </div>
          </div>
        </NavBody>
        <MobileNav>
           <MobileNavHeader>
              <div className="flex items-center gap-2 text-xl font-bold px-2">
                <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  CardioNerve
                </span>
              </div>
              <div className="flex items-center gap-2">
                 <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="p-2 rounded-lg hover:bg-accent transition-colors"
                    aria-label="Toggle theme"
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {theme === "dark" ? (
                        <motion.div
                          key="sun-mobile"
                          initial={{ rotate: -90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: 90, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Sun className="h-5 w-5" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="moon-mobile"
                          initial={{ rotate: 90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: -90, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Moon className="h-5 w-5" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                 <MobileNavToggle isOpen={mobileMenuOpen} onClick={() => setMobileMenuOpen(!mobileMenuOpen)} />
              </div>
           </MobileNavHeader>
           <MobileNavMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
              <div className="flex flex-col gap-4 w-full">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="text-left text-muted-foreground hover:text-primary transition-colors py-2 text-lg font-medium"
                  >
                    {link.label}
                  </button>
                ))}
                <Button
                  onClick={() => scrollToSection("contact")}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mt-4"
                >
                  Start Free Trial
                </Button>
              </div>
           </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Hero Section */}
      <section
        id="home"
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb,59,130,246),0.1),transparent_50%)]" />

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="container relative z-10 mx-auto px-4 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-4xl"
          >


            <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
              Cardiac Risk Detection{" "}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                at Your Fingertips
              </span>
            </h1>

            <p className="mb-10 text-lg text-muted-foreground md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed">
              Real-time heart health monitoring with AI-powered risk assessment.
              Early detection could save your life.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                onClick={() => scrollToSection("contact")}
                className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                Start Free Trial
                <ChevronDown className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection("features")}
                className="text-lg px-8 py-6 border-2 hover:bg-primary/5"
              >
                Learn More
              </Button>
            </div>


          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="h-8 w-8 text-muted-foreground" />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 pb-12 md:py-32 md:pb-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-24 text-center"
          >
            <h2 className="mb-4 text-4xl font-bold md:text-5xl">
              Comprehensive Cardiac Monitoring
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Powered by cutting-edge AI technology to keep your heart healthy
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon={<Smartphone className="h-8 w-8" />}
              title="Real-time Monitoring"
              description="Seamlessly integrates with leading smartwatches and fitness trackers for continuous cardiac monitoring."
              delay={0.1}
            />
            <FeatureCard
              icon={<Brain className="h-8 w-8" />}
              title="AI-Powered Analysis"
              description="Our advanced AI continuously analyzes your cardiac data to detect potential risks early."
              delay={0.2}
            />
            <FeatureCard
              icon={<Bell className="h-8 w-8" />}
              title="Instant Alerts"
              description="Receive instant notifications for any concerns, ensuring you're always informed about your heart health."
              delay={0.3}
            />
            <FeatureCard
              icon={<Activity className="h-8 w-8" />}
              title="Coming Soon"
              description="More integrations and features coming soon to enhance your cardiac monitoring experience."
              delay={0.4}
            />
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-20 grid gap-8 md:grid-cols-3"
          >
            {/* <div className="text-center">
              <div className="mb-2 text-5xl font-bold text-primary">99+</div>
              <div className="text-muted-foreground">Active Users</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-5xl font-bold text-primary">91.3%</div>
              <div className="text-muted-foreground">Uptime</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-5xl font-bold text-primary">24/7</div>
              <div className="text-muted-foreground">Monitoring</div>
            </div> */}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-4xl font-bold md:text-5xl">
              Getting Started is Easy
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Four simple steps to start monitoring your heart health
            </p>
          </motion.div>

          <div className="mx-auto max-w-3xl">
            <StepCard
              number="1"
              title="Sign Up & Create Profile"
              description="Sign up and complete your health profile in minutes. Provide essential information to personalize your monitoring experience."
              delay={0.1}
            />
            <StepCard
              number="2"
              title="Link Your Device"
              description="Link your smartwatch or fitness tracker. We support all major brands including Apple Watch, Fitbit, and Garmin."
              delay={0.2}
            />
            <StepCard
              number="3"
              title="AI Analysis Begins"
              description="Our AI continuously analyzes your cardiac data in real-time, learning your patterns and detecting anomalies."
              delay={0.3}
            />
            <StepCard
              number="4"
              title="Receive Alerts"
              description="Receive instant notifications for any concerns. Stay informed and take action when it matters most."
              delay={0.4}
              isLast={true}
            />
          </div>
        </div>
      </section>

      {/* Security & Privacy Section */}
      <section id="privacy" className="pt-12 pb-20 md:pt-16 md:pb-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl text-center"
          >

            <h2 className="mb-16 text-4xl font-bold md:text-5xl">
              Security & Privacy First
            </h2>
            
            <div>
              <p className="mb-12 text-lg text-muted-foreground leading-relaxed">
                We take your privacy seriously. All data is encrypted,
                HIPAA-compliant, and you maintain full control over your
                information. Your health data is protected with bank-level
                security.
              </p>

            <div className="grid gap-8 md:grid-cols-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex flex-col items-center"
              >
                <Lock className="mb-4 h-12 w-12 text-primary" />
                <h3 className="mb-2 text-xl font-semibold">
                  End-to-End Encryption
                </h3>
                <p className="text-muted-foreground">
                  Your data is encrypted at rest and in transit
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col items-center"
              >
                <Award className="mb-4 h-12 w-12 text-primary" />
                <h3 className="mb-2 text-xl font-semibold">HIPAA Compliant</h3>
                <p className="text-muted-foreground">
                  Fully compliant with healthcare regulations
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col items-center"
              >
                <Users className="mb-4 h-12 w-12 text-primary" />
                <h3 className="mb-2 text-xl font-semibold">Your Data, Your Control</h3>
                <p className="text-muted-foreground">
                  You decide who can access your information
                </p>
              </motion.div>
            </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-primary/10 via-background to-primary/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl text-center"
          >
            <h2 className="mb-6 text-4xl font-bold md:text-5xl">
              Join Thousands of Users Who Trust CardioNerve
            </h2>
            <p className="mb-10 text-lg text-muted-foreground md:text-xl">
              Start your free trial today and take control of your heart health
            </p>
            <Button
              size="lg"
              onClick={() => scrollToSection("contact")}
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-10 py-7 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              Start Free Trial
            </Button>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-4xl font-bold md:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Everything you need to know about CardioNerve
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto max-w-3xl"
          >
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  How does CardioNerve work?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  CardioNerve integrates with your smartwatch or fitness tracker
                  to continuously monitor your heart rate and other cardiac
                  metrics. Our AI analyzes this data in real-time to detect
                  potential risks and alert you immediately if any concerns are
                  identified.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  What devices are supported?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  We support all major smartwatches and fitness trackers
                  including Apple Watch, Fitbit, Garmin, Samsung Galaxy Watch,
                  and more. Our platform is designed to work seamlessly with any
                  device that tracks heart rate data.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  Is my data secure?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Absolutely. We use bank-level encryption to protect your data
                  both at rest and in transit. We are fully HIPAA compliant and
                  never share your personal health information without your
                  explicit consent. You maintain complete control over your
                  data.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  How much does it cost?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  We offer a free trial to get you started. After the trial,
                  our subscription plans start at $9.99/month with annual
                  discounts available. All plans include full access to our AI
                  monitoring, instant alerts, and 24/7 support.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  Can CardioNerve replace my doctor?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  No, CardioNerve is designed to complement, not replace,
                  professional medical care. Our platform helps you monitor your
                  heart health and alerts you to potential concerns, but you
                  should always consult with your healthcare provider for
                  medical advice and treatment.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-4xl font-bold md:text-5xl">
              Get in Touch
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Have questions? We're here to help. Reach out to our team.
            </p>
          </motion.div>

          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-8">
                  <h3 className="mb-6 text-2xl font-semibold">
                    Contact Information
                  </h3>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <Mail className="mt-1 h-6 w-6 text-primary" />
                      <div>
                        <div className="font-semibold">Email</div>
                        <div className="text-muted-foreground">
                          cardionerve.co@gmail.com
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Phone className="mt-1 h-6 w-6 text-primary" />
                      <div>
                        <div className="font-semibold">Phone</div>
                        <div className="text-muted-foreground">
                          +91 6360869590 <br />
                          +91 8296102292
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <MapPin className="mt-1 h-6 w-6 text-primary" />
                      <div>
                        <div className="font-semibold">Address</div>
                        <div className="text-muted-foreground">
                          Mangalore, Karnataka, India
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Clock className="mt-1 h-6 w-6 text-primary" />
                      <div>
                        <div className="font-semibold">Support Hours</div>
                        <div className="text-muted-foreground">
                          24/7 Customer Support
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-8">
                  <h3 className="mb-6 text-2xl font-semibold">
                    Send us a Message
                  </h3>

                  {formSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center py-12 text-center"
                    >
                      <CheckCircle2 className="mb-4 h-16 w-16 text-primary" />
                      <h4 className="mb-2 text-xl font-semibold">
                        Message Sent!
                      </h4>
                      <p className="text-muted-foreground">
                        We'll get back to you soon.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="mb-2 block text-sm font-medium"
                        >
                          Name
                        </label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Your name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          required
                          className="bg-background"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="mb-2 block text-sm font-medium"
                        >
                          Email
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          required
                          className="bg-background"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="mb-2 block text-sm font-medium"
                        >
                          Message
                        </label>
                        <Textarea
                          id="message"
                          placeholder="How can we help you?"
                          rows={5}
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              message: e.target.value,
                            })
                          }
                          required
                          className="bg-background resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting || isSuccess}
                        className={`w-full text-primary-foreground transition-all duration-300 ${
                          isSuccess
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-primary hover:bg-primary/90"
                        }`}
                        size="lg"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Sending...
                          </>
                        ) : isSuccess ? (
                          <>
                            <CheckCircle2 className="mr-2 h-5 w-5" />
                            Sent!
                          </>
                        ) : (
                          "Send Message"
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-muted/50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-2 text-xl font-bold">
                <span>CardioNerve</span>
              </div>
              <p className="text-sm text-muted-foreground">
                AI-powered cardiac risk detection platform for real-time heart
                health monitoring.
              </p>
            </div>

            <div>
              <h4 className="mb-4 font-semibold">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <button
                    onClick={() => scrollToSection("features")}
                    className="hover:text-primary transition-colors"
                  >
                    Features
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("how-it-works")}
                    className="hover:text-primary transition-colors"
                  >
                    How It Works
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("privacy")}
                    className="hover:text-primary transition-colors"
                  >
                    Security
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-semibold">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="hover:text-primary transition-colors"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-semibold">Connect</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="https://www.linkedin.com/company/cardionerve/posts/?feedView=all" target="_blank" className="hover:text-primary transition-colors">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/cardionerve.co/" target="_blank" className="hover:text-primary transition-colors">
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-border/50 pt-8 text-center text-sm text-muted-foreground">
            <p>
              © {new Date().getFullYear()} CardioNerve. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CardioNerveWebsite;
