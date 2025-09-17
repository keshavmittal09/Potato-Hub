import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Leaf, Clock } from 'lucide-react';

interface Business {
  id: number;
  name: string;
  type: string;
  ecoScore: number;
  surplus: boolean;
  description: string;
  distance?: string;
  rating?: number;
  image?: string;
}

interface BusinessCardProps {
  business: Business;
  onClick?: () => void;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ business, onClick }) => {
  const getEcoScoreColor = (score: number) => {
    if (score >= 8.5) return 'bg-success text-success-foreground';
    if (score >= 7) return 'bg-warning text-warning-foreground';
    return 'bg-muted text-muted-foreground';
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'restaurant':
        return '🍽️';
      case 'cafe':
        return '☕';
      case 'grocery':
        return '🛒';
      default:
        return '🏪';
    }
  };

  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 bg-card/95 backdrop-blur-sm"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{getTypeIcon(business.type)}</span>
            <div>
              <CardTitle className="text-lg leading-tight">{business.name}</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="text-xs">
                  {business.type}
                </Badge>
                {business.surplus && (
                  <Badge className="text-xs bg-warning/20 text-warning-foreground border-warning/30">
                    <Clock className="w-3 h-3 mr-1" />
                    Surplus
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${getEcoScoreColor(business.ecoScore)}`}>
              <Leaf className="w-3 h-3" />
              {business.ecoScore}
            </div>
            {business.rating && (
              <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                <Star className="w-3 h-3 fill-current text-yellow-500" />
                {business.rating}
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {business.description}
        </p>
        {business.distance && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="w-3 h-3" />
            {business.distance}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BusinessCard;