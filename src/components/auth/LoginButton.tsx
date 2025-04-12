
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, User, LogOut, Settings, FileText } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const LoginButton = () => {
  const { isAuthenticated, logout, user, userProfile } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (isAuthenticated && user) {
    // Get display name from profile or email
    const displayName = userProfile?.username || user.email?.split('@')[0] || "User";
    
    // Get avatar from profile or use placeholder
    const avatarUrl = userProfile?.avatar_url || "/placeholder.svg";
    
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={toggleDropdown}
          className="flex items-center gap-2 bg-secondary/50 hover:bg-secondary rounded-full p-1 pl-4 transition-colors"
        >
          <span className="text-sm font-medium truncate max-w-[100px]">
            {displayName}
          </span>
          <div className="h-8 w-8 rounded-full overflow-hidden border-2 border-tunisien-red/50">
            <img
              src={avatarUrl}
              alt="User avatar"
              className="h-full w-full object-cover"
            />
          </div>
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-secondary rounded-md shadow-lg overflow-hidden z-20 animate-fade-in border border-tunisien-red/20">
            <div className="px-4 py-3 border-b border-tunisien-red/20">
              <p className="text-sm text-foreground">Signed in as</p>
              <p className="text-sm font-medium truncate">{displayName}</p>
            </div>

            <div className="py-1">
              <Link
                to="/dashboard"
                className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-tunisien-red/10 hover:text-tunisien-red"
                onClick={() => setIsDropdownOpen(false)}
              >
                <User size={16} />
                Dashboard
              </Link>
              <Link
                to="/dashboard/applications"
                className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-tunisien-red/10 hover:text-tunisien-red"
                onClick={() => setIsDropdownOpen(false)}
              >
                <FileText size={16} />
                My Applications
              </Link>
              <Link
                to="/dashboard/settings"
                className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-tunisien-red/10 hover:text-tunisien-red"
                onClick={() => setIsDropdownOpen(false)}
              >
                <Settings size={16} />
                Settings
              </Link>
              <button
                onClick={() => {
                  logout();
                  setIsDropdownOpen(false);
                }}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-tunisien-red/10 hover:text-tunisien-red text-left"
              >
                <LogOut size={16} />
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={() => navigate("/auth")}
      className="flex items-center gap-2 text-white font-medium bg-tunisien-red hover:bg-tunisien-red/90 px-4 py-2 rounded-md transition-colors"
    >
      <LogIn size={18} />
      <span>Login with Discord</span>
    </button>
  );
};

export default LoginButton;
