
import React, { useState } from 'react';
import { getAllLoans } from '@/services/mockData';
import LoanApplicationsTable from '@/components/admin/LoanApplicationsTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loan } from '@/types';
import { mockRiskAssessment } from '@/services/mockData';
import RiskAssessmentDisplay from '@/components/loan/RiskAssessmentDisplay';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

const AdminLoans: React.FC = () => {
  const [loans] = useState(getAllLoans());
  const [search, setSearch] = useState('');
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const filteredLoans = loans.filter(loan => 
    loan.id.toLowerCase().includes(search.toLowerCase()) ||
    loan.amount.toString().includes(search)
  );
  
  const viewLoan = (id: string) => {
    const loan = loans.find(loan => loan.id === id);
    if (loan) {
      setSelectedLoan(loan);
      setDialogOpen(true);
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Loan Management</h1>
        <p className="text-muted-foreground">
          Review and manage all loan applications
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Loan Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by ID or amount..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button variant="secondary">Filter</Button>
          </div>
          
          <LoanApplicationsTable loans={filteredLoans} onViewLoan={viewLoan} />
        </CardContent>
      </Card>
      
      {/* Loan details dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Loan Application Details</DialogTitle>
            <DialogDescription>
              Review the loan application and AI risk assessment
            </DialogDescription>
          </DialogHeader>
          
          {selectedLoan && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">Loan Details</h3>
                    <div className="mt-2 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Loan ID</span>
                        <span className="font-medium">{selectedLoan.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Amount</span>
                        <span className="font-medium">${selectedLoan.amount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Term</span>
                        <span className="font-medium">{selectedLoan.term} months</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Interest Rate</span>
                        <span className="font-medium">{selectedLoan.interestRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status</span>
                        <Badge
                          variant={
                            selectedLoan.status === 'approved' ? 'default' :
                            selectedLoan.status === 'active' ? 'default' :
                            selectedLoan.status === 'rejected' ? 'destructive' : 
                            'secondary'
                          }
                          className={
                            selectedLoan.status === 'approved' ? 'bg-green-500 hover:bg-green-600' :
                            selectedLoan.status === 'active' ? 'bg-bizblue-500 hover:bg-bizblue-600' :
                            undefined
                          }
                        >
                          {selectedLoan.status.charAt(0).toUpperCase() + selectedLoan.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Application Date</span>
                        <span className="font-medium">
                          {format(new Date(selectedLoan.createdAt), 'MMM dd, yyyy')}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <h3 className="text-lg font-medium">Applicant Information</h3>
                    <div className="mt-2 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Business Name</span>
                        <span className="font-medium">Acme Inc</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Industry</span>
                        <span className="font-medium">Technology</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Years in Business</span>
                        <span className="font-medium">8 years</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Annual Revenue</span>
                        <span className="font-medium">$750,000</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <RiskAssessmentDisplay assessment={mockRiskAssessment} />
              </div>
            </div>
          )}
          
          <DialogFooter>
            {selectedLoan && selectedLoan.status === 'pending' && (
              <div className="flex space-x-2 w-full justify-end">
                <Button variant="destructive">
                  Reject Application
                </Button>
                <Button className="bg-green-600 hover:bg-green-700">
                  Approve Application
                </Button>
              </div>
            )}
            
            {selectedLoan && selectedLoan.status === 'approved' && (
              <Button className="bg-bizblue-600 hover:bg-bizblue-700">
                View Agreement
              </Button>
            )}
            
            {selectedLoan && selectedLoan.status === 'active' && (
              <Button className="bg-bizblue-600 hover:bg-bizblue-700">
                View Payment Schedule
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminLoans;
