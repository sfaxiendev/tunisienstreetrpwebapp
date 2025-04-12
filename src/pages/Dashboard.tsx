
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import HeaderSection from "../components/ui/HeaderSection";
import { ClipboardCheck, AlertTriangle, CheckCircle, Clock } from "lucide-react";

const Dashboard = () => {
  const { isAuthenticated, user, userProfile } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  // Get displayable user info
  const displayName = userProfile?.username || user?.email?.split('@')[0] || "User";
  const avatarUrl = userProfile?.avatar_url || "/placeholder.svg";

  // Mock data for applications - in a real app, this would come from API
  const mockApplications = [
    {
      id: "app1",
      type: "Whitelist",
      submittedDate: "2025-01-15",
      status: "approved",
      feedback: "Excellent application! Welcome to the server."
    },
    {
      id: "app2",
      type: "Gang",
      submittedDate: "2025-01-20",
      status: "pending",
      feedback: null
    },
    {
      id: "app3",
      type: "Admin",
      submittedDate: "2025-01-10",
      status: "rejected",
      feedback: "Not enough experience. Please reapply after gaining more server experience."
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-500/20 text-green-400";
      case "rejected":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-amber-500/20 text-amber-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle size={16} />;
      case "rejected":
        return <AlertTriangle size={16} />;
      default:
        return <Clock size={16} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <HeaderSection 
        title="Dashboard"
        subtitle={`Welcome, ${displayName}`}
      />
      
      <main className="flex-1 mt-20">
        <section className="py-8 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              {/* User Profile Card */}
              <div className="ts-card md:col-span-1 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-tunisien-red/50 mb-4">
                  <img
                    src={avatarUrl}
                    alt="User avatar"
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1">{displayName}</h3>
                <p className="text-tunisien-gray mb-4">Member since Jan 2025</p>
                <div className="w-full mt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-tunisien-gray">Discord ID</span>
                    <span className="font-medium">{userProfile?.discord_id || "Not connected"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-tunisien-gray">Status</span>
                    <span className="font-medium text-green-400">Active</span>
                  </div>
                </div>
              </div>
              
              {/* Applications Summary */}
              <div className="ts-card md:col-span-2">
                <div className="flex items-center gap-3 mb-6">
                  <ClipboardCheck className="h-6 w-6 text-tunisien-red" />
                  <h3 className="text-xl font-bold">Your Applications</h3>
                </div>
                
                {mockApplications.length > 0 ? (
                  <div className="space-y-4">
                    {mockApplications.map((app) => (
                      <div key={app.id} className="bg-secondary rounded-lg border border-tunisien-red/20 p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="bg-tunisien-red/20 text-tunisien-red px-2 py-0.5 rounded text-xs">
                              {app.type} Application
                            </span>
                            <h4 className="text-lg font-medium mt-2">Application #{app.id}</h4>
                            <p className="text-tunisien-gray text-sm">
                              Submitted on {new Date(app.submittedDate).toLocaleDateString()}
                            </p>
                          </div>
                          <div className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs ${getStatusColor(app.status)}`}>
                            {getStatusIcon(app.status)}
                            <span className="capitalize">{app.status}</span>
                          </div>
                        </div>
                        
                        {app.feedback && (
                          <div className="mt-4 pt-3 border-t border-tunisien-red/10">
                            <p className="text-sm text-tunisien-gray">Feedback:</p>
                            <p className="text-sm">{app.feedback}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-tunisien-gray mb-4">You haven't submitted any applications yet.</p>
                    <a href="/applications" className="ts-btn-primary">Apply Now</a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
