"use client"

import { useCity } from '@/contexts/CityContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"

const temperatureData = {
  sargoda: [
    { month: 'Jan', temp: 12 }, { month: 'Feb', temp: 15 }, { month: 'Mar', temp: 21 },
    { month: 'Apr', temp: 27 }, { month: 'May', temp: 32 }, { month: 'Jun', temp: 35 },
    { month: 'Jul', temp: 34 }, { month: 'Aug', temp: 33 }, { month: 'Sep', temp: 31 },
    { month: 'Oct', temp: 26 }, { month: 'Nov', temp: 20 }, { month: 'Dec', temp: 14 }
  ],
  nairobi: [
    { month: 'Jan', temp: 19 }, { month: 'Feb', temp: 20 }, { month: 'Mar', temp: 21 },
    { month: 'Apr', temp: 20 }, { month: 'May', temp: 19 }, { month: 'Jun', temp: 18 },
    { month: 'Jul', temp: 17 }, { month: 'Aug', temp: 17 }, { month: 'Sep', temp: 19 },
    { month: 'Oct', temp: 20 }, { month: 'Nov', temp: 19 }, { month: 'Dec', temp: 19 }
  ],
  abijan: [
    { month: 'Jan', temp: 27 }, { month: 'Feb', temp: 28 }, { month: 'Mar', temp: 28 },
    { month: 'Apr', temp: 28 }, { month: 'May', temp: 27 }, { month: 'Jun', temp: 26 },
    { month: 'Jul', temp: 25 }, { month: 'Aug', temp: 24 }, { month: 'Sep', temp: 25 },
    { month: 'Oct', temp: 26 }, { month: 'Nov', temp: 27 }, { month: 'Dec', temp: 27 }
  ],
  "novi-sad": [
    { month: 'Jan', temp: 0 }, { month: 'Feb', temp: 2 }, { month: 'Mar', temp: 7 },
    { month: 'Apr', temp: 12 }, { month: 'May', temp: 17 }, { month: 'Jun', temp: 20 },
    { month: 'Jul', temp: 22 }, { month: 'Aug', temp: 22 }, { month: 'Sep', temp: 18 },
    { month: 'Oct', temp: 12 }, { month: 'Nov', temp: 6 }, { month: 'Dec', temp: 1 }
  ]
};

const cityStats = {
  sargoda: { greenSpace: 15, airQuality: 60, urbanHeatIslandEffect: 75 },
  nairobi: { greenSpace: 25, airQuality: 70, urbanHeatIslandEffect: 65 },
  abijan: { greenSpace: 20, airQuality: 55, urbanHeatIslandEffect: 80 },
  "novi-sad": { greenSpace: 30, airQuality: 75, urbanHeatIslandEffect: 60 }
};

const populationData = {
  sargoda: [
    { year: 2010, population: 600000 },
    { year: 2015, population: 650000 },
    { year: 2020, population: 700000 },
    { year: 2025, population: 750000 },
  ],
  nairobi: [
    { year: 2010, population: 3000000 },
    { year: 2015, population: 3500000 },
    { year: 2020, population: 4000000 },
    { year: 2025, population: 4500000 },
  ],
  abijan: [
    { year: 2010, population: 4000000 },
    { year: 2015, population: 4300000 },
    { year: 2020, population: 4600000 },
    { year: 2025, population: 4900000 },
  ],
  "novi-sad": [
    { year: 2010, population: 330000 },
    { year: 2015, population: 340000 },
    { year: 2020, population: 350000 },
    { year: 2025, population: 360000 },
  ],
};

const landUseData = {
  sargoda: [
    { name: 'Residential', value: 45 },
    { name: 'Commercial', value: 20 },
    { name: 'Industrial', value: 15 },
    { name: 'Green Space', value: 10 },
    { name: 'Others', value: 10 }
  ],
  nairobi: [
    { name: 'Residential', value: 40 },
    { name: 'Commercial', value: 25 },
    { name: 'Industrial', value: 10 },
    { name: 'Green Space', value: 15 },
    { name: 'Others', value: 10 }
  ],
  abijan: [
    { name: 'Residential', value: 50 },
    { name: 'Commercial', value: 20 },
    { name: 'Industrial', value: 15 },
    { name: 'Green Space', value: 5 },
    { name: 'Others', value: 10 }
  ],
  "novi-sad": [
    { name: 'Residential', value: 35 },
    { name: 'Commercial', value: 15 },
    { name: 'Industrial', value: 20 },
    { name: 'Green Space', value: 20 },
    { name: 'Others', value: 10 }
  ]
};

