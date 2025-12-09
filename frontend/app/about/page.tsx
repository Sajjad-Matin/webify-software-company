"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Target, Users, Award, Clock } from "lucide-react";
import Image from "next/image";
import BlueButton from "@/components/blue-button";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion, Variants } from "framer-motion";
import { metadata } from "../layout";

// Variants
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

export default function AboutPage() {
  
  const whyChooseUs = [
    {
      icon: Clock,
      title: "Speed",
      description:
        "Fast project delivery and lightning-quick website performance that keeps your users engaged.",
    },
    {
      icon: Target,
      title: "Affordability",
      description:
        "Competitive pricing without compromising on quality. Great value for businesses of all sizes.",
    },
    {
      icon: Users,
      title: "Support",
      description:
        "24/7 technical support and ongoing maintenance to keep your website running smoothly.",
    },
    {
      icon: Award,
      title: "Quality",
      description:
        "Premium code quality and modern design standards that ensure long-term success.",
    },
  ];

  return (
    <>
      <Header />

      <div className="min-h-screen py-16 sm:py-20 mt-12 sm:mt-20 px-4 sm:px-6 lg:px-12 xl:px-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto">
          {/* Hero Section */}
          <motion.div
            className="max-w-4xl mx-auto text-center mb-16 sm:mb-20"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4 sm:mb-6">
              About Our Company
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed px-2">
              We're a passionate team of developers and designers dedicated to
              helping businesses establish a strong online presence through
              fast, secure, and scalable web solutions.
            </p>
          </motion.div>

          {/* Mission Section */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 items-center mb-16 sm:mb-20"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp}>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white mb-4 sm:mb-6">
                Our Mission
              </h2>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mb-4 sm:mb-6 leading-relaxed">
                We believe every business deserves a professional online
                presence that drives growth and success. Our mission is to make
                high-quality web development accessible and affordable for
                businesses of all sizes.
              </p>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mb-6 sm:mb-8 leading-relaxed">
                Since our founding, we've helped over 100 businesses transform
                their digital presence with custom websites, eCommerce
                solutions, and ongoing technical support that keeps them ahead
                of the competition.
              </p>
              <BlueButton text="View Our Works" href="/portfolio" isArrow={false} />
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="relative flex justify-center"
            >
              <Image
                src="/placeholder.svg?height=400&width=500"
                alt="Our team working"
                width={500}
                height={400}
                className="rounded-2xl shadow-xl w-full max-w-md sm:max-w-lg object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Why Choose Us */}
          <motion.div
            className="mb-16 sm:mb-20"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2
              className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white text-center mb-8 sm:mb-12"
              variants={fadeUp}
            >
              Why Clients Choose Us
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {whyChooseUs.map((service, index) => (
                <motion.div key={index} variants={fadeUp}>
                  <Card className="text-center border-0 shadow-md hover:shadow-lg bg-white dark:bg-slate-800 transition-all duration-300">
                    <CardContent className="pt-8 pb-6">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-sky-500 to-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
                        <service.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold text-slate-800 dark:text-white mb-2">
                        {service.title}
                      </h3>
                      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 px-2">
                        {service.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            className="bg-gradient-to-r from-sky-600 to-blue-800 dark:from-blue-700 dark:to-blue-900 rounded-2xl p-8 sm:p-10 md:p-12 text-white text-center"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2
              className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12"
              variants={fadeUp}
            >
              Our Track Record
            </motion.h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
              {[
                { number: "100+", label: "Projects Completed" },
                { number: "50+", label: "Happy Clients" },
                { number: "99.9%", label: "Uptime Guarantee" },
                { number: "24/7", label: "Support Available" },
              ].map((stat, index) => (
                <motion.div key={index} variants={fadeUp}>
                  <div className="text-3xl sm:text-4xl font-bold mb-1 sm:mb-2">
                    {stat.number}
                  </div>
                  <div className="text-blue-200 dark:text-blue-300 text-sm sm:text-base">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  );
}
