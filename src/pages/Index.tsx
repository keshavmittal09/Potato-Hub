import React, { useState } from 'react';
import Header from '@/components/Header';
import Map from '@/components/Map';
import BusinessCard from '@/components/BusinessCard';
import FeatureCard from '@/components/FeatureCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Leaf, Users, Recycle } from 'lucide-react';
import heroImage from '@/assets/hero-marketplace.jpg';
import foodWasteIcon from '@/assets/food-waste-icon.png';
import localBusinessIcon from '@/assets/local-business-icon.png';
import ecoShoppingIcon from '@/assets/eco-shopping-icon.png';

const Index = () => {
  const [selectedBusiness, setSelectedBusiness] = useState(null);

  // Mock data for featured businesses
  const featuredBusinesses = [
    {
      id: 1,
      name: "Green Garden Cafe",
      type: "restaurant",
      ecoScore: 9.2,
      surplus: true,
      description: "Farm-to-table restaurant with daily surplus food deals and zero-waste packaging",
      distance: "0.3 miles",
      rating: 4.8
    },
    {
      id: 2,
      name: "EcoMart Local",
      type: "grocery",
      ecoScore: 8.7,
      surplus: false,
      description: "Zero-waste grocery store featuring local producers and bulk goods",
      distance: "0.5 miles",
      rating: 4.6
    },
    {
      id: 3,
      name: "Sustainable Cafe",
      type: "cafe",
      ecoScore: 8.9,
      surplus: true,
      description: "Coffee shop with compostable packaging and surplus pastries at 50% off",
      distance: "0.7 miles",
      rating: 4.7
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
        
        <div className="container mx-auto relative z-20">
          <div className="max-w-3xl">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              <Leaf className="w-4 h-4 mr-2" />
              Sustainable Community Platform
            </Badge>
            
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Discover{' '}
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Local & Sustainable
              </span>{' '}
              Choices Near You
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              PotatoHub connects you with local businesses, surplus food opportunities, and eco-friendly products. 
              Reduce waste, support your community, and make sustainable choices effortlessly.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg">
                Explore Map
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="border-primary/20 hover:bg-primary/5">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose PotatoHub?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform combines local business discovery, food waste reduction, and sustainable shopping 
              into one seamless experience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              image={foodWasteIcon}
              title="Reduce Food Waste"
              description="Find surplus food from local restaurants and cafes at discounted prices. Help reduce the 8-10% of global emissions from food waste."
            />
            <FeatureCard
              image={localBusinessIcon}
              title="Support Local Business"
              description="Discover and support independent businesses in your community. Our platform highlights local gems over corporate chains."
            />
            <FeatureCard
              image={ecoShoppingIcon}
              title="Eco-Friendly Shopping"
              description="Browse products and services with transparent eco-scores based on sustainability practices and community reviews."
            />
          </div>
        </div>
      </section>

      {/* Map and Business Discovery Section */}
      <section className="py-16 px-4 bg-muted/20">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Explore Your Local Ecosystem</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Use our interactive map to discover sustainable businesses, view eco-scores, and find surplus food opportunities near you.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="h-[500px] border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden">
                <Map onBusinessSelect={setSelectedBusiness} />
              </Card>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">Featured Near You</h3>
              {featuredBusinesses.map((business) => (
                <BusinessCard
                  key={business.id}
                  business={business}
                  onClick={() => setSelectedBusiness(business)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <Card className="bg-gradient-to-r from-primary/5 to-primary-glow/5 border-primary/10">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">2,500+</div>
                  <div className="text-muted-foreground">Local Businesses</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">15,000+</div>
                  <div className="text-muted-foreground">Surplus Meals Saved</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">95%</div>
                  <div className="text-muted-foreground">Community Satisfaction</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/10 to-primary-glow/10">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of eco-conscious consumers who are already reducing waste and supporting local businesses through PotatoHub.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Start Exploring
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-primary/20 hover:bg-primary/5">
              Register Your Business
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border/50 bg-card/50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
{/*                 <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold">E</span>
                </div> */}
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                          <img
                            src="/logo.png" // 👈 put your actual file name here
                            alt="PotatoHub Logo"
                            className="w-full h-full object-cover"
                          />
                    </div>
                <span className="text-xl font-bold">PotatoHub</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Building sustainable communities one local business at a time.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Find Businesses</li>
                <li>Surplus Food</li>
                <li>Eco Scores</li>
                <li>Community Reviews</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Business</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Register Your Business</li>
                <li>List Surplus Items</li>
                <li>Analytics Dashboard</li>
                <li>Sustainability Tips</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Community Guidelines</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/50 pt-8 mt-8 text-center text-sm text-muted-foreground">
            © 2024 PotatoHub. Making sustainability accessible for everyone.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
