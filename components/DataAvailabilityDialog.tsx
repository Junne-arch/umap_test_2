'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import {
  Download,
  Calendar as CalendarIcon,
  BarChart2,
  Activity,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TimelineData {
  year: number;
  landCover: number;
  wsf: number;
  landsatLst: number;
  constellr: number;
  populationDensity: number;
  groundTruth: number;
}

interface DataAvailabilityDialogProps {
  city: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TimelineChart = ({ data }: { data: TimelineData[] }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
      <XAxis dataKey="year" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="landCover" name="Land Cover" fill="#4CAF50" />
      <Bar dataKey="wsf" name="WSF" fill="#2196F3" />
      <Bar dataKey="landsatLst" name="Landsat-8 LST" fill="#9C27B0" />
      <Bar dataKey="constellr" name="Constellr" fill="#FF9800" />
      <Bar
        dataKey="populationDensity"
        name="Population Density"
        fill="#795548"
      />
      <Bar dataKey="groundTruth" name="Ground Truth" fill="#F44336" />
    </BarChart>
  </ResponsiveContainer>
);

const CoverageChart = ({ data }: { data: TimelineData[] }) => {
  const coverageData = data.map((year) => ({
    year: year.year,
    coverage:
      (Object.entries(year)
        .filter(([key]) => key !== 'year')
        .reduce((acc, [_, value]) => acc + (value as number), 0) /
        6) *
      100,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={coverageData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="year" />
        <YAxis unit="%" />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="coverage"
          name="Data Coverage"
          stroke="#2196F3"
          strokeWidth={2}
          dot={{ fill: '#2196F3' }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

const DatasetCard = ({
  title,
  status,
  description,
}: {
  title: string;
  status: string;
  description: string;
}) => (
  <Card>
    <CardHeader className="pb-2">
      <div className="flex items-center justify-between">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Badge
          variant={
            status === 'available'
              ? 'default'
              : status === 'partial'
              ? 'secondary'
              : 'destructive'
          }
        >
          {status}
        </Badge>
      </div>
    </CardHeader>
    <CardContent>
      <CardDescription>{description}</CardDescription>
    </CardContent>
  </Card>
);

const getDatasetDescription = (dataset: string) => {
  const descriptions = {
    landCover:
      'High-resolution land use and land cover classification derived from satellite imagery',
    wsf: 'World Settlement Footprint showing urban extent and development',
    landsatLst:
      'Land Surface Temperature measurements from Landsat-8 satellite',
    constellr: 'High-resolution thermal data from Constellr satellites',
    populationDensity: 'Detailed population distribution and density maps',
    groundTruth: 'Field-validated measurements and ground observations',
  };
  return descriptions[dataset] || '';
};

export default function DataAvailabilityDialog({
  city,
  open,
  onOpenChange,
}: DataAvailabilityDialogProps) {
  if (!city) return null;

  const availableDates = city.timelineData.flatMap((data) =>
    Object.entries(data)
      .filter(([key, value]) => key !== 'year' && value === 1)
      .map(
        () =>
          new Date(
            data.year,
            Math.floor(Math.random() * 12),
            Math.floor(Math.random() * 28) + 1
          )
      )
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Data Availability: {city.city}
          </DialogTitle>
          <DialogDescription>
            Explore data availability across different datasets and time periods
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="timeline" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 gap-4">
            <TabsTrigger value="timeline" className="flex items-center gap-2">
              <BarChart2 className="h-4 w-4" />
              Timeline View
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              Calendar View
            </TabsTrigger>
            <TabsTrigger value="coverage" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Coverage Analysis
            </TabsTrigger>
          </TabsList>

          <TabsContent value="timeline" className="space-y-4">
            <TimelineChart data={city.timelineData} />
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(city)
                .filter(([key]) =>
                  [
                    'landCover',
                    'wsf',
                    'landsatLst',
                    'constellr',
                    'populationDensity',
                    'groundTruth',
                  ].includes(key)
                )
                .map(([key, value]) => (
                  <DatasetCard
                    key={key}
                    title={
                      key.charAt(0).toUpperCase() +
                      key.slice(1).replace(/([A-Z])/g, ' $1')
                    }
                    status={value as string}
                    description={getDatasetDescription(key)}
                  />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-4">
            <div className="flex justify-center">
              <Calendar
                mode="multiple"
                selected={availableDates}
                className="rounded-md border"
              />
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Data Collection Dates</CardTitle>
                <CardDescription>
                  Highlighted dates indicate when data was collected for this
                  location
                </CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>

          <TabsContent value="coverage" className="space-y-4">
            <CoverageChart data={city.timelineData} />
            <Card>
              <CardHeader>
                <CardTitle>Coverage Analysis</CardTitle>
                <CardDescription>
                  Overall data coverage trend showing the percentage of
                  available datasets over time
                </CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end mt-4">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download Available Data
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
