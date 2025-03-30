
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Onboarding from "./pages/Onboarding"; // Add this line
import Dashboard from "./pages/Dashboard";
import ApplyLoan from "./pages/ApplyLoan";
import LoanAssessment from "./pages/LoanAssessment";
import AdminLoans from "./pages/AdminLoans";
import NotFound from "./pages/NotFound";

// Layout
import MainLayout from "./components/layout/MainLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/onboarding" element={<Onboarding />} /> {/* Add this line */}
            
            {/* Protected Routes - Inside MainLayout */}
            <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/apply" element={<ApplyLoan />} />
              <Route path="/assessment" element={<LoanAssessment />} />
              <Route path="/loans" element={<Dashboard />} />
              <Route path="/transactions" element={<Dashboard />} />
              <Route path="/analytics" element={<Dashboard />} />
              <Route path="/settings" element={<Dashboard />} />
              <Route path="/profile" element={<Dashboard />} />
              
              {/* Admin Routes */}
              <Route path="/admin/loans" element={<AdminLoans />} />
              <Route path="/admin/users" element={<AdminLoans />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
