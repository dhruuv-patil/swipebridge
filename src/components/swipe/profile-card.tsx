
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { X, Check, Briefcase, MapPin, GraduationCap, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface ProfileData {
  id: string;
  name: string;
  age: number;
  photo: string;
  occupation: string;
  company: string;
  location: string;
  education: string;
  bio: string;
  skills: string[];
  lookingFor: string[];
}

interface ProfileCardProps {
  profile: ProfileData;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

export function ProfileCard({ profile, onSwipeLeft, onSwipeRight }: ProfileCardProps) {
  const [currentDirection, setCurrentDirection] = useState<"left" | "right" | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleSwipe = (direction: "left" | "right") => {
    setCurrentDirection(direction);
    setTimeout(() => {
      if (direction === "left") {
        onSwipeLeft();
      } else {
        onSwipeRight();
      }
    }, 300);
  };

  return (
    <Card 
      className={cn(
        "swipe-card max-w-md w-full h-[40rem] mx-auto transition-all",
        currentDirection === "left" && "animate-swipe-left",
        currentDirection === "right" && "animate-swipe-right"
      )}
    >
      <div 
        className="h-1/2 bg-cover bg-center rounded-t-xl cursor-pointer"
        style={{ backgroundImage: `url(${profile.photo})` }}
        onClick={() => setShowDetails(!showDetails)}
      >
        <div className="w-full h-full bg-gradient-to-b from-transparent to-black/70 flex flex-col justify-end p-4">
          <h3 className="text-white text-2xl font-bold">{profile.name}, {profile.age}</h3>
          <div className="flex items-center text-white/90 mt-1">
            <Briefcase className="h-4 w-4 mr-1" />
            <span className="text-sm">{profile.occupation} at {profile.company}</span>
          </div>
          <div className="flex items-center text-white/90 mt-1">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">{profile.location}</span>
          </div>
          <div className="flex items-center text-white/90 mt-1">
            <GraduationCap className="h-4 w-4 mr-1" />
            <span className="text-sm">{profile.education}</span>
          </div>
        </div>
      </div>
      
      <CardContent className="p-4 h-[40%] overflow-hidden">
        <ScrollArea className="h-full pr-4">
          {!showDetails ? (
            <>
              <p className="text-sm text-muted-foreground mb-4">{profile.bio}</p>
              <div className="flex flex-wrap gap-1">
                {profile.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs mb-1">
                    {skill}
                  </Badge>
                ))}
              </div>
              <Button 
                variant="link" 
                className="p-0 h-auto text-primary mt-2"
                onClick={() => setShowDetails(true)}
              >
                Show more details
              </Button>
            </>
          ) : (
            <div className="space-y-4">
              <h4 className="font-semibold flex items-center gap-1">
                <User className="h-4 w-4" /> About
              </h4>
              <p className="text-sm text-muted-foreground">{profile.bio}</p>
              
              <h4 className="font-semibold">Skills</h4>
              <div className="flex flex-wrap gap-1">
                {profile.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs mb-1">
                    {skill}
                  </Badge>
                ))}
              </div>
              
              <h4 className="font-semibold">Looking for</h4>
              <div className="flex flex-wrap gap-1">
                {profile.lookingFor.map((item) => (
                  <Badge key={item} variant="outline" className="text-xs mb-1">
                    {item}
                  </Badge>
                ))}
              </div>
              
              <Button 
                variant="link" 
                className="p-0 h-auto text-primary"
                onClick={() => setShowDetails(false)}
              >
                Show less
              </Button>
            </div>
          )}
        </ScrollArea>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <div className="swipe-actions w-full">
          <Button 
            variant="outline" 
            size="icon" 
            className="swipe-button swipe-left"
            onClick={() => handleSwipe("left")}
          >
            <X className="h-6 w-6" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="swipe-button swipe-right"
            onClick={() => handleSwipe("right")}
          >
            <Check className="h-6 w-6" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
