
import React from 'react';
import FeatureCard from './FeatureCard';
import { Zap, ShieldCheck, CheckCircle } from 'lucide-react';

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-16 max-w-6xl mx-auto px-4">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl font-bold mb-4">Modern Lending for Modern Businesses</h2>
        <p className="text-muted-foreground text-lg">
          Our AI technology analyzes thousands of data points to give you the fairest loan terms possible.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard 
          icon={<Zap className="h-10 w-10 text-bizblue-500" />}
          title="Fast Decisions"
          description="Get funding decisions in minutes, not weeks. Money in your account as fast as same day approval."
        />
        <FeatureCard 
          icon={<ShieldCheck className="h-10 w-10 text-bizblue-500" />}
          title="Alternative Credit Scoring"
          description="We look beyond traditional credit scores to evaluate your business's true financial health."
        />
        <FeatureCard 
          icon={<CheckCircle className="h-10 w-10 text-bizblue-500" />}
          title="Transparent Terms"
          description="No hidden fees or confusing terms. Know exactly what you're paying for your capital."
        />
      </div>
    </section>
  );
};

export default FeaturesSection;
