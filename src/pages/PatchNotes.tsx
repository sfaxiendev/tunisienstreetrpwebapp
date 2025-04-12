
import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import HeaderSection from "../components/ui/HeaderSection";
import PatchNotes from "../components/patches/PatchNotes";

const PatchNotesPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <HeaderSection 
        title="Patch Notes"
        subtitle="Stay updated with the latest changes and improvements to the server"
      />
      
      <main className="flex-1 mt-20">
        <PatchNotes />
      </main>
      
      <Footer />
    </div>
  );
};

export default PatchNotesPage;
