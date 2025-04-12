
import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import HeaderSection from "../components/ui/HeaderSection";
import GangForm from "../components/applications/GangForm";

const GangApp = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <HeaderSection 
        title="Gang Application"
        subtitle="Apply to create your own gang on TUNISIEN STREET RP"
      />
      
      <main className="flex-1 mt-20">
        <section className="py-8 px-4">
          <div className="container mx-auto max-w-3xl">
            <GangForm />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default GangApp;
