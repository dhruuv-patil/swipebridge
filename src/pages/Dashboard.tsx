
import { Navbar } from "@/components/navbar";
import { SwipeContainer } from "@/components/swipe/swipe-container";
import { ConnectionCard } from "@/components/dashboard/connection-card";
import { JobsSection } from "@/components/dashboard/jobs-card";
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const { toast } = useToast();

  const recentConnections = [
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
      name: "Aisha Khan",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
      title: "Marketing Specialist",
      company: "GrowthGurus",
      mutualConnections: 2,
      skills: ["Digital Marketing", "SEO", "Content Strategy"],
      isNew: true,
    },
  ];

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
        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Column - Recent Connections */}
          <div className="hidden md:block space-y-6">
            <h2 className="text-xl font-bold">Recent Connections</h2>
            {recentConnections.map((connection) => (
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
            ))}
          </div>

          {/* Middle Column - Swipe Experience */}
          <div className="md:col-span-1">
            <div className="mb-4 text-center">
              <h2 className="text-xl font-bold">Discover Connections</h2>
              <p className="text-muted-foreground">Swipe right to connect, left to pass</p>
            </div>
            <SwipeContainer />
          </div>

          {/* Right Column - Job Opportunities */}
          <div className="hidden md:block">
            <JobsSection />
          </div>
        </div>

        {/* Mobile View - Tabs for other sections */}
        <div className="md:hidden mt-8 space-y-8">
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Recent Connections</h2>
            {recentConnections.map((connection) => (
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
            ))}
          </div>
          
          <JobsSection />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
