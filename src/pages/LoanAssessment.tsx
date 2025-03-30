
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { mockRiskAssessment } from '@/services/mockData';
import RiskAssessmentDisplay from '@/components/loan/RiskAssessmentDisplay';
import { CheckCircle2, Clock } from 'lucide-react';

const LoanAssessment: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Application Complete</h1>
        <p className="text-muted-foreground">
          Our AI has analyzed your business profile and generated your personalized offer.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Your Loan Offer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="bg-bizblue-50 p-4 rounded-lg text-center">
                <div className="text-4xl font-bold text-bizblue-700">$25,000</div>
                <div className="text-sm text-muted-foreground mt-1">Maximum amount</div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Term Length</span>
                  <span className="font-medium">12 months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Interest Rate</span>
                  <span className="font-medium">8.5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monthly Payment</span>
                  <span className="font-medium">$2,208.33</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Repayment</span>
                  <span className="font-medium">$26,500.00</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full bg-bizblue-600 hover:bg-bizblue-700">
              Accept Offer
            </Button>
            <Button variant="outline" className="w-full" onClick={() => navigate('/dashboard')}>
              Return to Dashboard
            </Button>
          </CardFooter>
        </Card>
        
        <RiskAssessmentDisplay assessment={mockRiskAssessment} />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Next Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="bg-bizblue-100 p-1 rounded-full">
                <CheckCircle2 className="h-5 w-5 text-bizblue-600" />
              </div>
              <div>
                <p className="font-medium">Application Submitted</p>
                <p className="text-sm text-muted-foreground">Your loan application has been received and processed</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-bizblue-100 p-1 rounded-full">
                <CheckCircle2 className="h-5 w-5 text-bizblue-600" />
              </div>
              <div>
                <p className="font-medium">AI Risk Assessment Completed</p>
                <p className="text-sm text-muted-foreground">Our AI has analyzed your business profile and financial data</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-amber-100 p-1 rounded-full">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="font-medium">Awaiting Your Acceptance</p>
                <p className="text-sm text-muted-foreground">Review and accept your personalized loan offer</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 opacity-50">
              <div className="bg-gray-100 p-1 rounded-full">
                <Clock className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="font-medium">Funding</p>
                <p className="text-sm text-muted-foreground">Once approved, funds will be deposited to your business account</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoanAssessment;