const urbanMetricsData = {
  sargoda: [
    { metric: 'Air Quality', value: 60 },
    { metric: 'Green Coverage', value: 45 },
    { metric: 'Urban Density', value: 75 },
    { metric: 'Heat Resilience', value: 55 },
    { metric: 'Infrastructure', value: 65 },
    { metric: 'Public Transport', value: 50 }
  ],
  nairobi: [
    { metric: 'Air Quality', value: 70 },
    { metric: 'Green Coverage', value: 60 },
    { metric: 'Urban Density', value: 80 },
    { metric: 'Heat Resilience', value: 65 },
    { metric: 'Infrastructure', value: 75 },
    { metric: 'Public Transport', value: 70 }
  ],
  abijan: [
    { metric: 'Air Quality', value: 55 },
    { metric: 'Green Coverage', value: 40 },
    { metric: 'Urban Density', value: 85 },
    { metric: 'Heat Resilience', value: 50 },
    { metric: 'Infrastructure', value: 60 },
    { metric: 'Public Transport', value: 65 }
  ],
  "novi-sad": [
    { metric: 'Air Quality', value: 75 },
    { metric: 'Green Coverage', value: 70 },
    { metric: 'Urban Density', value: 60 },
    { metric: 'Heat Resilience', value: 70 },
    { metric: 'Infrastructure', value: 80 },
    { metric: 'Public Transport', value: 75 }
  ]
};

const satelliteImageryDates = {
  sargoda: [new Date(2023, 5, 15), new Date(2023, 7, 22), new Date(2023, 9, 10)],
  nairobi: [new Date(2023, 4, 5), new Date(2023, 6, 18), new Date(2023, 8, 30)],
  abijan: [new Date(2023, 3, 12), new Date(2023, 5, 25), new Date(2023, 7, 8)],
  "novi-sad": [new Date(2023, 4, 20), new Date(2023, 6, 15), new Date(2023, 8, 5)],
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function CitySummaryPage() {
  const { selectedCity } = useCity();
  const city = selectedCity || 'sargoda';
  const stats = cityStats[city];

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">City Summary: {city.charAt(0).toUpperCase() + city.slice(1)}</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Annual Temperature</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={temperatureData[city]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="temp" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Urban Heat Factors</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span>Green Space</span>
                <span>{stats.greenSpace}%</span>
              </div>
              <Progress value={stats.greenSpace} className="w-full" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Air Quality</span>
                <span>AQI: {stats.airQuality}</span>
              </div>
              <Progress value={stats.airQuality} className="w-full" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Urban Heat Island Effect</span>
                <span>{stats.urbanHeatIslandEffect}%</span>
              </div>
              <Progress value={stats.urbanHeatIslandEffect} className="w-full" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Population Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={populationData[city]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="population" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Land Use Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={landUseData[city]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {landUseData[city].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Urban Metrics Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={urbanMetricsData[city]}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="metric" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar
                    name="Urban Metrics"
                    dataKey="value"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Satellite Imagery Dates</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="multiple"
              selected={satelliteImageryDates[city]}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pollution Monitoring</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between">
                  <span>PM2.5</span>
                  <Badge variant="outline" className="bg-gradient-to-r from-green-400 to-blue-500 text-white">35 µg/m³</Badge>
                </div>
                <Slider defaultValue={[35]} max={100} step={1} className="mt-2" />
              </div>
              <div>
                <div className="flex justify-between">
                  <span>NO2</span>
                  <Badge variant="outline" className="bg-gradient-to-r from-green-400 to-blue-500 text-white">42 ppb</Badge>
                </div>
                <Slider defaultValue={[42]} max={100} step={1} className="mt-2" />
              </div>
              <div>
                <div className="flex justify-between">
                  <span>O3</span>
                  <Badge variant="outline" className="bg-gradient-to-r from-green-400 to-blue-500 text-white">28 ppb</Badge>
                </div>
                <Slider defaultValue={[28]} max={100} step={1} className="mt-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}