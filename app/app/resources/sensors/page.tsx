"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { PageHeader } from "@/components/ui/page-header";
import { MetallicSwipe } from "@/components/animations/MetallicSwipe";

const MotionCard = motion(Card);

const satellites = [
  {
    name: 'Landsat 8',
    description:
      'Landsat 8 is an American Earth observation satellite launched on February 11, 2013. It is the eighth satellite in the Landsat program; the seventh to reach orbit successfully. Originally called the Landsat Data Continuity Mission (LDCM), it is a collaboration between NASA and the United States Geological Survey (USGS).',
    specs: [
      'Orbit: Sun-synchronous, 705 km altitude',
      'Revisit time: 16 days',
      'Swath: 185 km',
      'Spatial resolution: 15-100 m (depending on spectral band)',
      'Spectral bands: 11 (including thermal infrared)',
    ],
    image: '/Landsat8.png',
    link: 'https://landsat.gsfc.nasa.gov/satellites/landsat-8/',
    gradient: 'from-blue-500/20 to-purple-500/20'
  },
  {
    name: 'Sentinel-2',
    description:
      'Sentinel-2 is an Earth observation mission from the Copernicus Programme that systematically acquires optical imagery at high spatial resolution (10 m to 60 m) over land and coastal waters. The mission is a constellation with two twin satellites, Sentinel-2A and Sentinel-2B.',
    specs: [
      'Orbit: Sun-synchronous, 786 km altitude',
      'Revisit time: 5 days (at the equator)',
      'Swath: 290 km',
      'Spatial resolution: 10 m, 20 m and 60 m',
      'Spectral bands: 13',
    ],
    image: '/Sentinel2.png',
    link: 'https://sentinel.esa.int/web/sentinel/missions/sentinel-2',
    gradient: 'from-green-500/20 to-blue-500/20'
  },
  {
    name: 'Constellr Thermal',
    description:
      'Constellr is a German NewSpace company developing a constellation of thermal infrared satellites for high-resolution, high-frequency land surface temperature monitoring. Their innovative approach aims to provide crucial data for precision agriculture, water management, and urban heat island studies.',
    specs: [
      'Orbit: Sun-synchronous, planned for ~600 km altitude',
      'Revisit time: Daily (with full constellation)',
      'Swath: ~200 km',
      'Spatial resolution: 30 m',
      'Spectral bands: Thermal Infrared (TIR)',
    ],
    image: '/Constellr.png',
    link: 'https://www.constellr.com/',
    gradient: 'from-orange-500/20 to-red-500/20'
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export default function SensorsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Satellite Sensors"
        description="Learn about the key satellite sensors used in urban heat island studies and environmental monitoring. These advanced instruments provide crucial data for understanding and analyzing urban microclimates."
        badge="Technology"
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        {satellites.map((satellite, index) => (
          <MotionCard
            key={index}
            variants={item}
            className={`overflow-hidden bg-gradient-to-br ${satellite.gradient} group`}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="md:flex relative">
              <div className="md:w-1/3 relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-black/20 z-10"
                  whileHover={{ opacity: 0 }}
                />
                <Image
                  src={satellite.image}
                  alt={`${satellite.name} satellite`}
                  width={400}
                  height={300}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="md:w-2/3">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span className="text-2xl">{satellite.name}</span>
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={satellite.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        Visit Website <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 leading-relaxed">{satellite.description}</p>
                  <h3 className="font-semibold mb-2 text-lg">Key Specifications:</h3>
                  <ul className="list-disc pl-5 space-y-1 marker:text-primary">
                    {satellite.specs.map((spec, i) => (
                      <li key={i} className="text-muted-foreground">{spec}</li>
                    ))}
                  </ul>
                </CardContent>
              </div>
              <div className="hidden group-hover:block">
                <MetallicSwipe />
              </div>
            </div>
          </MotionCard>
        ))}
      </motion.div>
    </div>
  );
}