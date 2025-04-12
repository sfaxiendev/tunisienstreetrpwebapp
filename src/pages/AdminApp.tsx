
import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import HeaderSection from "../components/ui/HeaderSection";
import AdminForm from "../components/applications/AdminForm";

const AdminApp = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <HeaderSection 
        title="Admin Application"
        subtitle="Apply to join our server administration team"
      />
      
      <main className="flex-1 mt-20">
        <section className="py-8 px-4">
          <div className="container mx-auto max-w-3xl">
            <AdminForm />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminApp;
