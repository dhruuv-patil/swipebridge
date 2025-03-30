
import { Navbar } from "@/components/navbar";
import { ConnectionCard } from "@/components/dashboard/connection-card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Search } from "lucide-react";

const ConnectionsPage = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  const connections = [
    {
      id: 1,
      name: "Priya Sharma",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      title: "UX Designer",
      company: "TechInnovate",
      mutualConnections: 4,
      skills: ["UI/UX Design", "Figma", "User Research"],
      isNew: true,
    },
    {
      id: 2,
      name: "Rahul Patel",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      title: "Full Stack Developer",
      company: "CodeCraft Solutions",
      mutualConnections: 6,
      skills: ["React", "Node.js", "MongoDB"],
      isNew: false,
    },
    {
      id: 3,
      name: "Aisha Khan",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
      title: "Marketing Specialist",
      company: "GrowthGurus",
      mutualConnections: 2,
      skills: ["Digital Marketing", "SEO", "Content Strategy"],
      isNew: true,
    },
    {
      id: 4,
      name: "Vikram Singh",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      title: "Startup Founder",
      company: "EcoTech Innovations",
      mutualConnections: 3,
      skills: ["Entrepreneurship", "Business Strategy", "Product Development"],
      isNew: false,
    },
  ];

  const filteredConnections = connections.filter(
    (connection) =>
      connection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      connection.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      connection.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      connection.skills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const handleMessage = () => {
    toast({
      title: "Messaging feature coming soon!",
      description: "This feature will be available in the next update.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h1 className="text-2xl font-bold mb-4 md:mb-0">My Connections</h1>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search connections..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredConnections.length > 0 ? (
            filteredConnections.map((connection) => (
              <ConnectionCard
                key={connection.id}
                name={connection.name}
                avatar={connection.avatar}
                title={connection.title}
                company={connection.company}
                mutualConnections={connection.mutualConnections}
                skills={connection.skills}
                isNew={connection.isNew}
                onMessage={handleMessage}
              />
            ))
          ) : (
            <div className="col-span-full py-8 text-center">
              <p className="text-muted-foreground">No connections found matching your search.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ConnectionsPage;
