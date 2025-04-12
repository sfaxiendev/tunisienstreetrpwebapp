
import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import HeaderSection from "../components/ui/HeaderSection";
import WhitelistForm from "../components/applications/WhitelistForm";

const WhitelistApp = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <HeaderSection 
        title="Whitelist Application"
        subtitle="Complete this form to join TUNISIEN STREET RP"
      />
      
      <main className="flex-1 mt-20">
        <section className="py-8 px-4">
          <div className="container mx-auto max-w-3xl">
            <WhitelistForm />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default WhitelistApp;
