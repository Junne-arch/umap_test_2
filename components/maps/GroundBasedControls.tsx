"use client"

import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Thermometer, Satellite, Radio } from 'lucide-react';

interface GroundBasedControlsProps {
  showSatelliteData: boolean;
  showGroundData: boolean;
  temperatureThreshold: number;
  onSatelliteToggle: (checked: boolean) => void;
  onGroundToggle: (checked: boolean) => void;
  onThresholdChange: (value: number) => void;
}

export const GroundBasedControls: React.FC<GroundBasedControlsProps> = ({
  showSatelliteData,
  showGroundData,
  temperatureThreshold,
  onSatelliteToggle,
  onGroundToggle,
  onThresholdChange,
}) => {
  return (
    <Card className="w-64 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-3 space-y-3">
      <div className="space-y-3">
        <h3 className="text-sm font-semibold">Data Controls</h3>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Satellite className="h-4 w-4" />
            <Label htmlFor="satellite-data" className="text-sm">Satellite</Label>
          </div>
          <Switch
            id="satellite-data"
            checked={showSatelliteData}
            onCheckedChange={onSatelliteToggle}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Radio className="h-4 w-4" />
            <Label htmlFor="ground-data" className="text-sm">Ground</Label>
          </div>
          <Switch
            id="ground-data"
            checked={showGroundData}
            onCheckedChange={onGroundToggle}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Thermometer className="h-4 w-4" />
              <Label className="text-sm">Threshold</Label>
            </div>
            <Badge variant="secondary" className="text-xs">{temperatureThreshold}°C</Badge>
          </div>
          <Slider
            value={[temperatureThreshold]}
            onValueChange={(value) => onThresholdChange(value[0])}
            min={15}
            max={45}
            step={1}
          />
        </div>

        <div className="flex justify-between text-xs">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span>Cool</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 rounded-full bg-yellow-500" />
            <span>Warm</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <span>Hot</span>
          </div>
        </div>
      </div>
    </Card>
  );
};