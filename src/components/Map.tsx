import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface MapProps {
  onBusinessSelect?: (business: any) => void;
}

const Map: React.FC<MapProps> = ({ onBusinessSelect }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);

  // Mock business data for MVP
  const mockBusinesses = [
    {
      id: 1,
      name: "Green Garden Cafe",
      type: "restaurant",
      ecoScore: 9.2,
      surplus: true,
      lat: 40.7128,
      lng: -74.0060,
      description: "Farm-to-table restaurant with daily surplus food deals"
    },
    {
      id: 2,
      name: "EcoMart Local",
      type: "grocery",
      ecoScore: 8.7,
      surplus: false,
      lat: 40.7589,
      lng: -73.9851,
      description: "Zero-waste grocery store with local produce"
    },
    {
      id: 3,
      name: "Sustainable Cafe",
      type: "cafe",
      ecoScore: 8.9,
      surplus: true,
      lat: 40.7505,
      lng: -73.9934,
      description: "Coffee shop with compostable packaging and surplus pastries"
    }
  ];

  const initializeMap = (token: string) => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = token;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      zoom: 12,
      center: [-74.0060, 40.7128], // NYC coordinates
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Add markers for mock businesses
    mockBusinesses.forEach((business) => {
      const el = document.createElement('div');
      el.className = 'marker';
      el.style.cssText = `
        background-color: hsl(var(--primary));
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 3px solid hsl(var(--primary-glow));
        cursor: pointer;
        box-shadow: var(--glow-shadow);
      `;

      const marker = new mapboxgl.Marker(el)
        .setLngLat([business.lng, business.lat])
        .addTo(map.current!);

      // Add popup
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`
          <div class="p-2">
            <h3 class="font-semibold text-sm">${business.name}</h3>
            <p class="text-xs text-muted-foreground">${business.description}</p>
            <div class="flex items-center gap-2 mt-1">
              <span class="text-xs font-medium text-success">Eco: ${business.ecoScore}/10</span>
              ${business.surplus ? '<span class="text-xs bg-warning/20 text-warning-foreground px-1 rounded">Surplus Available</span>' : ''}
            </div>
          </div>
        `);

      el.addEventListener('click', () => {
        popup.addTo(map.current!);
        marker.setPopup(popup);
        if (onBusinessSelect) {
          onBusinessSelect(business);
        }
      });
    });

    setShowTokenInput(false);
  };

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mapboxToken.trim()) {
      initializeMap(mapboxToken);
    }
  };

  if (showTokenInput) {
    return (
      <Card className="p-6 m-4">
        <h3 className="text-lg font-semibold mb-4">Enter Mapbox Token</h3>
        <p className="text-sm text-muted-foreground mb-4">
          To display the interactive map, please enter your Mapbox public token.
          You can get one at <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">mapbox.com</a>
        </p>
        <form onSubmit={handleTokenSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="pk.eyJ1IjoieW91ci11c2VybmFtZSIsImEiOiJjbGxzeHFjOGkwMD..."
            value={mapboxToken}
            onChange={(e) => setMapboxToken(e.target.value)}
            className="font-mono text-sm"
          />
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            Load Map
          </button>
        </form>
      </Card>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[400px]">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg overflow-hidden" />
      <div className="absolute top-4 left-4 right-4 z-10">
        <Input
          placeholder="Search for sustainable businesses near you..."
          className="bg-card/95 backdrop-blur-sm border-border/50"
        />
      </div>
    </div>
  );
};

export default Map;