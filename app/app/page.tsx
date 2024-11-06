"use client"

import { useCity } from '@/contexts/CityContext';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Thermometer, Droplets, Wind, Sun, Satellite, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Gradient Background */}
      <section className="relative bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-20">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4">
          <div className="text-center space-y-8 relative z-10">
            <h1 className="text-6xl font-extrabold tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                Quantifying Urban Heat Island Phenomena
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Explore the complex thermal dynamics of urban environments through advanced remote sensing and data analysis. Our platform integrates multi-source data to provide comprehensive insights into urban heat island effects and their implications for urban climate resilience.
            </p>
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section className="py-16 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="group">
              <div className="relative overflow-hidden rounded-xl shadow-2xl">
                <Image 
                  src="https://images.unsplash.com/photo-1573108724029-4c46571d6490?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="Thermal imaging of urban heat island effect"
                  width={500}
                  height={300}
                  className="w-full h-[400px] object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">Thermal Imaging</h3>
                  <p className="text-sm opacity-80">Advanced heat mapping technology</p>
                </div>
              </div>
            </div>
            <div className="group">
              <div className="relative overflow-hidden rounded-xl shadow-2xl">
                <Image 
                  src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="Urban skyline for heat island analysis"
                  width={500}
                  height={300}
                  className="w-full h-[400px] object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">Urban Analysis</h3>
                  <p className="text-sm opacity-80">City-scale heat assessment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500">
              The Problem of Urban Heat
            </h2>
            <div className="text-xl text-muted-foreground text-center space-y-4">
              <p>Cities are becoming increasingly vulnerable to extreme heat events, with urban areas experiencing temperatures up to 12°C higher than surrounding rural regions. This urban heat island effect poses significant risks to public health, increases energy consumption, and exacerbates climate change impacts.</p>
              <p>Four key factors contribute to this growing challenge:</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {[
              { icon: Thermometer, title: "Human Activity", description: "Dense concentration of people, vehicles, and industrial processes generating excess heat in urban areas" },
              { icon: Droplets, title: "Air Quality", description: "Urban pollution and greenhouse gases trapping heat and altering local atmospheric conditions" },
              { icon: Wind, title: "City Design", description: "Dense building arrangements and materials creating heat-trapping urban canyons" },
              { icon: Sun, title: "Surface Properties", description: "Dark surfaces and building materials absorbing and retaining more solar radiation" }
            ].map((item, index) => (
              <Card key={index} className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-none shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <span>{item.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Two-Phase Analysis Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8 mb-16">
            <h2 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-500">
              Two-Phase Urban Heat Analysis
            </h2>
            <div className="text-xl text-muted-foreground text-center">
              <p>Our innovative approach combines satellite-based remote sensing with ground-based measurements to provide comprehensive urban heat analysis. This two-phase methodology ensures both broad coverage and high precision, enabling cities to make data-driven decisions for heat mitigation strategies.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-none shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center space-x-2">
                  <Satellite className="h-6 w-6 text-primary" />
                  <span>Phase 1: Earth Observation</span>
                  <Badge className="ml-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">Cost-Effective</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {[
                    "Satellite-based Surface Urban Heat Island Intensity (SUHII) mapping",
                    "Urban morphology and land use analysis",
                    "Temporal heat pattern identification",
                    "Initial vulnerability assessment"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <ArrowRight className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-none shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center space-x-2">
                  <Thermometer className="h-6 w-6 text-primary" />
                  <span>Phase 2: Ground Calibration</span>
                  <Badge className="ml-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">High Precision</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {[
                    "In-situ temperature and humidity measurements",
                    "Model refinement using ground truth data",
                    "Enhanced accuracy through data fusion",
                    "Detailed microclimate characterization"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <ArrowRight className="h-5 w-5 text-blue-500 flex-shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-foreground opacity-90"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-4xl font-bold text-white">Advancing Urban Climate Science</h2>
            <p className="text-xl text-white/90">
              Explore our platform's advanced analytical tools and contribute to the development of evidence-based strategies for creating thermally resilient urban environments in the face of global climate change. Let us know what, or where, you want to see next.
            </p>
            <Link href="/app/dashboard">
              <Button size="lg" variant="secondary" className="mt-8">
                Explore the UMAP Analytics Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}