import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FeatureCardProps {
  icon?: string;
  title: string;
  description: string;
  image?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, image }) => {
  return (
    <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 bg-card/80 backdrop-blur-sm">
      <CardHeader className="text-center pb-4">
        {image ? (
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <img src={image} alt={title} className="w-10 h-10" />
          </div>
        ) : (
          <div className="text-4xl mb-4">{icon}</div>
        )}
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;