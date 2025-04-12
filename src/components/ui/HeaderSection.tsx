
import React from "react";

interface HeaderSectionProps {
  title: string;
  subtitle?: string;
  imagePath?: string;
  overlay?: boolean;
}

const HeaderSection = ({
  title,
  subtitle,
  imagePath = "/hero-bg.jpg", 
  overlay = true 
}: HeaderSectionProps) => {
  return (
    <div className="relative min-h-[300px] flex items-center justify-center text-center px-4 py-16">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${imagePath})` }}
        ></div>
        {overlay && <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/90"></div>}
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          <span className="text-tunisien-red">{title.split(" ")[0]}</span>{" "}
          {title.split(" ").slice(1).join(" ")}
        </h1>
        
        {subtitle && (
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default HeaderSection;
