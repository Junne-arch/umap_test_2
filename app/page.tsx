"use client"

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Satellite, Thermometer, BookOpen, ArrowRight, Globe } from 'lucide-react';
import UMAPLogo from '@/components/UMAPLogo';
import CobeGlobe2 from '@/components/CobeGlobe2';
import Image from 'next/image';
import { LegalPopups } from '@/components/LegalPopups';
import { useState } from 'react';
import { PageHeader } from "@/components/ui/page-header";

export default function CorporateLandingPage() {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container h-14 flex items-center justify-between">
          <UMAPLogo className="h-8 w-auto" />
          <nav>
            <ul className="flex items-center gap-6">
              <li>
                <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                  Features
                </a>
              </li>
              <li>
                <Link href="/app/dashboard" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Button asChild variant="outline" size="sm">
                  <Link href="/login">Sign In</Link>
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <section className="relative py-20 overflow-hidden border-b bg-gradient-to-b from-background to-muted/50">
          <div className="container flex items-center justify-between relative">
            <div className="max-w-2xl z-10">
              <PageHeader
                title="Urban Microclimate Analysis Platform"
                description="Leverage advanced remote sensing data and machine learning algorithms to analyze urban heat island effects."
                className="mb-8"
              />
              <div className="flex gap-4">
                <Button asChild size="lg" className="gap-2">
                  <Link href="/app">
                    Explore Urban Thermal Analysis
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/login">Sign In</Link>
                </Button>
              </div>
            </div>
            <div className="hidden lg:block absolute right-0 top-1/2 transform -translate-y-1/4 translate-x-1/8">
              <CobeGlobe2 size={800} autoRotate={true} rotationSpeed={0.001} />
            </div>
          </div>
        </section>

        <section id="about" className="py-20 bg-background">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">About UMAP</h2>
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  UMAP integrates multi-spectral satellite imagery with ground-based measurements to provide high-resolution thermal mapping and predictive modeling for urban environments.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our platform empowers urban planners, environmental scientists, health sector entities and policymakers with data-driven insights to mitigate urban heat island effects and improve city livability.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  No remote sensing or GIS expertise with data handling is required. All data and intermediaries are available for download, none the less.
                </p>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Key Benefits of Earth Observation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex gap-4">
                    <Globe className="h-6 w-6 text-primary flex-shrink-0" />
                    <p className="text-muted-foreground">
                      Satellite imagery enables large-scale urban heat mapping, covering hundreds of cities cost effectively.
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <ArrowRight className="h-6 w-6 text-primary flex-shrink-0" />
                    <p className="text-muted-foreground">
                      Annual updates provide consistent monitoring of urban heat patterns and their evolution over time.
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <Satellite className="h-6 w-6 text-primary flex-shrink-0" />
                    <p className="text-muted-foreground">
                      This approach allows for comprehensive insights into urban heat islands across diverse geographical regions and it's effects on populations.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 bg-muted/50">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Satellite,
                  title: 'Multi-spectral Remote Sensing',
                  description: 'Utilize high-resolution satellite imagery for precise spatio-temporal analysis of urban heat patterns.',
                },
                {
                  icon: Thermometer,
                  title: 'Thermal Mitigation Modeling',
                  description: 'Employ simulations to evaluate urban cooling strategies and their impact.',
                },
                {
                  icon: BookOpen,
                  title: 'Data Fusion and Calibration',
                  description: 'Integrate satellite-derived data with in-situ measurements for highly accurate urban thermal models.',
                },
              ].map((feature, index) => (
                <Card key={index} className="transition-shadow hover:shadow-lg">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-muted/50 py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <UMAPLogo className="h-8 w-auto" />
            <div className="flex items-center gap-8">
              <Image src="/gaf-logo.png" alt="GAF Logo" width={100} height={50} className="opacity-80" />
              <Image src="/partners.png" alt="Partners Logo" width={300} height={50} className="opacity-80" />
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/classic" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                View Classic Landing Page
              </Link>
              <button onClick={() => setShowPrivacy(true)} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </button>
              <button onClick={() => setShowTerms(true)} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </button>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-muted-foreground">
            © 2025 Urban Microclimate Analysis Platform, GAF AG. All rights reserved.
          </div>
        </div>
      </footer>

      <LegalPopups
        showPrivacy={showPrivacy}
        showTerms={showTerms}
        onPrivacyClose={() => setShowPrivacy(false)}
        onTermsClose={() => setShowTerms(false)}
      />
    </div>
  );
}