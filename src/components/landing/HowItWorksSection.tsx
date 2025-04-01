
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const StepItem: React.FC<{ number: number; title: string; description: string }> = ({ 
  number, 
  title, 
  description 
}) => (
  <div className="text-center">
    <div className="w-16 h-16 rounded-full bg-bizblue-100 text-bizblue-600 flex items-center justify-center mx-auto mb-4">
      <span className="text-xl font-bold">{number}</span>
    </div>
    <h3 className="font-medium text-lg mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

const HowItWorksSection: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground text-lg">
            Our streamlined process gets you the funding you need with minimal hassle
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <StepItem 
            number={1} 
            title="Apply Online" 
            description="Complete our simple application in under 10 minutes" 
          />
          
          <StepItem 
            number={2} 
            title="Connect Your Data" 
            description="Securely link your business accounts for AI analysis" 
          />
          
          <StepItem 
            number={3} 
            title="Get Your Offer" 
            description="Review your personalized loan options instantly" 
          />
          
          <StepItem 
            number={4} 
            title="Receive Funds" 
            description="Accept your offer and get funded as soon as same day" 
          />
        </div>
        
        <div className="mt-12 text-center">
          <Button 
            onClick={() => navigate('/register')}
            size="lg" 
            className="bg-bizblue-600 hover:bg-bizblue-700"
          >
            Apply Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
