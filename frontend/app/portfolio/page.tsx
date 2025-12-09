import CTA from "@/components/CTA-section";
import { Header } from "@/components/header";
import { PortfolioSection } from "@/components/portfolio-section";
import React from "react";
import { Footer } from "@/components/footer";

const PortfolioPage = () => {
  return (
    <>
      <Header />
      <PortfolioSection />
      <div className="mt-20">
        <CTA  
          title="Like What You See?"
          description="Ready to start your own project? Let's discuss your requirements and create something amazing together."
          btnText="Start Your Project"
          btnHref="/contact"
          isArrow={false}
          marginB="mb-0"
        />
      </div>
      <Footer />
    </>
  );
};

export default PortfolioPage;
