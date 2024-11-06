"use client"

import React, { useState, useMemo } from 'react';
import AcademicResourceCard from '@/components/AcademicResourceCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search, BookOpen, ThermometerSun, TreePine, Building2 } from 'lucide-react';
import { academicResources } from './data';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const topics = {
  methodology: "Research Methodology",
  urbanPlanning: "Urban Planning",
  climateScience: "Climate Science",
  technology: "Technology & Remote Sensing"
};

const COLORS = ['#3b82f6', '#22c55e', '#ef4444', '#a855f7'];

const getTopicIcon = (topic: string) => {
  switch (topic) {
    case 'methodology':
      return BookOpen;
    case 'urbanPlanning':
      return Building2;
    case 'climateScience':
      return ThermometerSun;
    case 'technology':
      return TreePine;
    default:
      return BookOpen;
  }
};

export default function AcademicResourcesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'year' | 'citations' | 'none'>('none');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const resourcesByTopic = useMemo(() => {
    return academicResources.reduce((acc, resource) => {
      const topic = resource.topic || 'methodology';
      if (!acc[topic]) {
        acc[topic] = [];
      }
      acc[topic].push(resource);
      return acc;
    }, {} as Record<string, typeof academicResources>);
  }, []);

  const filteredResources = useMemo(() => {
    let filtered = academicResources;

    if (searchTerm) {
      filtered = filtered.filter(resource =>
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.authors.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedTopic) {
      filtered = filtered.filter(resource => resource.topic === selectedTopic);
    }

    if (sortBy !== 'none') {
      filtered = [...filtered].sort((a, b) => {
        if (sortBy === 'year') {
          return b.year - a.year;
        }
        return b.citations - a.citations;
      });
    }

    return filtered;
  }, [searchTerm, sortBy, selectedTopic]);

  const stats = useMemo(() => {
    const citationsByTopic = Object.entries(topics).map(([key, label]) => ({
      topic: label,
      citations: resourcesByTopic[key]?.reduce((sum, r) => sum + r.citations, 0) || 0
    }));

    const timelineData = Array.from({ length: 2024 - 1980 }, (_, i) => ({
      year: 1980 + i,
      papers: 0,
      citations: 0
    }));

    academicResources.forEach(resource => {
      const yearIndex = resource.year - 1980;
      if (yearIndex >= 0 && yearIndex < timelineData.length) {
        timelineData[yearIndex].papers += 1;
        timelineData[yearIndex].citations += resource.citations;
      }
    });

    const filteredTimeline = timelineData.filter(d => d.papers > 0);

    const topicDistribution = Object.entries(topics).map(([key, label]) => ({
      name: label,
      value: resourcesByTopic[key]?.length || 0
    }));

    return {
      citationsByTopic,
      timeline: filteredTimeline,
      topicDistribution
    };
  }, [resourcesByTopic]);

  return (
    <div className="space-y-4">
      <div>
        <PageHeader
          title="Academic Resources"
          description="This curated collection represents key publications that have either directly influenced the development of this platform, inspired its various aspects, or stand as seminal works in remote sensing for urban heat monitoring. While not exhaustive, it includes select publications from adjacent fields, acknowledging the holistic nature of urban heat island studies and their interconnections with urban planning, climate science, and environmental monitoring. Kindly contact umap@gaf.de with omissions."
          badge="Research"
          className="max-w-none mb-6"
        />

        <div className="flex justify-end space-x-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 w-[300px]"
            />
          </div>
          <Select onValueChange={(value: 'year' | 'citations' | 'none') => setSortBy(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Default</SelectItem>
              <SelectItem value="year">Year (Newest first)</SelectItem>
              <SelectItem value="citations">Citations (Highest first)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="topics">Topics</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          {filteredResources.map((resource, index) => (
            <AcademicResourceCard key={index} resource={resource} />
          ))}
        </TabsContent>

        <TabsContent value="topics">
          <Accordion type="single" collapsible className="space-y-4">
            {Object.entries(topics).map(([key, label]) => {
              const TopicIcon = getTopicIcon(key);
              return (
                <AccordionItem key={key} value={key}>
                  <AccordionTrigger className="flex items-center">
                    <div className="flex items-center space-x-2">
                      <TopicIcon className="h-5 w-5" />
                      <span>{label}</span>
                      <Badge variant="secondary" className="ml-2">
                        {resourcesByTopic[key]?.length || 0} papers
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-4">
                      {resourcesByTopic[key]?.map((resource, index) => (
                        <AcademicResourceCard key={index} resource={resource} />
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </TabsContent>

        <TabsContent value="stats">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Citations by Topic</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stats.citationsByTopic}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="topic" angle={-45} textAnchor="end" height={100} />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="citations" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Topic Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={stats.topicDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {stats.topicDistribution.map((entry, index) => (
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

            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Publication Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={stats.timeline}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="papers"
                        stroke="#3b82f6"
                        name="Publications"
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="citations"
                        stroke="#ef4444"
                        name="Citations"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}