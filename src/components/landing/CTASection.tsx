
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const CTASection: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-16 bg-bizblue-50">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Grow Your Business?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Join thousands of businesses that have accessed over $500 million in funding through our platform
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            onClick={() => navigate('/register')}
            size="lg" 
            className="bg-bizblue-600 hover:bg-bizblue-700"
          >
            Get Started
          </Button>
          <Button 
            onClick={() => navigate('/login')}
            size="lg" 
            variant="outline"
            className="border-bizblue-600 text-bizblue-600 hover:bg-bizblue-50"
          >
            Sign In
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
