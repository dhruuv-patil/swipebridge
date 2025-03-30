
import { Navbar } from "@/components/navbar";
import { JobCard } from "@/components/dashboard/jobs-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Search, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship" | "Freelance";
  postedAt: string;
  skills: string[];
}

const JobsPage = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);

  const jobs: Job[] = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "TechBridge",
      location: "Pune, Maharashtra",
      type: "Full-time",
      postedAt: "2 days ago",
      skills: ["React", "JavaScript", "CSS", "HTML"],
    },
    {
      id: 2,
      title: "UI/UX Design Intern",
      company: "DesignHub",
      location: "Pune, Maharashtra",
      type: "Internship",
      postedAt: "1 week ago",
      skills: ["Figma", "UI Design", "Wireframing"],
    },
    {
      id: 3,
      title: "Data Analyst",
      company: "DataInsights",
      location: "Pune, Maharashtra (Remote)",
      type: "Contract",
      postedAt: "3 days ago",
      skills: ["SQL", "Python", "Data Visualization", "Excel"],
    },
    {
      id: 4,
      title: "Backend Developer",
      company: "CloudTech Solutions",
      location: "Pune, Maharashtra",
      type: "Full-time",
      postedAt: "1 day ago",
      skills: ["Node.js", "Express", "MongoDB", "AWS"],
    },
    {
      id: 5,
      title: "Social Media Manager",
      company: "GrowthMarketing",
      location: "Pune, Maharashtra (Hybrid)",
      type: "Part-time",
      postedAt: "5 days ago",
      skills: ["Social Media", "Content Creation", "Analytics"],
    },
    {
      id: 6,
      title: "Mobile App Developer",
      company: "AppGenius",
      location: "Pune, Maharashtra",
      type: "Freelance",
      postedAt: "1 week ago",
      skills: ["React Native", "iOS", "Android", "Firebase"],
    },
  ];

  const filteredJobs = jobs.filter(
    (job) =>
      (job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.skills.some((skill) =>
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        )) &&
      (selectedJobTypes.length === 0 || selectedJobTypes.includes(job.type))
  );

  const handleApply = () => {
    toast({
      title: "Application feature coming soon!",
      description: "This feature will be available in the next update.",
    });
  };

  const toggleJobType = (type: string) => {
    setSelectedJobTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  const jobTypes = ["Full-time", "Part-time", "Contract", "Internship", "Freelance"];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h1 className="text-2xl font-bold mb-4 md:mb-0">Job Opportunities</h1>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search jobs..."
                className="pl-8 w-full md:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-4">
                <h3 className="font-medium mb-2">Job Type</h3>
                <div className="space-y-2">
                  {jobTypes.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`job-type-${type}`} 
                        checked={selectedJobTypes.includes(type)}
                        onCheckedChange={() => toggleJobType(type)}
                      />
                      <Label htmlFor={`job-type-${type}`}>{type}</Label>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {selectedJobTypes.length > 0 && (
          <div className="flex gap-2 mb-4">
            {selectedJobTypes.map((type) => (
              <Badge key={type} variant="secondary" className="px-2 py-1">
                {type}
                <button
                  className="ml-1 hover:text-destructive"
                  onClick={() => toggleJobType(type)}
                >
                  ×
                </button>
              </Badge>
            ))}
            <Button
              variant="ghost"
              size="sm"
              className="h-6 text-xs"
              onClick={() => setSelectedJobTypes([])}
            >
              Clear all
            </Button>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                title={job.title}
                company={job.company}
                location={job.location}
                type={job.type}
                postedAt={job.postedAt}
                skills={job.skills}
                onApply={handleApply}
              />
            ))
          ) : (
            <div className="col-span-full py-8 text-center">
              <p className="text-muted-foreground">No jobs found matching your search.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default JobsPage;
