
import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ServerInfo from "../components/home/ServerInfo";
import ImageGallery from "../components/home/ImageGallery";
import { ChevronDown } from "lucide-react";
import HeaderSection from "../components/ui/HeaderSection";

const Index = () => {
  const scrollToContent = () => {
    const contentSection = document.getElementById("content");
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center px-4">
        {/* Background with overlay */}
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center bg-fixed"
            style={{ backgroundImage: "url('https://i.imgur.com/j6JmCtG.jpg')" }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/90"></div>
        </div>
        
        {/* Hero content */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
            <span className="text-tunisien-red">TUNISIEN</span> STREET RP
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto animate-fade-in">
            Immerse yourself in a vibrant roleplay experience. Create your story, forge alliances, 
            and leave your mark on our dynamic FiveM server.
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in">
            <a
              href="/applications/whitelist"
              className="ts-btn-primary"
            >
              Apply Now
            </a>
            <a
              href="https://discord.gg/tunisienstreet"
              target="_blank"
              rel="noopener noreferrer"
              className="ts-btn-outline"
            >
              Join Discord
            </a>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <button
          onClick={scrollToContent}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce p-2"
          aria-label="Scroll to content"
        >
          <ChevronDown className="h-8 w-8 text-white" />
        </button>
      </section>
      
      <main id="content" className="flex-1">
        <ServerInfo />
        <ImageGallery />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
