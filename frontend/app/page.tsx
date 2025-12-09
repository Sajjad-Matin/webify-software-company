"use client";

import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { PortfolioSection } from "@/components/portfolio-section";
import { ContactSection } from "@/components/contact-section";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  Clapperboard,
  Database,
  MemoryStick,
  Palette,
  Phone,
  Server,
  Smartphone,
  WrenchIcon,
  Code,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import BlueButton from "@/components/blue-button";
import CTA from "@/components/CTA-section";
import { Footer } from "@/components/footer";
import { motion, Variants } from "framer-motion";
import { PortfolioSectionHome } from "@/components/portfolio-section-home";

export default function HomePage() {
  const services = [
    {
      title: "Web Development",
      description:
        "Custom websites built with modern technologies for optimal performance and user experience.",
      icon: Code,
    },
    {
      title: "Mobile App Development",
      description:
        "Custom applications built with modern technologies to ensure optimal performance and an exceptional user experience.",
      icon: Smartphone,
    },
    {
      title: "Hosting Solutions",
      description:
        "Reliable, fast, and secure hosting infrastructure to keep your website running smoothly 24/7.",
      icon: Database,
    },
    {
      title: "Maintenance",
      description:
        "Ongoing support and optimization to ensure your website stays updated, secure, and performing at its best.",
      icon: WrenchIcon,
    },
    {
      title: "Graphic Design",
      description:
        "Stunning visuals and branding solutions to enhance your online presence and engage your audience.",
      icon: Palette,
    },
    {
      title: "Video editing",
      description:
        "Professional video editing services to create engaging content that captivates your audience.",
      icon: Clapperboard,
    },
  ];

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.2 } },
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    // use numeric cubic-bezier easing array to match framer-motion's Transition typing
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <HeroSection />

        <motion.section
          className="py-20 bg-gradient-to-b from-white to-blue-50 dark:from-slate-900 dark:to-slate-800"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.div
            className="container mx-auto px-4 text-center mb-16"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
              Our Core Services
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              We provide comprehensive web solutions to help your business
              thrive online
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {services.map((service) => (
              <motion.div
                key={service.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
              >
                <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-white dark:bg-slate-800">
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-800 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <service.icon color="white" size={32} />
                    </div>
                    <CardTitle className="text-xl text-slate-800 dark:text-white">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription className="text-slate-600 dark:text-slate-300 text-base">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        <AboutSection />
        <PortfolioSectionHome />
        <CTA
          title="Ready to Get Started?"
          description="Let's discuss your project and create something amazing together.
            Get your free consultation today."
          isArrow={true}
          btnText="Start Your Project"
          btnHref="/contact"
        />
      </main>
      <Footer />
    </>
  );
}
