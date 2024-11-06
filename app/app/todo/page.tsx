"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { 
  Book, 
  Users, 
  MousePointerClick, 
  MessageSquare, 
  Settings, 
  BarChart2, 
  Smartphone, 
  Link2 
} from 'lucide-react';
import { MetallicSwipe } from "@/components/animations/MetallicSwipe";
import { PageHeader } from "@/components/ui/page-header";

const todoSections = [
  {
    title: "Documentation",
    icon: Book,
    color: "from-blue-500/30 to-indigo-600/30",
    iconColor: "text-blue-600",
    items: [
      "API documentation for data access",
      "Technical guides for analysis tools",
      "**Best practices for heat mitigation**",
      "City case studies"
    ]
  },
  {
    title: "User Features",
    icon: Users,
    color: "from-emerald-500/30 to-green-600/30",
    iconColor: "text-emerald-600",
    items: [
      "Profile customization",
      "Saved analysis reports",
      "Custom dashboard layouts",
      "Data export functionality",
      "Heat alert notifications"
    ]
  },
  {
    title: "Interactive Elements",
    icon: MousePointerClick,
    color: "from-purple-500/30 to-pink-600/30",
    iconColor: "text-purple-600",
    items: [
      "Interactive tutorials/walkthroughs",
      "**City comparison tools**",
      "**Time-series temperature animations**",
      "**3D building heat visualization**",
      "Real-time sensor data feeds"
    ]
  },
  {
    title: "Community Features",
    icon: MessageSquare,
    color: "from-amber-500/30 to-yellow-600/30",
    iconColor: "text-amber-600",
    items: [
      "Urban planners discussion forum",
      "Project sharing capabilities",
      "Expert Q&A section",
      "City success stories",
      "Newsletter subscription"
    ]
  },
  {
    title: "Administrative Tools",
    icon: Settings,
    color: "from-red-500/30 to-orange-600/30",
    iconColor: "text-red-600",
    items: [
      "**User management dashboard**",
      "Analytics dashboard",
      "Content management system",
      "API key management",
      "**Usage statistics**"
    ]
  },
  {
    title: "Data Visualizations",
    icon: BarChart2,
    color: "from-cyan-500/30 to-blue-600/30",
    iconColor: "text-cyan-600",
    items: [
      "Wind patterns impact",
      "**Vegetation coverage analysis**",
      "Population density overlays",
      "Infrastructure heat impact",
      "**Historical trend analysis**"
    ]
  },
  {
    title: "Mobile Features",
    icon: Smartphone,
    color: "from-violet-500/30 to-purple-600/30",
    iconColor: "text-violet-600",
    items: [
      "**Responsive mobile design**",
      "Mobile sensor data collection",
      "Offline data access",
      "Location-based alerts"
    ]
  },
  {
    title: "Integration Options",
    icon: Link2,
    color: "from-teal-500/30 to-emerald-600/30",
    iconColor: "text-teal-600",
    items: [
      "Weather service APIs",
      "City planning tools",
      "Climate modeling systems",
      "Social media sharing",
      "**External dataset imports**"
    ]
  }
];

const MotionCard = motion(Card);

export default function TodoPage() {
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});
  const controls = useAnimation();

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const handleTaskToggle = (sectionTitle: string, taskIndex: number) => {
    const taskKey = `${sectionTitle}-${taskIndex}`;
    setCompletedTasks(prev => ({
      ...prev,
      [taskKey]: !prev[taskKey]
    }));
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <PageHeader
        title="Development Roadmap"
        description="Track the progress of upcoming features and improvements for the Urban Microclimate Analysis Platform."
        badge="Planning"
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate={controls}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {todoSections.map((section, sectionIndex) => (
          <MotionCard
            key={sectionIndex}
            variants={item}
            className="group relative overflow-hidden border-none shadow-lg bg-gradient-to-br dark:shadow-2xl hover:shadow-xl transition-shadow duration-300"
            style={{
              backgroundImage: `linear-gradient(to bottom right, ${section.color})`
            }}
            whileHover={{ 
              scale: 1.02,
              transition: { 
                type: "spring", 
                stiffness: 300, 
                damping: 20 
              }
            }}
          >
            <CardHeader className="pb-3 relative z-10">
              <CardTitle className="flex items-center space-x-3 text-lg">
                <div className={`p-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm ${section.iconColor}`}>
                  <section.icon className="h-5 w-5" />
                </div>
                <span className="font-semibold">{section.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 relative z-10">
              {section.items.map((item, itemIndex) => {
                const isHighPriority = item.startsWith("**") && item.endsWith("**");
                const cleanItem = item.replace(/\*\*/g, "");
                const taskKey = `${section.title}-${itemIndex}`;
                const isCompleted = completedTasks[taskKey];

                return (
                  <div
                    key={itemIndex}
                    className="flex items-center justify-between space-x-2 p-2 rounded-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm transition-all duration-200 hover:bg-white dark:hover:bg-gray-800 shadow-sm"
                  >
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      {isHighPriority && (
                        <Badge 
                          variant="secondary" 
                          className={`shrink-0 ${section.iconColor} bg-white dark:bg-gray-800`}
                        >
                          Priority
                        </Badge>
                      )}
                      <span className={`truncate ${isCompleted ? "line-through text-muted-foreground" : ""}`}>
                        {cleanItem}
                      </span>
                    </div>
                    <Switch
                      checked={isCompleted}
                      onCheckedChange={() => handleTaskToggle(section.title, itemIndex)}
                      className="ml-2"
                    />
                  </div>
                );
              })}
            </CardContent>
            <div className="absolute inset-0 bg-gradient-to-br opacity-10" />
            <div className="hidden group-hover:block">
              <MetallicSwipe />
            </div>
          </MotionCard>
        ))}
      </motion.div>
    </div>
  );
}