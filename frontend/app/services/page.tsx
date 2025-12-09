import CTA from "@/components/CTA-section";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ServicesSection } from "@/components/services-section";
import React from "react";

const ServicesPage = () => {
  return (
    <>
      <Header />
      <ServicesSection />

      <div className="px-4 sm:px-6 lg:px-8 xl:px-24">
        <CTA
          title="Need a Custom Solution?"
          description="Every business is unique. Let's discuss your specific requirements and create a tailored solution that fits your needs and budget."
          isArrow={false}
          btnText="Get Custom Quote"
          btnHref="/contact"
        />
      </div>

      <Footer />
    </>
  );
};

export default ServicesPage;
