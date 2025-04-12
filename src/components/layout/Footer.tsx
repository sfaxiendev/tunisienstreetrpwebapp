import React from "react";
import { Link } from "react-router-dom";
import { MessageCircle, Globe, MessageSquare, Users, Book, Map, Cpu } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-tunisien-dark border-t border-tunisien-red/10 mt-12 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">
              <span className="text-tunisien-red">TUNISIEN</span> STREET RP
            </h3>
            <p className="text-tunisien-gray max-w-md">
              Experience immersive roleplay in our vibrant FiveM community. Join today and create your own story in our realistic world.
            </p>
            <div className="flex items-center space-x-4">
              <a href="https://discord.gg/tunisienstreet" target="_blank" rel="noopener noreferrer" 
                className="bg-[#5865F2] p-2 rounded-full hover:bg-[#4a55d4] transition-colors">
                <MessageCircle size={18} className="text-white" />
              </a>
              <a href="https://fivem.net/servers/tunisienstreet" target="_blank" rel="noopener noreferrer"
                className="bg-tunisien-red p-2 rounded-full hover:bg-tunisien-red/80 transition-colors">
                <Globe size={18} className="text-white" />
              </a>
            </div>
          </div>
          
          
          <div className="md:px-4">
            <h4 className="font-medium text-white mb-4 border-b border-tunisien-red/30 pb-2">Navigation</h4>
            <div className="space-y-2">
              <Link to="/" className="flex items-center gap-2 text-tunisien-gray hover:text-tunisien-red transition-colors">
                <Globe size={16} />
                <span>Home</span>
              </Link>
              <Link to="/rules" className="flex items-center gap-2 text-tunisien-gray hover:text-tunisien-red transition-colors">
                <Book size={16} />
                <span>Rules</span>
              </Link>
              <Link to="/applications/whitelist" className="flex items-center gap-2 text-tunisien-gray hover:text-tunisien-red transition-colors">
                <Users size={16} />
                <span>Applications</span>
              </Link>
              <Link to="/patch-notes" className="flex items-center gap-2 text-tunisien-gray hover:text-tunisien-red transition-colors">
                <Cpu size={16} />
                <span>Patch Notes</span>
              </Link>
            </div>
          </div>
          
          
          <div>
            <h4 className="font-medium text-white mb-4 border-b border-tunisien-red/30 pb-2">Applications</h4>
            <div className="space-y-2">
              <Link to="/applications/whitelist" className="flex items-center gap-2 text-tunisien-gray hover:text-tunisien-red transition-colors">
                <MessageSquare size={16} />
                <span>Whitelist Application</span>
              </Link>
              <Link to="/applications/admin" className="flex items-center gap-2 text-tunisien-gray hover:text-tunisien-red transition-colors">
                <Map size={16} />
                <span>Admin Application</span>
              </Link>
              <Link to="/applications/gang" className="flex items-center gap-2 text-tunisien-gray hover:text-tunisien-red transition-colors">
                <Users size={16} />
                <span>Gang Application</span>
              </Link>
            </div>
          </div>
        </div>
        
        
        <div className="mt-8 pt-4 border-t border-tunisien-red/10 text-center text-tunisien-gray text-sm">
          <p>© {new Date().getFullYear()} TUNISIEN STREET RP. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
