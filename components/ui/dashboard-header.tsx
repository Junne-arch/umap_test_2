"use client"

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface DashboardHeaderProps {
  title: string;
  badge?: string;
  className?: string;
}

export function DashboardHeader({ 
  title, 
  badge,
  className 
}: DashboardHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between mb-6", className)}>
      <div className="space-y-1">
        <h1 className="text-3xl font-bold bg-gradient-to-br from-gray-900 via-gray-800 to-gray-600 dark:from-gray-100 dark:via-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
          {title}
        </h1>
      </div>
      {badge && (
        <Badge variant="outline" className="ml-2">
          {badge}
        </Badge>
      )}
    </div>
  );
}