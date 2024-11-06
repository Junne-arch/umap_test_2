"use client"

import { Card } from "@/components/ui/card";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface TemperaturePoint {
  temperature: number;
}

interface ComparisonDataPoint {
  groundTemp: number;
  satelliteTemp: number;
  difference: number;
  fill: string;
}

interface TemperatureComparisonChartProps {
  groundData: TemperaturePoint[];
  satelliteData: TemperaturePoint[];
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: ComparisonDataPoint;
  }>;
}

export const TemperatureComparisonChart: React.FC<TemperatureComparisonChartProps> = ({
  groundData,
  satelliteData
}) => {
  const comparisonData: ComparisonDataPoint[] = groundData.map((ground, index) => {
    if (!satelliteData[index]) return null;
    
    const groundTemp = ground.temperature;
    const satelliteTemp = satelliteData[index].temperature;
    const difference = Math.abs(groundTemp - satelliteTemp);
    
    return {
      groundTemp,
      satelliteTemp,
      difference,
      fill: `rgb(${Math.round(255 * Math.min(difference / 10, 1))}, ${Math.round(255 * (1 - Math.min(difference / 10, 1)))}, 0)`
    };
  }).filter((point): point is ComparisonDataPoint => point !== null);

  const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 p-2 rounded shadow text-xs">
          <p>Ground: {data.groundTemp}°C</p>
          <p>Satellite: {data.satelliteTemp}°C</p>
          <p>Difference: {data.difference.toFixed(1)}°C</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-64 h-64 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-3">
      <h3 className="text-sm font-medium mb-2">Ground vs Satellite</h3>
      <ResponsiveContainer width="100%" height={200}>
        <ScatterChart margin={{ top: 10, right: 10, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
          <XAxis
            type="number"
            dataKey="groundTemp"
            name="Ground Temperature"
            unit="°C"
            domain={[20, 45]}
            label={{ 
              value: 'Ground °C',
              position: 'bottom',
              offset: 0,
              fontSize: 10
            }}
            tick={{ fontSize: 10 }}
          />
          <YAxis
            type="number"
            dataKey="satelliteTemp"
            name="Satellite Temperature"
            unit="°C"
            domain={[20, 45]}
            label={{ 
              value: 'Satellite °C',
              angle: -90,
              position: 'left',
              offset: 0,
              fontSize: 10
            }}
            tick={{ fontSize: 10 }}
          />
          <Tooltip content={CustomTooltip} />
          <Scatter
            data={comparisonData}
            dataKey="satelliteTemp"
            shape={(props) => {
              const { cx, cy, fill } = props;
              return (
                <circle
                  cx={cx}
                  cy={cy}
                  r={4}
                  fill={fill}
                  stroke="#fff"
                  strokeWidth={1}
                />
              );
            }}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </Card>
  );
};