
import React, { useState, useEffect } from "react";
import { Calendar, Tag, ChevronDown, AlertCircle, RefreshCw } from "lucide-react";

// Mock patch notes data - in a real app, this would come from Discord API
const mockPatchNotes = [
  {
    id: "1",
    version: "v1.2.3",
    date: "2025-01-15",
    title: "Major Content Update",
    description: "This update brings several new features and improvements to enhance your roleplay experience.",
    tags: ["Feature", "Improvement"],
    changes: [
      { type: "add", content: "Added new police vehicles and equipment" },
      { type: "add", content: "Added 10 new custom locations around the map" },
      { type: "improve", content: "Enhanced vehicle handling and physics" },
      { type: "fix", content: "Fixed issue with inventory system" },
      { type: "fix", content: "Fixed several map glitches and collision issues" },
    ],
  },
  {
    id: "2",
    version: "v1.1.5",
    date: "2024-12-28",
    title: "Performance Optimization",
    description: "This update focuses on improving server performance and fixing critical bugs.",
    tags: ["Optimization", "Bug Fix"],
    changes: [
      { type: "improve", content: "Optimized server performance to reduce lag" },
      { type: "improve", content: "Reduced server restart frequency" },
      { type: "fix", content: "Fixed crash issues related to custom vehicles" },
      { type: "fix", content: "Fixed money exploit in banking system" },
    ],
  },
  {
    id: "3",
    version: "v1.1.0",
    date: "2024-12-15",
    title: "New Jobs and Economy Update",
    description: "This update introduces new job opportunities and revamps the economy system.",
    tags: ["Feature", "Economy"],
    changes: [
      { type: "add", content: "Added fishing job with custom locations and progression" },
      { type: "add", content: "Added mining job with unique resource gathering" },
      { type: "improve", content: "Balanced economy and job payouts" },
      { type: "improve", content: "Enhanced inventory system with categories" },
      { type: "fix", content: "Fixed issues with item persistence" },
    ],
  },
];

const PatchNotes = () => {
  const [patchNotes, setPatchNotes] = useState(mockPatchNotes);
  const [expandedNotes, setExpandedNotes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // In a real app, this would fetch patch notes from Discord API
  useEffect(() => {
    // Simulated API call
    const fetchPatchNotes = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        // In a real app, we would fetch from Discord API here
        setPatchNotes(mockPatchNotes);
        // Expand the most recent patch note by default
        if (mockPatchNotes.length > 0) {
          setExpandedNotes([mockPatchNotes[0].id]);
        }
      } catch (err) {
        setError("Failed to load patch notes. Please try again later.");
        console.error("Error fetching patch notes:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPatchNotes();
  }, []);

  const handleRefresh = () => {
    // In a real app, this would re-fetch the patch notes from Discord
    setLoading(true);
    setTimeout(() => {
      if (mockPatchNotes.length > 0) {
        setExpandedNotes([mockPatchNotes[0].id]);
      }
      setLoading(false);
    }, 1000);
  };

  const toggleExpanded = (id: string) => {
    setExpandedNotes(prev => 
      prev.includes(id) 
        ? prev.filter(noteId => noteId !== id) 
        : [...prev, id]
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  return (
    <section className="py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header with refresh button */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Patch Notes</h2>
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
            <p className="text-tunisien-gray">Loading patch notes...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {patchNotes.map((note) => (
              <div 
                key={note.id} 
                className="bg-secondary rounded-lg border border-tunisien-red/20 overflow-hidden"
              >
                {/* Note header - always visible */}
                <div 
                  className="p-4 cursor-pointer flex justify-between items-center"
                  onClick={() => toggleExpanded(note.id)}
                >
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-tunisien-red text-white px-2 py-1 rounded text-xs font-medium">
                        {note.version}
                      </span>
                      <div className="flex items-center gap-1 text-tunisien-gray text-sm">
                        <Calendar size={14} />
                        <span>{formatDate(note.date)}</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-medium">{note.title}</h3>
                  </div>
                  <ChevronDown 
                    size={20} 
                    className={`transition-transform ${expandedNotes.includes(note.id) ? 'rotate-180' : ''}`} 
                  />
                </div>
                
                {/* Expandable content */}
                {expandedNotes.includes(note.id) && (
                  <div className="px-4 pb-4 animate-fade-in">
                    <div className="pt-2 pb-4 border-t border-tunisien-red/20">
                      <p className="text-tunisien-gray mb-4">{note.description}</p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {note.tags.map((tag, idx) => (
                          <div 
                            key={idx} 
                            className="flex items-center gap-1 bg-tunisien-red/10 text-tunisien-red px-2 py-0.5 rounded text-xs"
                          >
                            <Tag size={12} />
                            <span>{tag}</span>
                          </div>
                        ))}
                      </div>
                      
                      {/* Changes list */}
                      <div className="space-y-2">
                        {note.changes.map((change, idx) => (
                          <div 
                            key={idx} 
                            className="flex items-start gap-2 py-1"
                          >
                            <span 
                              className={`inline-block w-5 h-5 rounded-full flex items-center justify-center text-xs mt-0.5 ${
                                change.type === 'add' 
                                  ? 'bg-green-500/20 text-green-400' 
                                  : change.type === 'fix' 
                                    ? 'bg-blue-500/20 text-blue-400'
                                    : 'bg-amber-500/20 text-amber-400'
                              }`}
                            >
                              {change.type === 'add' ? '+' : change.type === 'fix' ? '✓' : '↑'}
                            </span>
                            <span className="text-tunisien-gray">{change.content}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {patchNotes.length === 0 && !loading && (
              <div className="bg-secondary rounded-lg border border-tunisien-red/20 p-8 text-center">
                <p className="text-tunisien-gray">No patch notes available</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default PatchNotes;
