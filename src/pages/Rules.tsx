
import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import HeaderSection from "../components/ui/HeaderSection";
import RulesDisplay from "../components/rules/RulesDisplay";

const Rules = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <HeaderSection 
        title="Server Rules"
        subtitle="Follow these guidelines to ensure a quality roleplay experience for everyone"
      />
      
      <main className="flex-1 mt-20">
        <RulesDisplay />
      </main>
      
      <Footer />
    </div>
  );
};

export default Rules;
