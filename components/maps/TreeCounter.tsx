"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TreeCounterProps {
  trees: {
    round: number;
    pine: number;
    flowering: number;
    branching: number;
    star: number;
  };
}

export default function TreeCounter({ trees }: TreeCounterProps) {
  const totalTrees = Object.values(trees).reduce((sum, count) => sum + count, 0);

  return (
    <Card className="w-64 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Tree Counter</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="font-semibold">Total Trees:</span>
          <span className="text-green-600 dark:text-green-400">{totalTrees}</span>
        </div>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span>Round Trees:</span>
            <span>{trees.round}</span>
          </div>
          <div className="flex justify-between">
            <span>Pine Trees:</span>
            <span>{trees.pine}</span>
          </div>
          <div className="flex justify-between">
            <span>Flowering Trees:</span>
            <span>{trees.flowering}</span>
          </div>
          <div className="flex justify-between">
            <span>Branching Trees:</span>
            <span>{trees.branching}</span>
          </div>
          <div className="flex justify-between">
            <span>Star Trees:</span>
            <span>{trees.star}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}