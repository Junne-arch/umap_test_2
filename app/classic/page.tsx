import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import CobeGlobe from '@/components/CobeGlobe';
import { Satellite, Thermometer, BookOpen, Leaf } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-space">
      <div className="absolute inset-0 bg-black opacity-90"></div>
      <div className="flex flex-col items-center justify-between min-h-screen text-center p-4 relative z-10">
        <div className="container mx-auto px-4 py-12 flex-grow flex flex-col justify-center">
          <div className="text-white space-y-8">
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500 leading-tight">
              Quantifying Urban Heat Island Phenomena
            </h1>
            <p className="text-4xl font-bold text-green-400 drop-shadow-[0_0_10px_rgba(34,197,94,0.5)] flex items-center justify-center">
              <Leaf className="h-8 w-8 mr-2" />
              Urban Microclimate Analysis Platform
            </p>
            <p className="text-xl max-w-2xl mx-auto">
              Leverage advanced remote sensing data and machine learning
              algorithms to analyze urban heat island effects. Our platform
              integrates multi-spectral satellite imagery with ground-based
              measurements to provide high-resolution thermal mapping and
              predictive modeling for urban environments.
            </p>
            <div className="mt-8 space-y-4">
              <Link href="/app">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white transition-all duration-300 transform hover:scale-105"
                >
                  Explore Urban Thermal Analysis
                </Button>
              </Link>
              <div className="pt-4">
                <Link href="/" className="text-sm text-gray-300 hover:text-white transition-colors duration-300">
                  Back to Current Landing Page
                </Link>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center space-x-12 mt-12 relative z-20">
            <Image
              src="/gaf-logo.png"
              alt="GAF Logo"
              width={150}
              height={150}
              className="opacity-80"
            />
            <Image
              src="/partners.png"
              alt="Partners Logo"
              width={450}
              height={150}
              className="opacity-80"
            />
          </div>
        </div>
        <div className="w-full py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white relative">
              <div className="text-center">
                <h3 className="text-2xl font-semibold mb-4 flex items-center justify-center">
                  <Satellite className="mr-2" size={24} />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">
                    Multi-spectral Remote Sensing
                  </span>
                </h3>
                <p>
                  Utilize high-resolution satellite imagery to conduct precise
                  spatio-temporal analysis of urban heat patterns and surface
                  temperature distributions.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-semibold mb-4 flex items-center justify-center">
                  <Thermometer className="mr-2" size={24} />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-yellow-400">
                    Thermal Mitigation Modeling
                  </span>
                </h3>
                <p>
                  Employ advanced computational fluid dynamics (CFD) simulations
                  to evaluate the efficacy of various urban cooling strategies
                  and their impact on microclimate conditions.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-semibold mb-4 flex items-center justify-center">
                  <BookOpen className="mr-2" size={24} />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                    Data Fusion and Calibration
                  </span>
                </h3>
                <p>
                  Integrate satellite-derived land surface temperature data with
                  in-situ measurements to develop highly accurate, calibrated
                  models of urban thermal environments.
                </p>
              </div>
              <div className="absolute left-1/3 top-0 bottom-0 w-1 bg-green-500 hidden md:block"></div>
              <div className="absolute left-2/3 top-0 bottom-0 w-1 bg-green-500 hidden md:block"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-full max-w-5xl aspect-square">
        <CobeGlobe />
      </div>
    </div>
  );
}