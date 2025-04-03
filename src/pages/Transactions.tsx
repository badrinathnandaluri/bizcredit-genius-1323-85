
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ReceiptText, ArrowUp, ArrowDown, CreditCard, Banknote } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getUserTransactions } from '@/services/mockData';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Transaction } from '@/types';

const Transactions: React.FC = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    if (user) {
      const userTransactions = getUserTransactions(user.id);
      // Make sure the transactions have all required properties
      const formattedTransactions = userTransactions.map(t => ({
        ...t,
        category: t.category || 'Other',
        account: t.account || 'Main Account'
      }));
      setTransactions(formattedTransactions);
    }
  }, [user]);
  
  const filteredTransactions = transactions.filter(transaction => {
    // Apply type filter
    if (filter !== 'all' && transaction.type !== filter) return false;
    
    // Apply search filter
    if (searchTerm) {
      return transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
    }
    
    return true;
  });

  // Calculate total inflow and outflow
  const totalInflow = filteredTransactions
    .filter(t => t.type === 'deposit')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalOutflow = filteredTransactions
    .filter(t => ['payment', 'fee', 'withdrawal'].includes(t.type))
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Transactions</h1>
        <p className="text-muted-foreground">
          Monitor your business transactions and cash flow
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white bg-opacity-95 backdrop-blur-sm shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <ReceiptText className="h-5 w-5 text-blue-500 mr-2" />
              <div className="text-2xl font-bold">{filteredTransactions.length}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white bg-opacity-95 backdrop-blur-sm shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Inflow</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <ArrowDown className="h-5 w-5 text-green-500 mr-2" />
              <div className="text-2xl font-bold text-green-600">₹{totalInflow.toLocaleString()}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white bg-opacity-95 backdrop-blur-sm shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Outflow</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <ArrowUp className="h-5 w-5 text-red-500 mr-2" />
              <div className="text-2xl font-bold text-red-600">₹{totalOutflow.toLocaleString()}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-64">
          <Input 
            placeholder="Search transactions..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Transactions</SelectItem>
            <SelectItem value="deposit">Income</SelectItem>
            <SelectItem value="payment">Payments</SelectItem>
            <SelectItem value="fee">Fees</SelectItem>
            <SelectItem value="withdrawal">Withdrawals</SelectItem>
          </SelectContent>
        </Select>
        
        <Button variant="outline" onClick={() => {setFilter('all'); setSearchTerm('');}}>
          Reset Filters
        </Button>
      </div>

      {/* Transactions List */}
      <div className="bg-white rounded-lg border shadow-md p-4">
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-8">
            <ReceiptText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium">No transactions found</h3>
            <p className="mt-1 text-gray-500">
              {searchTerm || filter !== 'all' 
                ? "Try changing your search or filter criteria" 
                : "No transaction data is available for your account"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b">
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Description</th>
                  <th className="pb-3 font-medium">Category</th>
                  <th className="pb-3 font-medium text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="py-3 text-sm">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className="py-3">
                      <div className="flex items-center">
                        <div className="p-1.5 rounded-full bg-gray-100 mr-3">
                          {transaction.category === 'loan' ? (
                            <Banknote className="h-4 w-4 text-bizblue-600" />
                          ) : transaction.type === 'deposit' ? (
                            <ArrowDown className="h-4 w-4 text-green-500" />
                          ) : (
                            <CreditCard className="h-4 w-4 text-gray-500" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{transaction.description}</div>
                          <div className="text-xs text-gray-500">{transaction.account}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100">
                        {transaction.category}
                      </span>
                    </td>
                    <td className={`py-3 text-right font-medium ${
                      transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'deposit' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Transactions;
