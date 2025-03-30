
import { useState, useEffect } from "react";
import { ProfileCard, ProfileData } from "./profile-card";
import { useToast } from "@/components/ui/use-toast";

// Mock profiles data
const mockProfiles: ProfileData[] = [
  {
    id: "1",
    name: "Priya Sharma",
    age: 24,
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    occupation: "UX Designer",
    company: "TechInnovate",
    location: "Pune, Maharashtra",
    education: "NID Ahmedabad",
    bio: "Passionate about creating user-friendly interfaces that solve real problems. Looking to collaborate with startups and tech companies in Pune.",
    skills: ["UI/UX Design", "Figma", "User Research", "Wireframing", "Prototyping"],
    lookingFor: ["Full-time opportunities", "Startup collaboration", "Mentorship"]
  },
  {
    id: "2",
    name: "Rahul Patel",
    age: 26,
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    occupation: "Full Stack Developer",
    company: "CodeCraft Solutions",
    location: "Pune, Maharashtra",
    education: "COEP Pune",
    bio: "Full stack developer with expertise in MERN stack. I'm passionate about building scalable web applications and mentoring junior developers.",
    skills: ["React", "Node.js", "MongoDB", "Express", "JavaScript", "TypeScript"],
    lookingFor: ["Tech meetups", "Freelance projects", "Co-founder opportunities"]
  },
  {
    id: "3",
    name: "Aisha Khan",
    age: 22,
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
    occupation: "Marketing Specialist",
    company: "GrowthGurus",
    location: "Pune, Maharashtra",
    education: "Symbiosis Institute",
    bio: "Digital marketing specialist with a focus on growth hacking for startups. Experienced in campaign management and social media strategy.",
    skills: ["Digital Marketing", "SEO", "Content Strategy", "Analytics", "Social Media"],
    lookingFor: ["Startup opportunities", "Networking", "Workshops"]
  },
  {
    id: "4",
    name: "Vikram Singh",
    age: 29,
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    occupation: "Startup Founder",
    company: "EcoTech Innovations",
    location: "Pune, Maharashtra",
    education: "IIT Bombay",
    bio: "Founder of a sustainability focused startup. Looking to connect with talented individuals passionate about making a positive environmental impact.",
    skills: ["Entrepreneurship", "Business Strategy", "Product Development", "Sustainability"],
    lookingFor: ["Tech talent", "Co-founder", "Investors", "Mentors"]
  },
  {
    id: "5",
    name: "Sneha Joshi",
    age: 25,
    photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    occupation: "Data Scientist",
    company: "AnalyticsAI",
    location: "Pune, Maharashtra",
    education: "BITS Pilani",
    bio: "Data scientist with expertise in machine learning and AI. Passionate about solving complex problems with data-driven solutions.",
    skills: ["Python", "Machine Learning", "AI", "Data Analysis", "SQL", "TensorFlow"],
    lookingFor: ["Research collaboration", "Meetups", "Knowledge sharing"]
  }
];

export function SwipeContainer() {
  const [profiles, setProfiles] = useState<ProfileData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [connections, setConnections] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, this would be a fetch call to an API
    const fetchProfiles = () => {
      setProfiles(mockProfiles);
    };
    
    fetchProfiles();
  }, []);

  const handleSwipeLeft = () => {
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // No more profiles to show
      toast({
        title: "No more profiles",
        description: "You've seen all available profiles for now.",
      });
    }
  };

  const handleSwipeRight = () => {
    if (currentIndex < profiles.length) {
      // Add to connections
      const newConnection = profiles[currentIndex].id;
      setConnections([...connections, newConnection]);
      
      toast({
        title: "New connection!",
        description: `You've connected with ${profiles[currentIndex].name}`,
      });
      
      if (currentIndex < profiles.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        // No more profiles to show
        toast({
          title: "No more profiles",
          description: "You've seen all available profiles for now.",
        });
      }
    }
  };

  if (profiles.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Loading profiles...</p>
      </div>
    );
  }

  if (currentIndex >= profiles.length) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4 text-center">
        <h3 className="text-2xl font-bold mb-2">You've seen all profiles</h3>
        <p className="text-muted-foreground mb-4">Check back later for more connections or explore your existing matches.</p>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <ProfileCard 
        profile={profiles[currentIndex]}
        onSwipeLeft={handleSwipeLeft}
        onSwipeRight={handleSwipeRight}
      />
    </div>
  );
}
