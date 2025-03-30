
import React from 'react';
import LoanApplicationForm from '@/components/loan/LoanApplicationForm';

const ApplyLoan: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Apply for a Loan</h1>
        <p className="text-muted-foreground">
          Fill out the form below to apply for business financing
        </p>
      </div>

      <LoanApplicationForm />
    </div>
  );
};

export default ApplyLoan;
