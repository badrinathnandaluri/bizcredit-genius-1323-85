import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

const loanFormSchema = z.object({
  loanAmount: z.string()
    .refine(val => !isNaN(Number(val)), { message: 'Amount must be a number' })
    .refine(val => Number(val) >= 5000, { message: 'Minimum loan amount is ₹5,000' })
    .refine(val => Number(val) <= 500000, { message: 'Maximum loan amount is ₹500,000' }),
  loanTerm: z.string(),
  loanPurpose: z.string().min(1, { message: 'Please select a loan purpose' }),
  businessDescription: z.string().min(50, { message: 'Please provide at least 50 characters' }),
  bankStatements: z.boolean().refine(val => val, { message: 'You must agree to provide bank statements' }),
  termsAndConditions: z.boolean().refine(val => val, { message: 'You must accept the terms and conditions' }),
});

type LoanFormValues = z.infer<typeof loanFormSchema>;

const LoanApplicationForm: React.FC = () => {
  const navigate = useNavigate();
  const [sliderValue, setSliderValue] = useState<number>(25000);
  
  const form = useForm<LoanFormValues>({
    resolver: zodResolver(loanFormSchema),
    defaultValues: {
      loanAmount: '25000',
      loanTerm: '12',
      loanPurpose: '',
      businessDescription: '',
      bankStatements: false,
      termsAndConditions: false,
    }
  });
  
  const handleSliderChange = (value: number[]) => {
    setSliderValue(value[0]);
    form.setValue('loanAmount', value[0].toString());
  };
  
  const onSubmit = (data: LoanFormValues) => {
    console.log('Loan application data:', data);
    // In a real app, this would submit to an API
    // For now, we'll just navigate to the assessment page
    navigate('/assessment');
  };
  
  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Apply for a Business Loan</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="loanAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loan Amount</FormLabel>
                  <FormControl>
                    <div className="space-y-3">
                      <div>
                        <Slider
                          value={[sliderValue]}
                          min={5000}
                          max={500000}
                          step={1000}
                          onValueChange={handleSliderChange}
                          className="py-4"
                        />
                      </div>
                      <div className="flex items-center">
                        <span className="text-muted-foreground mr-2">₹</span>
                        <Input
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            const value = Number(e.target.value);
                            if (!isNaN(value) && value >= 5000 && value <= 500000) {
                              setSliderValue(value);
                            }
                          }}
                        />
                      </div>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Loans available from ₹5,000 to ₹500,000
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="loanTerm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loan Term (Months)</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select loan term" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="6">6 months</SelectItem>
                      <SelectItem value="12">12 months</SelectItem>
                      <SelectItem value="24">24 months</SelectItem>
                      <SelectItem value="36">36 months</SelectItem>
                      <SelectItem value="48">48 months</SelectItem>
                      <SelectItem value="60">60 months</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose a repayment period that works for your business
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="loanPurpose"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loan Purpose</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select loan purpose" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="working_capital">Working Capital</SelectItem>
                      <SelectItem value="equipment">Equipment Purchase</SelectItem>
                      <SelectItem value="expansion">Business Expansion</SelectItem>
                      <SelectItem value="inventory">Inventory Purchase</SelectItem>
                      <SelectItem value="refinance">Debt Refinancing</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="businessDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Please provide a detailed description of your business and how you plan to use the funds..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The more details you provide, the better we can assess your application
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="bankStatements"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Bank Statement Access</FormLabel>
                    <FormDescription>
                      I agree to securely connect my business bank account for verification purposes.
                      This helps us speed up your application and offer better rates.
                    </FormDescription>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="termsAndConditions"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Terms and Conditions</FormLabel>
                    <FormDescription>
                      I agree to the terms and conditions, including the privacy policy and credit check authorization.
                    </FormDescription>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-4">
              <Button type="submit" className="w-full md:w-auto bg-bizblue-600 hover:bg-bizblue-700">
                Submit Application
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-6">
        <p className="text-sm text-muted-foreground text-center max-w-md">
          By submitting this application, you authorize BizCreditGenius to perform a soft credit check, 
          which will not affect your credit score.
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoanApplicationForm;
