import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { toast } from '../hooks/use-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, businessName: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  updateUserData: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'user@example.com',
    business: {
      name: 'Acme Inc',
      industry: 'Technology',
      yearEstablished: 2015,
      employeeCount: 15,
      annualRevenue: 750000,
      address: '123 Business St, San Francisco, CA',
      taxId: '12-3456789'
    },
    role: 'user'
  },
  {
    id: '2',
    name: 'Admin User',
    email: 'admin@example.com',
    business: {
      name: 'BizCredit Admin',
      industry: 'Financial Services',
      yearEstablished: 2010,
      employeeCount: 50,
    },
    role: 'admin'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // In a real app, this would be an API call
      const foundUser = mockUsers.find(u => u.email === email);
      
      if (foundUser && password === 'password') {
        setUser(foundUser);
        localStorage.setItem('user', JSON.stringify(foundUser));
        toast({
          title: "Login successful",
          description: `Welcome back, ${foundUser.name}!`,
        });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: error.message || "Please check your credentials and try again",
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string, businessName: string) => {
    try {
      setLoading(true);
      
      // In a real app, this would be an API call
      const newUser: User = {
        id: `${mockUsers.length + 1}`,
        name,
        email,
        business: {
          name: businessName,
          industry: 'Other',
          yearEstablished: new Date().getFullYear(),
          employeeCount: 1,
        },
        role: 'user'
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      toast({
        title: "Registration successful",
        description: "Your account has been created successfully",
      });
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error.message || "Please try again later",
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateUserData = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateUserData,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
