"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause } from 'lucide-react';
import { useCity } from '@/contexts/CityContext';

interface TimeControlProps {
  timeStep: number;
  isPlaying: boolean;
  onTimeStepChange: (value: number) => void;
  onPlayToggle: () => void;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// City-specific temperature data
const cityTemperatures: Record<string, number[]> = {
  sargoda: [12, 15, 21, 27, 32, 35, 34, 33, 31, 26, 20, 14], // Hot continental climate
  nairobi: [24, 25, 25, 24, 23, 22, 21, 21, 23, 24, 23, 23], // Subtropical highland
  abijan: [31, 32, 32, 31, 30, 28, 27, 26, 27, 28, 29, 30],  // Tropical monsoon
  "novi-sad": [0, 2, 7, 12, 17, 20, 22, 22, 18, 12, 6, 1]    // Humid subtropical
};

// Function to generate temperature color
const getTemperatureColor = (temp: number): string => {
  // Normalize temperature between 0 and 40°C
  const t = Math.max(0, Math.min(40, temp)) / 40;
  
  if (t < 0.2) return '#00a6fb'; // Very cold (blue)
  if (t < 0.4) return '#51cb20'; // Cool (green)
  if (t < 0.6) return '#ffd500'; // Moderate (yellow)
  if (t < 0.8) return '#ff7c43'; // Warm (orange)
  return '#ff1717';              // Hot (red)
};

// Function to generate gradient string for a city
const generateCityGradient = (cityTemps: number[]): string => {
  const colors = cityTemps.map(getTemperatureColor);
  const stops = colors.map((color, index) => `${color} ${(index * 100 / (colors.length - 1))}%`);
  return `linear-gradient(to right, ${stops.join(', ')})`;
};

export const TimeControl: React.FC<TimeControlProps> = ({
  timeStep,
  isPlaying,
  onTimeStepChange,
  onPlayToggle
}) => {
  const { selectedCity } = useCity();
  const city = selectedCity || 'sargoda';
  const temperatures = cityTemperatures[city];
  const currentTemp = temperatures[timeStep];

  return (
    <Card 
      className="absolute bottom-8 left-8 backdrop-blur-sm"
      style={{ 
        width: '800px',
        background: generateCityGradient(temperatures),
        opacity: 0.9
      }}
    >
      <CardContent className="p-4 bg-white/80 dark:bg-gray-800/80">
        <div className="flex items-center space-x-4">
          <div className="flex-grow space-y-2">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">
                Monthly Mean Temperature: {currentTemp}°C
              </span>
            </div>
            <Slider
              value={[timeStep]}
              onValueChange={(value) => onTimeStepChange(value[0])}
              max={11}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-600 dark:text-gray-300">
              {MONTHS.map((month, index) => (
                <span
                  key={month}
                  className={`${index === timeStep ? 'text-blue-500 font-bold' : ''}`}
                >
                  {month}
                </span>
              ))}
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={onPlayToggle}
            className="ml-2"
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};