import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ThermometerSun, TreePine, Building2 } from 'lucide-react';
import { AcademicResource } from '@/app/app/resources/academic/data';

interface AcademicResourceCardProps {
  resource: AcademicResource;
}

const getTopicDetails = (topic: AcademicResource['topic']) => {
  switch (topic) {
    case 'methodology':
      return { icon: BookOpen, color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' };
    case 'urbanPlanning':
      return { icon: Building2, color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' };
    case 'climateScience':
      return { icon: ThermometerSun, color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' };
    case 'technology':
      return { icon: TreePine, color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' };
  }
};

const AcademicResourceCard: React.FC<AcademicResourceCardProps> = ({ resource }) => {
  const { icon: TopicIcon, color: topicColor } = getTopicDetails(resource.topic);

  return (
    <Card className="relative hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="pr-20">{resource.title}</CardTitle>
            <div className="flex items-center space-x-2">
              <TopicIcon className="h-4 w-4 text-muted-foreground" />
              <Badge variant="secondary" className={topicColor}>
                {resource.topic}
              </Badge>
              {resource.keywords?.map((keyword, index) => (
                <Badge key={index} variant="outline">
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>
          <Badge variant="secondary" className="absolute top-4 right-4">
            {resource.citations} citations
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-2">
          {resource.authors} ({resource.year})
        </p>
        <a 
          href={resource.link} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-500 hover:text-blue-700 transition-colors"
        >
          View Publication
        </a>
      </CardContent>
    </Card>
  );
};

export default AcademicResourceCard;