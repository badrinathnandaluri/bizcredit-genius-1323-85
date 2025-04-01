import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';

const Index: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
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

      {/* Features Section */}
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

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground text-lg">
              Our streamlined process gets you the funding you need with minimal hassle
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-bizblue-100 text-bizblue-600 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="font-medium text-lg mb-2">Apply Online</h3>
              <p className="text-muted-foreground">Complete our simple application in under 10 minutes</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-bizblue-100 text-bizblue-600 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="font-medium text-lg mb-2">Connect Your Data</h3>
              <p className="text-muted-foreground">Securely link your business accounts for AI analysis</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-bizblue-100 text-bizblue-600 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="font-medium text-lg mb-2">Get Your Offer</h3>
              <p className="text-muted-foreground">Review your personalized loan options instantly</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-bizblue-100 text-bizblue-600 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">4</span>
              </div>
              <h3 className="font-medium text-lg mb-2">Receive Funds</h3>
              <p className="text-muted-foreground">Accept your offer and get funded as soon as same day</p>
            </div>
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

      {/* CTA Section */}
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

      {/* Footer */}
      <footer className="bg-bizblue-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">BizCreditGenius</h3>
              <p className="text-gray-400">AI-powered lending for modern businesses</p>
            </div>
            
            <div>
              <h3 className="text-md font-medium mb-4">Products</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Term Loans</a></li>
                <li><a href="#" className="hover:text-white">Lines of Credit</a></li>
                <li><a href="#" className="hover:text-white">Invoice Financing</a></li>
                <li><a href="#" className="hover:text-white">Equipment Financing</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-md font-medium mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Press</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-md font-medium mb-4">Connect</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Twitter</a></li>
                <li><a href="#" className="hover:text-white">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white">Facebook</a></li>
                <li><a href="#" className="hover:text-white">Instagram</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} BizCreditGenius. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4">
            {icon}
          </div>
          <h3 className="text-xl font-medium mb-2">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Index;
