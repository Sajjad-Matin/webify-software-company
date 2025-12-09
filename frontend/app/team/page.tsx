"use client";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Card, CardContent } from "@/components/ui/card";
import useTeam from "@/hooks/useTeam";
import { TeamMember } from "@/types/team";
import { motion, Variants, useInView } from "framer-motion";
import { useRef } from "react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

export default function TeamPage() {
  const { data: teamMembers } = useTeam();
  console.log(teamMembers);

  const gridRef = useRef<HTMLDivElement | null>(null);
  const gridInView = useInView(gridRef, { once: true, amount: 0.2 });

  return (
    <>
      <Header />

      <div className="min-h-screen py-16 md:py-20 mt-16 md:mt-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4 md:mb-6">
              Meet Our Team
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Our talented team of developers, designers, and project managers
              work together to bring your vision to life. Each member brings
              unique expertise and passion to every project.
            </p>
          </motion.div>

          {/* Team Grid */}

          <motion.div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto"
            initial="hidden"
            animate={gridInView ? "show" : "hidden"}
            variants={staggerContainer}
          >
            {teamMembers?.map((member: TeamMember, index: number) => {
              const apiBase =
                process.env.NEXT_PUBLIC_API_BASE_URL ||
                "http://localhost:5000/api";
              const backendOrigin = apiBase.replace(/\/api\/?$/, "");
              let img = "/placeholder.svg";

              if (typeof member.image === "string" && member.image.length) {
                if (member.image.startsWith("http")) {
                  img = member.image;
                } else {
                  const rel = member.image.startsWith("/")
                    ? member.image
                    : `/${member.image}`;
                  img = `${backendOrigin}${rel}`;
                }
              }

              return (
                <motion.div key={index} variants={fadeUp}>
                  <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-white dark:bg-slate-800">
                    <CardContent className="p-6 text-center">
                      <div className="relative mb-6 flex justify-center">
                        <img
                          src={img}
                          alt={member.fullName}
                          width={200}
                          height={200}
                          className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover object-top shadow-lg group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                          decoding="async"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "/placeholder.svg";
                          }}
                        />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white mb-1 sm:mb-2">
                        {member.fullName}
                      </h3>
                      <div className="text-blue-600 dark:text-blue-400 font-semibold mb-2 sm:mb-3 text-sm sm:text-base">
                        {member.role}
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                        {member.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            className="text-center mt-16 md:mt-20 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-8 sm:p-10 md:p-12"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white mb-3 sm:mb-4">
              Ready to Work With Us?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
              Our experienced team is ready to tackle your next project. Let's
              discuss how we can help bring your ideas to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-md bg-blue-900 px-6 sm:px-8 py-3 text-base sm:text-lg font-medium text-white shadow transition-colors hover:opacity-90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Start a Project
              </a>
              <a
                href="/portfolio"
                className="inline-flex items-center justify-center rounded-md border border-blue-300 dark:border-blue-600 bg-white dark:bg-slate-800 px-6 sm:px-8 py-3 text-base sm:text-lg font-medium text-blue-600 dark:text-blue-400 shadow-sm transition-colors hover:bg-blue-50 dark:hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                View Our Work
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  );
}
