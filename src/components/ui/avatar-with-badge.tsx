
import React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface AvatarWithBadgeProps {
  src?: string;
  fallback: string;
  size?: "sm" | "md" | "lg";
  status?: "online" | "offline" | "away" | "busy" | null;
  className?: string;
}

export function AvatarWithBadge({
  src,
  fallback,
  size = "md",
  status = null,
  className,
}: AvatarWithBadgeProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-14 w-14",
  };

  const statusColors = {
    online: "bg-green-500",
    offline: "bg-gray-400",
    away: "bg-yellow-500",
    busy: "bg-red-500",
  };

  return (
    <div className={cn("relative", className)}>
      <Avatar className={cn(sizeClasses[size])}>
        <AvatarImage src={src} alt={fallback} />
        <AvatarFallback>{fallback.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      {status && (
        <span
          className={cn(
            "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white",
            statusColors[status]
          )}
        />
      )}
    </div>
  );
}
