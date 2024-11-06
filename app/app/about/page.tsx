"use client"

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { MetallicSwipe } from "@/components/animations/MetallicSwipe";
import { Globe, Users, Database, BookOpen, Mail, Microscope, Network, Satellite } from 'lucide-react';
import { PageHeader } from "@/components/ui/page-header";

const MotionCard = motion(Card);

const features = [
  {
    icon: Satellite,
    title: "Multi-spectral Remote Sensing",
    description: "Utilize high-resolution satellite imagery for precise spatio-temporal analysis of urban heat patterns",
    gradient: "from-blue-500/30 to-indigo-600/30",
    iconColor: "text-blue-600"
  },
  {
    icon: Database,
    title: "Ground-based Integration",
    description: "Integrate sensor networks for calibration and validation of satellite-derived data",
    gradient: "from-emerald-500/30 to-green-600/30",
    iconColor: "text-emerald-600"
  },
  {
    icon: Microscope,
    title: "Advanced Analytics",
    description: "Develop machine learning models for predictive analysis of urban heat island intensities",
    gradient: "from-purple-500/30 to-pink-600/30",
    iconColor: "text-purple-600"
  },
  {
    icon: Network,
    title: "Collaborative Network",
    description: "Partner with academic institutions and municipal governments to validate and refine our models",
    gradient: "from-amber-500/30 to-yellow-600/30",
    iconColor: "text-amber-600"
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

export default function AboutPage() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <PageHeader
        title="About Urban Microclimate Analysis Platform"
        description="Advancing the scientific understanding of urban heat island phenomena through innovative technology and data analysis."
        badge="Platform Overview"
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <MotionCard
          variants={item}
          className="md:col-span-2 group relative overflow-hidden border-none bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-5 w-5" />
              <span>Our Mission</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              The Urban Microclimate Analysis Platform is dedicated to advancing the scientific understanding of urban heat island phenomena through the integration of multi-source remote sensing data and advanced analytical techniques. Our mission is to provide urban planners, climate scientists, policymakers, and health sector entities with robust, data-driven insights to inform the development of thermally resilient urban environments.
            </p>
          </CardContent>
          <div className="hidden group-hover:block">
            <MetallicSwipe />
          </div>
        </MotionCard>

        {features.map((feature, index) => (
          <MotionCard
            key={index}
            variants={item}
            className={`group relative overflow-hidden border-none bg-gradient-to-br ${feature.gradient}`}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <div className={`p-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm ${feature.iconColor}`}>
                  <feature.icon className="h-5 w-5" />
                </div>
                <span>{feature.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
            <div className="hidden group-hover:block">
              <MetallicSwipe />
            </div>
          </MotionCard>
        ))}

        <MotionCard
          variants={item}
          className="group relative overflow-hidden border-none bg-gradient-to-br from-red-500/30 to-orange-600/30"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Our Team</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Our interdisciplinary team comprises experts in remote sensing, urban climatology, data science, and environmental engineering. This diverse expertise allows us to approach urban heat island analysis from multiple scientific perspectives, ensuring comprehensive and innovative solutions to complex urban climate challenges.
            </p>
          </CardContent>
          <div className="hidden group-hover:block">
            <MetallicSwipe />
          </div>
        </MotionCard>

        <MotionCard
          variants={item}
          className="group relative overflow-hidden border-none bg-gradient-to-br from-cyan-500/30 to-blue-600/30"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5" />
              <span>Research Collaboration</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-muted-foreground">
              <li>Contributing urban microclimate data for model validation</li>
              <li>Participating in our open-source development initiatives</li>
              <li>Attending our scientific symposia and workshops</li>
              <li>Engaging in joint research projects</li>
            </ul>
          </CardContent>
          <div className="hidden group-hover:block">
            <MetallicSwipe />
          </div>
        </MotionCard>

        <MotionCard
          variants={item}
          className="md:col-span-2 group relative overflow-hidden border-none bg-gradient-to-br from-teal-500/30 to-emerald-600/30"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Mail className="h-5 w-5" />
              <span>Contact Us</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              For inquiries, collaboration opportunities, or more information about our platform, please contact us at:
            </p>
            <p className="text-xl font-semibold text-center">
              <Link href="mailto:umap@gaf.de" className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                umap@gaf.de
              </Link>
            </p>
          </CardContent>
          <div className="hidden group-hover:block">
            <MetallicSwipe />
          </div>
        </MotionCard>
      </motion.div>
    </div>
  );
}