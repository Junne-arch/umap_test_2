"use client"

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  description?: string;
  badge?: string;
  className?: string;
}

export function PageHeader({ 
  title, 
  description, 
  badge,
  className 
}: PageHeaderProps) {
  return (
    <div className={cn("space-y-2 w-full", className)}>
      <div className="flex items-center justify-between">
        <div className="relative">
          <motion.h1 
            className="text-4xl font-bold relative z-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5,
              ease: [0.4, 0, 0.2, 1]
            }}
          >
            <span className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-600 dark:from-gray-100 dark:via-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
              {title}
            </span>
          </motion.h1>
        </div>
        
        {badge && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.5,
              delay: 0.2,
              ease: [0, 0.71, 0.2, 1.01]
            }}
          >
            <Badge variant="outline" className="ml-2">
              {badge}
            </Badge>
          </motion.div>
        )}
      </div>
      {description && (
        <motion.p 
          className="text-lg text-muted-foreground w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5,
            delay: 0.1,
            ease: [0.4, 0, 0.2, 1]
          }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}