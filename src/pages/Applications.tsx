
import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import HeaderSection from "../components/ui/HeaderSection";
import { Link } from "react-router-dom";
import { Users, ShieldCheck, Group } from "lucide-react";

const Applications = () => {
  const applicationTypes = [
    {
      title: "Whitelist Application",
      description: "Apply to join the server and create your character",
      icon: <Users className="h-12 w-12 text-tunisien-red" />,
      path: "/applications/whitelist",
    },
    {
      title: "Admin Application",
      description: "Apply to become a server administrator",
      icon: <ShieldCheck className="h-12 w-12 text-tunisien-red" />,
      path: "/applications/admin",
    },
    {
      title: "Gang Application",
      description: "Apply to create your own gang on the server",
      icon: <Group className="h-12 w-12 text-tunisien-red" />,
      path: "/applications/gang",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <HeaderSection 
        title="Applications"
        subtitle="Choose an application type to get started"
      />
      
      <main className="flex-1 mt-20">
        <section className="py-8 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {applicationTypes.map((app, index) => (
                <Link 
                  key={index} 
                  to={app.path}
                  className="ts-card flex flex-col items-center text-center hover:-translate-y-2"
                >
                  <div className="mb-4">{app.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{app.title}</h3>
                  <p className="text-tunisien-gray mb-4">{app.description}</p>
                  <span className="ts-btn-primary mt-auto">Apply Now</span>
                </Link>
              ))}
            </div>
            
            <div className="mt-12 bg-secondary rounded-lg border border-tunisien-red/20 p-6">
              <h3 className="text-xl font-bold mb-4">Application Guidelines</h3>
              <div className="text-tunisien-gray space-y-4">
                <p>
                  All applications are reviewed by our staff team. Please allow 24-48 hours for a response.
                  Applications that do not meet our standards may be rejected.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Complete all required fields honestly and thoroughly</li>
                  <li>Take your time to write detailed responses</li>
                  <li>Provide examples and scenarios when asked</li>
                  <li>Be original and creative with your character concepts</li>
                  <li>Demonstrate understanding of roleplay principles</li>
                </ul>
                <p>
                  If your application is rejected, you may apply again after 7 days with improvements
                  based on the feedback provided.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Applications;
