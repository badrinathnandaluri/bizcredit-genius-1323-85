
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <section className="relative bg-bizblue-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 z-10 relative">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              AI-Powered Business Funding for <span className="text-bizblue-300">Modern Companies</span>
            </h1>
            <p className="text-lg text-gray-300">
              Get fair, fast funding decisions based on your real business performance, 
              not just your credit score.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                onClick={() => navigate('/register')}
                size="lg" 
                className="bg-bizblue-500 hover:bg-bizblue-600 text-white"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                onClick={() => navigate('/login')}
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-bizblue-900"
              >
                Log In
              </Button>
            </div>
          </div>
          <div className="hidden md:block relative">
            <div className="absolute inset-0 z-0">
              <img 
                src="https://images.unsplash.com/photo-1531297484001-80022131f5a1" 
                alt="Laptop with financial data" 
                className="absolute inset-0 w-full h-full object-cover rounded-lg opacity-20"
              />
            </div>
            <div className="relative z-10 bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <p className="text-white text-center">Empowering businesses with AI-driven financial solutions</p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
    </section>
  );
};

export default HeroSection;
