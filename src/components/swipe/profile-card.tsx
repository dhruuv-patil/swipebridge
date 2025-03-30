
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { X, Check, Briefcase, MapPin, GraduationCap, User, Heart, Star, ThumbsDown } from "lucide-react";
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
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleSwipe = (direction: "left" | "right") => {
    setCurrentDirection(direction);
    setTimeout(() => {
      if (direction === "left") {
        onSwipeLeft();
      } else {
        onSwipeRight();
      }
      setDragX(0);
    }, 300);
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    
    const clientX = 'touches' in e 
      ? e.touches[0].clientX 
      : e.clientX;
    
    const cardElement = e.currentTarget as HTMLElement;
    const rect = cardElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    
    setDragX(clientX - centerX);
  };

  const handleDragEnd = () => {
    if (Math.abs(dragX) > 100) {
      handleSwipe(dragX > 0 ? "right" : "left");
    } else {
      setDragX(0);
    }
    setIsDragging(false);
  };

  const dragRotation = dragX * 0.1;
  const dragOpacity = Math.min(1, Math.abs(dragX) / 100);
  
  const likeOpacity = dragX > 0 ? dragOpacity : 0;
  const passOpacity = dragX < 0 ? dragOpacity : 0;

  return (
    <Card 
      className={cn(
        "swipe-card max-w-md w-full h-[40rem] mx-auto transition-all relative cursor-grab active:cursor-grabbing",
        currentDirection === "left" && "animate-swipe-left",
        currentDirection === "right" && "animate-swipe-right"
      )}
      style={{ 
        transform: isDragging ? `translateX(${dragX}px) rotate(${dragRotation}deg)` : undefined,
        transition: isDragging ? 'none' : 'transform 0.3s ease'
      }}
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
    >
      {/* Like and Pass overlay indicators */}
      <div 
        className="absolute top-8 right-8 bg-green-500 text-white font-bold text-xl p-2 rounded-lg transform rotate-12 z-10 transition-opacity flex items-center"
        style={{ opacity: likeOpacity }}
      >
        <Heart className="h-6 w-6 mr-1 fill-white" /> LIKE
      </div>
      <div 
        className="absolute top-8 left-8 bg-red-500 text-white font-bold text-xl p-2 rounded-lg transform -rotate-12 z-10 transition-opacity flex items-center"
        style={{ opacity: passOpacity }}
      >
        <ThumbsDown className="h-6 w-6 mr-1" /> PASS
      </div>
      
      <div 
        className="h-1/2 bg-cover bg-center rounded-t-xl cursor-pointer relative overflow-hidden"
        style={{ backgroundImage: `url(${profile.photo})` }}
        onClick={() => setShowDetails(!showDetails)}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70 flex flex-col justify-end p-4">
          <div className="animate-fade-in">
            <div className="flex justify-between items-end">
              <h3 className="text-white text-3xl font-bold">{profile.name}, {profile.age}</h3>
              <Badge className="bg-primary/80 hover:bg-primary text-white px-2 py-1">
                <Star className="h-3 w-3 mr-1 fill-white" /> {profile.occupation}
              </Badge>
            </div>
            <div className="flex items-center text-white/90 mt-2">
              <Briefcase className="h-4 w-4 mr-1" />
              <span className="text-sm">{profile.company}</span>
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
      </div>
      
      <CardContent className="p-4 h-[40%] overflow-hidden">
        <ScrollArea className="h-full pr-4">
          {!showDetails ? (
            <>
              <p className="text-sm text-muted-foreground mb-4">{profile.bio}</p>
              <div className="flex flex-wrap gap-1">
                {profile.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs mb-1 hover-scale">
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
            <div className="space-y-4 animate-fade-in">
              <h4 className="font-semibold flex items-center gap-1">
                <User className="h-4 w-4" /> About
              </h4>
              <p className="text-sm text-muted-foreground">{profile.bio}</p>
              
              <h4 className="font-semibold">Skills</h4>
              <div className="flex flex-wrap gap-1">
                {profile.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs mb-1 hover-scale">
                    {skill}
                  </Badge>
                ))}
              </div>
              
              <h4 className="font-semibold">Looking for</h4>
              <div className="flex flex-wrap gap-1">
                {profile.lookingFor.map((item) => (
                  <Badge key={item} variant="outline" className="text-xs mb-1 hover-scale">
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
            className="swipe-button swipe-left hover:bg-red-500 hover:text-white transition-colors"
            onClick={() => handleSwipe("left")}
          >
            <X className="h-6 w-6" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="swipe-button swipe-right hover:bg-green-500 hover:text-white transition-colors"
            onClick={() => handleSwipe("right")}
          >
            <Heart className="h-6 w-6" fill={currentDirection === "right" ? "currentColor" : "none"} />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
