"use client"

import React, { useState } from 'react';
import { useCity } from '@/contexts/CityContext';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MapPin, Search, ThermometerSun, Users, Building2 } from 'lucide-react';

const cities = [
  { 
    value: 'sargoda',
    label: 'Sargoda',
    country: 'Pakistan',
    population: '1.5M',
    avgTemp: '35°C',
    urbanDensity: 'High',
    climateZone: 'Semi-arid',
    coordinates: '32.0836° N, 72.6711° E'
  },
  { 
    value: 'nairobi',
    label: 'Nairobi',
    country: 'Kenya',
    population: '4.4M',
    avgTemp: '28°C',
    urbanDensity: 'Very High',
    climateZone: 'Subtropical highland',
    coordinates: '1.2921° S, 36.8219° E'
  },
  { 
    value: 'abijan',
    label: 'Abidjan',
    country: 'Ivory Coast',
    population: '4.7M',
    avgTemp: '31°C',
    urbanDensity: 'High',
    climateZone: 'Tropical monsoon',
    coordinates: '5.3600° N, 4.0083° W'
  },
  { 
    value: 'novi-sad',
    label: 'Novi Sad',
    country: 'Serbia',
    population: '380K',
    avgTemp: '22°C',
    urbanDensity: 'Medium',
    climateZone: 'Humid subtropical',
    coordinates: '45.2671° N, 19.8335° E'
  },
];

interface CitySelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CitySelector: React.FC<CitySelectorProps> = ({ open, onOpenChange }) => {
  const { selectedCity, setSelectedCity } = useCity();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCities = cities.filter(city => 
    city.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    city.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    city.climateZone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (cityValue: string) => {
    setSelectedCity(cityValue);
    onOpenChange(false);
  };

  const currentCity = cities.find(city => city.value === selectedCity);

  return (
    <>
      <Button
        variant="outline"
        className="w-full justify-between items-center text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 border-gray-200 dark:border-gray-700"
        onClick={() => onOpenChange(true)}
      >
        <div className="flex items-center space-x-2">
          <MapPin className="h-4 w-4" />
          <span>{currentCity?.label || 'Select a city'}</span>
          {currentCity && (
            <Badge variant="secondary" className="ml-2">
              {currentCity.country}
            </Badge>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {currentCity && (
            <>
              <ThermometerSun className="h-4 w-4" />
              <span>{currentCity.avgTemp}</span>
            </>
          )}
        </div>
      </Button>

      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[700px] bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 z-[2000]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Select a City</DialogTitle>
          </DialogHeader>

          <div className="relative w-full mb-4">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by city, country, or climate zone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>City</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Population</TableHead>
                  <TableHead>Avg. Temp</TableHead>
                  <TableHead>Climate Zone</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCities.map((city) => (
                  <TableRow
                    key={city.value}
                    className={`cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                      selectedCity === city.value ? 'bg-gray-50 dark:bg-gray-700' : ''
                    }`}
                    onClick={() => handleSelect(city.value)}
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>{city.label}</span>
                      </div>
                    </TableCell>
                    <TableCell>{city.country}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4" />
                        <span>{city.population}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <ThermometerSun className="h-4 w-4" />
                        <span>{city.avgTemp}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{city.climateZone}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {selectedCity && (
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Building2 className="h-4 w-4" />
                  <span className="text-sm">Urban Density: {cities.find(c => c.value === selectedCity)?.urbanDensity}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {cities.find(c => c.value === selectedCity)?.coordinates}
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};