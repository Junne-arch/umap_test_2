"use client"

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Search, Lock } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import DataAvailabilityDialog from '@/components/DataAvailabilityDialog';
import { motion } from "framer-motion";
import { PageHeader } from "@/components/ui/page-header";

type DataAvailability = 'available' | 'partial' | 'unavailable';

interface CityData {
  id: string;
  city: string;
  country: string;
  landCover: DataAvailability;
  wsf: DataAvailability;
  landsatLst: DataAvailability;
  constellr: DataAvailability;
  populationDensity: DataAvailability;
  groundTruth: DataAvailability;
  timelineData: {
    year: number;
    landCover: number;
    wsf: number;
    landsatLst: number;
    constellr: number;
    populationDensity: number;
    groundTruth: number;
  }[];
}

const generateTimelineData = (city: string) => {
  const years = [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];
  return years.map(year => ({
    year,
    landCover: Math.random() > 0.3 ? 1 : 0,
    wsf: Math.random() > 0.4 ? 1 : 0,
    landsatLst: Math.random() > 0.2 ? 1 : 0,
    constellr: year >= 2022 && Math.random() > 0.5 ? 1 : 0,
    populationDensity: Math.random() > 0.3 ? 1 : 0,
    groundTruth: Math.random() > 0.7 ? 1 : 0,
  }));
};

const cities: CityData[] = [
  {
    id: '1',
    city: 'Sargodha',
    country: 'Pakistan',
    landCover: 'available',
    wsf: 'available',
    landsatLst: 'available',
    constellr: 'partial',
    populationDensity: 'available',
    groundTruth: 'partial',
    timelineData: generateTimelineData('Sargodha'),
  },
  {
    id: '2',
    city: 'Nairobi',
    country: 'Kenya',
    landCover: 'available',
    wsf: 'available',
    landsatLst: 'available',
    constellr: 'unavailable',
    populationDensity: 'available',
    groundTruth: 'available',
    timelineData: generateTimelineData('Nairobi'),
  },
  {
    id: '3',
    city: 'Abidjan',
    country: 'Ivory Coast',
    landCover: 'available',
    wsf: 'partial',
    landsatLst: 'available',
    constellr: 'unavailable',
    populationDensity: 'available',
    groundTruth: 'partial',
    timelineData: generateTimelineData('Abidjan'),
  },
  {
    id: '4',
    city: 'Novi Sad',
    country: 'Serbia',
    landCover: 'available',
    wsf: 'available',
    landsatLst: 'available',
    constellr: 'partial',
    populationDensity: 'available',
    groundTruth: 'available',
    timelineData: generateTimelineData('Novi Sad'),
  },
  {
    id: '5',
    city: 'Lagos',
    country: 'Nigeria',
    landCover: 'partial',
    wsf: 'partial',
    landsatLst: 'available',
    constellr: 'unavailable',
    populationDensity: 'available',
    groundTruth: 'unavailable',
    timelineData: generateTimelineData('Lagos'),
  },
  {
    id: '6',
    city: 'Accra',
    country: 'Ghana',
    landCover: 'available',
    wsf: 'partial',
    landsatLst: 'available',
    constellr: 'unavailable',
    populationDensity: 'partial',
    groundTruth: 'partial',
    timelineData: generateTimelineData('Accra'),
  },
  {
    id: '7',
    city: 'Dhaka',
    country: 'Bangladesh',
    landCover: 'available',
    wsf: 'available',
    landsatLst: 'available',
    constellr: 'partial',
    populationDensity: 'available',
    groundTruth: 'available',
    timelineData: generateTimelineData('Dhaka'),
  },
  {
    id: '8',
    city: 'Mumbai',
    country: 'India',
    landCover: 'available',
    wsf: 'available',
    landsatLst: 'available',
    constellr: 'partial',
    populationDensity: 'available',
    groundTruth: 'partial',
    timelineData: generateTimelineData('Mumbai'),
  }
];

const DataIndicator = ({ status }: { status: DataAvailability }) => {
  const colors = {
    available: 'bg-green-500',
    partial: 'bg-yellow-500',
    unavailable: 'bg-red-500'
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full ${colors[status]}`} />
      <span className="capitalize">{status}</span>
    </div>
  );
};

export default function GeodataDownloadPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState<CityData | null>(null);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof CityData;
    direction: 'asc' | 'desc';
  } | null>(null);

  const handleSort = (key: keyof CityData) => {
    setSortConfig(current => ({
      key,
      direction: current?.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const sortedAndFilteredCities = cities
    .filter(city => 
      city.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      city.country.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortConfig) return 0;
      
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="space-y-4">
        <PageHeader
          title="Geodata Download"
          description="All Earth Observation data used in the UMAP platform is available for download and further analysis. Dataset visibility is tied to your registration level - some datasets may require additional access privileges."
          badge="Data Access"
        />
      </div>

      <div className="flex justify-end">
        <div className="relative w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by city or country..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-full justify-start">
                      City
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem onClick={() => handleSort('city')}>
                      Sort by City
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSort('country')}>
                      Sort by Country
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Land-Cover</TableHead>
              <TableHead>WSF</TableHead>
              <TableHead>Landsat-8 LST</TableHead>
              <TableHead>Constellr</TableHead>
              <TableHead>Population Density</TableHead>
              <TableHead>Ground Truth</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedAndFilteredCities.map((city) => (
              <TableRow 
                key={city.id}
                className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                onClick={() => setSelectedCity(city)}
              >
                <TableCell className="font-medium">{city.city}</TableCell>
                <TableCell>{city.country}</TableCell>
                <TableCell><DataIndicator status={city.landCover} /></TableCell>
                <TableCell><DataIndicator status={city.wsf} /></TableCell>
                <TableCell><DataIndicator status={city.landsatLst} /></TableCell>
                <TableCell><DataIndicator status={city.constellr} /></TableCell>
                <TableCell><DataIndicator status={city.populationDensity} /></TableCell>
                <TableCell><DataIndicator status={city.groundTruth} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <DataAvailabilityDialog 
        city={selectedCity}
        open={!!selectedCity}
        onOpenChange={(open) => !open && setSelectedCity(null)}
      />

      <div className="mt-4 text-sm text-muted-foreground">
        <h2 className="font-semibold mb-2">Data Types Legend:</h2>
        <ul className="space-y-1">
          <li><Badge variant="outline">Land-Cover</Badge> - Land use and land cover classification</li>
          <li><Badge variant="outline">WSF</Badge> - World Settlement Footprint</li>
          <li><Badge variant="outline">Landsat-8 LST</Badge> - Land Surface Temperature from Landsat-8</li>
          <li><Badge variant="outline">Constellr</Badge> - High-resolution thermal data</li>
          <li><Badge variant="outline">Population Density</Badge> - Population distribution data</li>
          <li><Badge variant="outline">Ground Truth</Badge> - Field-validated measurement data</li>
        </ul>
      </div>
    </div>
  );
}