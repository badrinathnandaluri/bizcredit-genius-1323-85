
import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '@/components/auth/RegisterForm';
import { useAuth } from '@/context/AuthContext';

const Register: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // If user is already logged in, redirect to onboarding or dashboard
  React.useEffect(() => {
    if (isAuthenticated) {
      // Check if the user has completed data collection
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        if (user.dataCollection && user.dataCollection.completedAt) {
          navigate('/dashboard');
        } else {
          navigate('/onboarding');
        }
      } else {
        navigate('/onboarding');
      }
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white border-b p-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <a href="/" className="text-xl font-bold text-bizblue-900">
                BizCredit<span className="text-bizblue-600">Genius</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <RegisterForm />
        </div>
      </main>
    </div>
  );
};

export default Register;
