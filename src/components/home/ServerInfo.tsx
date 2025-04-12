
import React from "react";
import { CheckCheck, Shield, Users, Zap, Server, Map, Database } from "lucide-react";

const ServerInfo = () => {
  const features = [
    {
      icon: <CheckCheck className="h-10 w-10 text-tunisien-red" />,
      title: "Whitelist Server",
      description:
        "Our server is whitelisted to ensure quality roleplay and a welcoming community.",
    },
    {
      icon: <Shield className="h-10 w-10 text-tunisien-red" />,
      title: "Active Staff",
      description:
        "Dedicated staff team monitoring the server 24/7 to help with any issues.",
    },
    {
      icon: <Users className="h-10 w-10 text-tunisien-red" />,
      title: "Growing Community",
      description:
        "Join our thriving community of roleplayers and make lasting connections.",
    },
    {
      icon: <Zap className="h-10 w-10 text-tunisien-red" />,
      title: "Custom Scripts",
      description:
        "Experience unique gameplay with our custom-developed scripts and systems.",
    },
    {
      icon: <Map className="h-10 w-10 text-tunisien-red" />,
      title: "Custom Locations",
      description:
        "Explore unique areas and businesses created exclusively for our server.",
    },
    {
      icon: <Database className="h-10 w-10 text-tunisien-red" />,
      title: "Regular Updates",
      description:
        "We continuously update our server with new features and improvements.",
    },
  ];

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Welcome to <span className="text-tunisien-red">TUNISIEN STREET</span> RP
          </h2>
          <p className="text-tunisien-gray text-lg">
            Experience immersive roleplay in our vibrant FiveM community. Our server offers
            a unique environment for players to create compelling characters and stories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="ts-card flex flex-col items-center text-center"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-tunisien-gray">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 max-w-4xl mx-auto bg-secondary rounded-lg p-6 border border-tunisien-red/20">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Server className="h-16 w-16 text-tunisien-red flex-shrink-0" />
            <div>
              <h3 className="text-2xl font-bold mb-2">Ready to join?</h3>
              <p className="text-tunisien-gray mb-4">
                Start your journey in TUNISIEN STREET RP by completing the whitelist
                application. Once approved, you'll be able to create your character and
                join our immersive world.
              </p>
              <div className="flex flex-wrap gap-4">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServerInfo;
