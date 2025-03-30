
import { AvatarWithBadge } from "@/components/ui/avatar-with-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, UserPlus, AlertCircle } from "lucide-react";

interface ConnectionCardProps {
  name: string;
  avatar: string;
  title: string;
  company: string;
  mutualConnections: number;
  skills: string[];
  isNew?: boolean;
  onMessage: () => void;
}

export function ConnectionCard({
  name,
  avatar,
  title,
  company,
  mutualConnections,
  skills,
  isNew = false,
  onMessage,
}: ConnectionCardProps) {
  return (
    <Card className={`overflow-hidden transition-all duration-300 ${isNew ? 'border-primary' : ''}`}>
      {isNew && (
        <div className="bg-primary py-1 px-2 text-xs font-medium text-primary-foreground text-center">
          New Connection
        </div>
      )}
      <CardContent className="p-4">
        <div className="flex space-x-4">
          <AvatarWithBadge
            src={avatar}
            fallback={name}
            size="lg"
            status="online"
          />
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">{name}</h4>
            </div>
            <p className="text-sm text-muted-foreground">{title} at {company}</p>
            <p className="text-xs text-muted-foreground flex items-center">
              <UserPlus className="h-3 w-3 mr-1" />
              {mutualConnections} mutual connections
            </p>
            <div className="flex flex-wrap gap-1 mt-2">
              {skills.map((skill) => (
                <Badge key={skill} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Button
            variant="outline"
            size="sm"
            className="text-primary hover:text-primary-foreground hover:bg-primary"
            onClick={onMessage}
          >
            <MessageSquare className="mr-1 h-4 w-4" />
            Message
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
