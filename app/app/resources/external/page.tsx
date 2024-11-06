"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ExternalLink, Globe, Leaf, Database, Users, Sun, Satellite, BookOpen, TreePine, Building2, MapPin, Cpu } from 'lucide-react';
import { MetallicSwipe } from "@/components/animations/MetallicSwipe";
import { PageHeader } from "@/components/ui/page-header";

const MotionCard = motion(Card);

const externalResources = [
  {
    title: "NASA Earth Observatory",
    description: "Provides satellite imagery and scientific information about our home planet.",
    link: "https://earthobservatory.nasa.gov/",
    icon: Satellite,
    gradient: "from-blue-500/20 to-purple-500/20",
    category: "Satellite Data"
  },
  {
    title: "Urban Heat Islands (EPA)",
    description: "Information from the U.S. Environmental Protection Agency on urban heat islands and mitigation strategies.",
    link: "https://www.epa.gov/heatislands",
    icon: Sun,
    gradient: "from-orange-500/20 to-red-500/20",
    category: "Government"
  },
  {
    title: "World Urban Database",
    description: "A community-based initiative to acquire and disseminate climate relevant data on the form and function of cities.",
    link: "http://www.wudapt.org/",
    icon: Database,
    gradient: "from-green-500/20 to-blue-500/20",
    category: "Database"
  },
  {
    title: "C40 Cities",
    description: "A network of the world's megacities committed to addressing climate change.",
    link: "https://www.c40.org/",
    icon: Globe,
    gradient: "from-cyan-500/20 to-blue-500/20",
    category: "Network"
  },
  {
    title: "Urban Climate Change Research Network",
    description: "A consortium dedicated to the analysis of climate change mitigation and adaptation from an urban perspective.",
    link: "https://uccrn.ei.columbia.edu/",
    icon: Users,
    gradient: "from-indigo-500/20 to-purple-500/20",
    category: "Research"
  },
  {
    title: "Global Cool Cities Alliance",
    description: "Works with cities worldwide to implement cool surfaces and other urban heat island mitigation strategies.",
    link: "https://globalcoolcities.org/",
    icon: Leaf,
    gradient: "from-green-500/20 to-emerald-500/20",
    category: "Alliance"
  },
  {
    title: "Urban Heat Islands",
    description: "A comprehensive resource on urban heat islands, providing research, mitigation strategies, and educational materials.",
    link: "https://www.urbanheatislands.com/home",
    icon: TreePine,
    gradient: "from-amber-500/20 to-orange-500/20",
    category: "Education"
  },
  {
    title: "Conference of the Parties (COP)",
    description: "The supreme decision-making body of the United Nations Framework Convention on Climate Change (UNFCCC).",
    link: "https://unfccc.int/process/bodies/supreme-bodies/conference-of-the-parties-cop",
    icon: BookOpen,
    gradient: "from-blue-500/20 to-green-500/20",
    category: "Policy"
  },
  {
    title: "World Settlement Footprint",
    description: "DLR's comprehensive global mapping of human settlements using radar and optical satellite imagery for improved urban monitoring.",
    link: "https://www.dlr.de/en/eoc/research-transfer/projects-missions/world-settlement-footprint-wsf-r",
    icon: MapPin,
    gradient: "from-purple-500/20 to-pink-500/20",
    category: "Research"
  },
  {
    title: "GAF AG",
    description: "Leading European provider of Earth observation and geo-information solutions, specializing in satellite remote sensing and spatial data processing.",
    link: "https://www.gaf.de/",
    icon: Building2,
    gradient: "from-blue-500/20 to-indigo-500/20",
    category: "Industry"
  },
  {
    title: "MindEarth",
    description: "Innovative company combining artificial intelligence and Earth observation data to address environmental and urban challenges.",
    link: "https://mindearth.ai/",
    icon: Cpu,
    gradient: "from-green-500/20 to-teal-500/20",
    category: "Technology"
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export default function ExternalResourcesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="External Resources"
        description="Explore these valuable external resources for more information on urban heat islands, climate change, and sustainable urban development."
      />
      
      <motion.div 
        className="grid gap-6 md:grid-cols-2"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {externalResources.map((resource, index) => (
          <MotionCard
            key={index}
            variants={item}
            className={`group relative overflow-hidden bg-gradient-to-br ${resource.gradient} hover:shadow-lg transition-shadow duration-300`}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <CardHeader className="relative z-10">
              <div className="flex justify-between items-start">
                <CardTitle className="flex items-center space-x-2">
                  <resource.icon className="h-5 w-5" />
                  <span>{resource.title}</span>
                </CardTitle>
                <Badge variant="secondary">{resource.category}</Badge>
              </div>
            </CardHeader>
            <CardContent className="relative z-10 space-y-4">
              <p className="text-sm text-muted-foreground">{resource.description}</p>
              <a 
                href={resource.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center text-blue-500 hover:text-blue-700 transition-colors group-hover:underline"
              >
                Visit Website
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </CardContent>
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/0 dark:from-black/40 dark:to-black/0" />
            <div className="hidden group-hover:block">
              <MetallicSwipe />
            </div>
          </MotionCard>
        ))}
      </motion.div>

      <Card className="bg-gradient-to-br from-blue-500/10 to-green-500/10 border-dashed">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="bg-blue-500/20 p-3 rounded-full">
              <Globe className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Want to suggest a resource?</h3>
              <p className="text-sm text-muted-foreground">
                If you know of a valuable resource that should be included here, please contact us at{' '}
                <a href="mailto:umap@gaf.de" className="text-blue-500 hover:text-blue-700 transition-colors">
                  umap@gaf.de
                </a>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}