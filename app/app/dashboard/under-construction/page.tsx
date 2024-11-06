"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ComposedChart, Line, Scatter } from 'recharts';
import { ArrowUpRight } from "lucide-react";

const monthlyData = [
  { month: 'Jan', uhi: 28, temp: 22 },
  { month: 'Feb', uhi: 32, temp: 24 },
  { month: 'Mar', uhi: 35, temp: 26 },
  { month: 'Apr', uhi: 31, temp: 25 },
  { month: 'May', uhi: 29, temp: 23 },
  { month: 'Jun', uhi: 33, temp: 27 },
  { month: 'Jul', uhi: 36, temp: 29 },
  { month: 'Aug', uhi: 34, temp: 28 },
  { month: 'Sep', uhi: 30, temp: 25 },
  { month: 'Oct', uhi: 27, temp: 22 },
  { month: 'Nov', uhi: 25, temp: 20 },
  { month: 'Dec', uhi: 26, temp: 21 }
];

const suhiiData = [
  { baseline: 20, suhii: 21.5 },
  { baseline: 20, suhii: 23.5 },
  { baseline: 25, suhii: 24.5 },
  { baseline: 27.5, suhii: 29 },
  { baseline: 27.5, suhii: 28.5 },
  { baseline: 30, suhii: 33.8 },
  { baseline: 32.5, suhii: 33.5 },
  { baseline: 35, suhii: 36.5 },
  { baseline: 35, suhii: 38.5 },
  { baseline: 37.5, suhii: 37 },
  { baseline: 37.5, suhii: 39.5 },
  { baseline: 40, suhii: 41.5 },
].map(point => ({
  ...point,
  equality: point.baseline,
  regression: point.baseline * 1.1 - 1
}));

interface TooltipProps {
  active?: boolean;
  payload?: Array<any>;
  label?: string;
}

const MonthlyTooltip: React.FC<TooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/80 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-gray-100">
        {payload.map((entry, index) => (
          <p key={index} className="text-gray-700 dark:text-gray-300">
            {entry.name}: {entry.value}°C
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const SuhiiTooltip: React.FC<TooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/80 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-gray-100">
        <p className="font-medium">Baseline: {label}°C</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.name}: {entry.value}°C
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function UnderConstructionPage() {
  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Monthly Temperature Analysis</CardTitle>
            <div className="flex items-center text-green-600">
              <span className="text-sm font-medium">+5.2% this month</span>
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Urban Heat Island Effect vs Base Temperature
          </p>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="uhi" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#fecaca" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#fecaca" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="temp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis 
                  dataKey="month" 
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  unit="°C"
                />
                <Tooltip content={<MonthlyTooltip />} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="uhi"
                  stroke="#ef4444"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#uhi)"
                  name="Urban Heat Island Effect"
                />
                <Area
                  type="monotone"
                  dataKey="temp"
                  stroke="#22c55e"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#temp)"
                  name="Base Temperature"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Baseline vs SUHII Increased Temperatures</CardTitle>
          <p className="text-sm text-muted-foreground">
            Non-linear relationship between baseline temperatures and Surface Urban Heat Island Intensity
          </p>
        </CardHeader>
        <CardContent>
          <div className="h-[500px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={suhiiData}
                margin={{ top: 20, right: 30, left: 80, bottom: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis
                  dataKey="baseline"
                  type="number"
                  domain={[20, 40]}
                  label={{ value: 'Baseline Temperatures (°C)', position: 'bottom', offset: 20 }}
                  tick={{ dy: 10 }}
                />
                <YAxis
                  domain={[20, 45]}
                  label={{ 
                    value: 'SUHII Increased Temperatures (°C)', 
                    angle: -90, 
                    position: 'left',
                    offset: 0,
                    dy: -120
                  }}
                  tick={{ dx: -10 }}
                />
                <Tooltip content={<SuhiiTooltip />} />
                <Legend verticalAlign="top" height={36} />

                {/* x=y line (dashed green) */}
                <Line
                  type="monotone"
                  dataKey="equality"
                  stroke="#22c55e"
                  strokeDasharray="5 5"
                  dot={false}
                  name="x = y"
                  strokeWidth={2}
                  isAnimationActive={false}
                />

                {/* Regression line */}
                <Line
                  type="monotone"
                  dataKey="regression"
                  stroke="#ef4444"
                  dot={false}
                  name="Regression Line"
                  strokeWidth={2}
                />

                {/* Scatter points with connecting lines */}
                <Scatter
                  dataKey="suhii"
                  fill="#3b82f6"
                  name="Maximum SUHII increased temperatures"
                  line={{ stroke: '#3b82f6', strokeWidth: 1 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}