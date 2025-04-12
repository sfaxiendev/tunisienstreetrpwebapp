
import React, { useState, useEffect } from "react";
import { AlertCircle, Book, RefreshCw } from "lucide-react";

// Mock rules data - in a real app, this would come from Discord API
const mockRules = [
  {
    id: "1",
    category: "General Rules",
    rules: [
      {
        id: "1.1",
        title: "Respect All Players",
        description: "Be respectful to all players. Harassment, discrimination, and hate speech are strictly prohibited.",
      },
      {
        id: "1.2",
        title: "No RDM (Random Death Match)",
        description: "Killing players without a valid RP reason is not allowed. All conflicts must be initiated through proper roleplay.",
      },
      {
        id: "1.3",
        title: "No VDM (Vehicle Death Match)",
        description: "Using vehicles to kill players without roleplay context is prohibited.",
      },
      {
        id: "1.4",
        title: "No Metagaming",
        description: "Using information your character wouldn't know in-game is prohibited. This includes information from Discord, streams, or out-of-character sources.",
      },
    ],
  },
  {
    id: "2",
    category: "Roleplay Guidelines",
    rules: [
      {
        id: "2.1",
        title: "Value Your Life",
        description: "Your character should fear death and act accordingly in dangerous situations.",
      },
      {
        id: "2.2",
        title: "Stay In Character",
        description: "Maintain roleplay at all times. Out-of-character (OOC) chat should be kept to a minimum and used only when necessary.",
      },
      {
        id: "2.3",
        title: "No Combat Logging",
        description: "Disconnecting during active roleplay or to avoid consequences is prohibited.",
      },
    ],
  },
  {
    id: "3",
    category: "Criminal Activity",
    rules: [
      {
        id: "3.1",
        title: "Robbery Requirements",
        description: "Large robberies require a minimum of 4 hostages. All robberies must have proper planning and roleplay buildup.",
      },
      {
        id: "3.2",
        title: "Gang Violence",
        description: "Gang wars and territory disputes must have valid roleplay reasons and cannot be random.",
      },
    ],
  },
];

const RulesDisplay = () => {
  const [rules, setRules] = useState(mockRules);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>("1");

  // In a real app, this would fetch rules from Discord API
  useEffect(() => {
    // Simulated API call
    const fetchRules = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        // In a real app, we would fetch from Discord API here
        setRules(mockRules);
      } catch (err) {
        setError("Failed to load rules. Please try again later.");
        console.error("Error fetching rules:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRules();
  }, []);

  const handleRefresh = () => {
    // In a real app, this would re-fetch the rules from Discord
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <section className="py-8 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Header with refresh button */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Book className="h-6 w-6 text-tunisien-red" />
            <h2 className="text-2xl font-bold">Server Rules</h2>
          </div>
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="flex items-center gap-2 text-sm text-tunisien-gray hover:text-tunisien-red transition-colors disabled:opacity-50"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            <span>Refresh</span>
          </button>
        </div>
        
        {/* Error message */}
        {error && (
          <div className="mb-6 bg-red-900/20 border border-red-800 text-red-300 px-4 py-3 rounded-md flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
            <p>{error}</p>
          </div>
        )}
        
        {loading ? (
          <div className="bg-secondary rounded-lg border border-tunisien-red/20 p-8 text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-tunisien-red mx-auto mb-4"></div>
            <p className="text-tunisien-gray">Loading rules...</p>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-6">
            {/* Categories sidebar */}
            <div className="md:w-1/4">
              <div className="bg-secondary rounded-lg border border-tunisien-red/20 p-4 sticky top-20">
                <h3 className="font-medium mb-3 text-tunisien-gray">Categories</h3>
                <ul className="space-y-1">
                  {rules.map((category) => (
                    <li key={category.id}>
                      <button
                        onClick={() => setActiveCategory(category.id)}
                        className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                          activeCategory === category.id
                            ? "bg-tunisien-red/10 text-tunisien-red"
                            : "hover:bg-tunisien-red/5 text-white hover:text-tunisien-red"
                        }`}
                      >
                        {category.category}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Rules content */}
            <div className="md:w-3/4">
              {rules
                .filter((category) => activeCategory === null || category.id === activeCategory)
                .map((category) => (
                  <div key={category.id} className="mb-8">
                    <h3 className="text-xl font-bold mb-4 pb-2 border-b border-tunisien-red/30">
                      {category.category}
                    </h3>
                    <div className="space-y-4">
                      {category.rules.map((rule) => (
                        <div key={rule.id} className="bg-secondary rounded-lg border border-tunisien-red/20 p-4 transition-transform hover:-translate-y-1">
                          <div className="flex gap-2 items-center mb-2">
                            <span className="bg-tunisien-red/20 text-tunisien-red px-2 py-0.5 rounded-md text-xs font-medium">
                              Rule {rule.id}
                            </span>
                            <h4 className="font-medium">{rule.title}</h4>
                          </div>
                          <p className="text-tunisien-gray">{rule.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
        
        {/* Important note */}
        <div className="mt-8 bg-tunisien-red/10 border border-tunisien-red/30 rounded-lg p-4 flex gap-3">
          <AlertCircle className="h-6 w-6 text-tunisien-red flex-shrink-0" />
          <div>
            <p className="text-white font-medium mb-1">Important Note</p>
            <p className="text-tunisien-gray">
              Rules are subject to change. Players are responsible for staying updated with the latest rules. 
              Check back regularly or join our Discord server to receive rule update notifications.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RulesDisplay;
