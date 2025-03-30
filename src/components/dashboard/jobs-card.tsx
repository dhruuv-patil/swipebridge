
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, MapPin, Clock, ExternalLink } from "lucide-react";

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship" | "Freelance";
  postedAt: string;
  skills: string[];
  onApply: () => void;
}

export function JobCard({
  title,
  company,
  location,
  type,
  postedAt,
  skills,
  onApply,
}: JobCardProps) {
  const typeColors = {
    "Full-time": "bg-green-100 text-green-800",
    "Part-time": "bg-blue-100 text-blue-800",
    "Contract": "bg-purple-100 text-purple-800",
    "Internship": "bg-yellow-100 text-yellow-800",
    "Freelance": "bg-pink-100 text-pink-800",
  };

  return (
    <Card className="hover:shadow-md transition-all duration-200">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <Briefcase className="h-3 w-3 mr-1" />
              {company}
            </CardDescription>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeColors[type]}`}>
            {type}
          </span>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground mb-3">
          <div className="flex items-center">
            <MapPin className="h-3 w-3 mr-1" />
            {location}
          </div>
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {postedAt}
          </div>
        </div>
        <div className="flex flex-wrap gap-1 mb-4">
          {skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
        </div>
        <div className="flex justify-between">
          <Button variant="outline" size="sm">
            Save
          </Button>
          <Button size="sm" onClick={onApply}>
            Apply <ExternalLink className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function JobsSection() {
  const jobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "TechBridge",
      location: "Pune, Maharashtra",
      type: "Full-time" as const,
      postedAt: "2 days ago",
      skills: ["React", "JavaScript", "CSS", "HTML"],
    },
    {
      id: 2,
      title: "UI/UX Design Intern",
      company: "DesignHub",
      location: "Pune, Maharashtra",
      type: "Internship" as const,
      postedAt: "1 week ago",
      skills: ["Figma", "UI Design", "Wireframing"],
    },
    {
      id: 3,
      title: "Data Analyst",
      company: "DataInsights",
      location: "Pune, Maharashtra (Remote)",
      type: "Contract" as const,
      postedAt: "3 days ago",
      skills: ["SQL", "Python", "Data Visualization", "Excel"],
    },
  ];

  const handleApply = () => {
    alert("Application functionality will be added in the next version!");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Recommended Jobs</h2>
      {jobs.map((job) => (
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
      ))}
      <div className="text-center mt-4">
        <Button variant="outline">View More Jobs</Button>
      </div>
    </div>
  );
}
