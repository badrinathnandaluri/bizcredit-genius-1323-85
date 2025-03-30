
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loan } from '@/types';
import { format } from 'date-fns';

interface LoanApplicationsTableProps {
  loans: Loan[];
  onViewLoan: (id: string) => void;
}

const LoanApplicationsTable: React.FC<LoanApplicationsTableProps> = ({ loans, onViewLoan }) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableCaption>List of all loan applications</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Loan ID</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Term</TableHead>
            <TableHead>Created Date</TableHead>
            <TableHead>Risk Score</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loans.map((loan) => (
            <TableRow key={loan.id}>
              <TableCell className="font-medium">{loan.id}</TableCell>
              <TableCell>${loan.amount.toLocaleString()}</TableCell>
              <TableCell>{loan.term} months</TableCell>
              <TableCell>{format(new Date(loan.createdAt), 'MMM dd, yyyy')}</TableCell>
              <TableCell>
                {loan.riskScore ? (
                  <span className={`font-medium ${getRiskScoreColor(loan.riskScore)}`}>
                    {loan.riskScore}
                  </span>
                ) : (
                  <span className="text-muted-foreground">Pending</span>
                )}
              </TableCell>
              <TableCell>
                <StatusBadge status={loan.status} />
              </TableCell>
              <TableCell className="text-right">
                <Button 
                  variant="ghost" 
                  onClick={() => onViewLoan(loan.id)}
                  className="h-8 px-2 text-sm"
                >
                  Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

// Helper function to get color based on risk score
const getRiskScoreColor = (score: number) => {
  if (score >= 80) return "text-green-600";
  if (score >= 60) return "text-amber-600";
  return "text-red-600";
};

interface StatusBadgeProps {
  status: Loan['status'];
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  let variant: "default" | "secondary" | "destructive" | "outline" = "secondary";
  let className = "";
  
  switch (status) {
    case 'approved':
      variant = "default";
      className = "bg-green-500 hover:bg-green-600";
      break;
    case 'active':
      variant = "default";
      className = "bg-bizblue-500 hover:bg-bizblue-600";
      break;
    case 'rejected':
      variant = "destructive";
      break;
    case 'completed':
      variant = "outline";
      break;
    default:
      break;
  }
  
  return (
    <Badge variant={variant} className={className}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

export default LoanApplicationsTable;
