
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  BarChart3, 
  CreditCard, 
  ReceiptText, 
  Settings, 
  LogOut, 
  Users, 
  BarChart4,
  AlignJustify
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const Sidebar: React.FC = () => {
  const { logout, isAdmin } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <div className={cn(
        "fixed inset-0 bg-black/50 z-20 md:hidden",
        { "hidden": !collapsed }
      )} onClick={toggleSidebar}></div>
      
      <div className={cn(
        "fixed top-0 left-0 h-screen bg-sidebar text-sidebar-foreground w-64 z-30 transform transition-transform duration-300 ease-in-out",
        { "-translate-x-full": !collapsed },
        "md:translate-x-0 md:relative md:z-0"
      )}>
        <div className="p-4 flex items-center justify-center border-b border-sidebar-border h-16 bg-gradient-to-r from-bizblue-800 to-bizblue-600">
          <h1 className="text-xl font-bold text-white">Loan<span className="text-amber-300">lytic</span></h1>
        </div>
        
        <nav className="mt-6 px-2">
          <div className="space-y-1">
            <SidebarLink to="/dashboard" icon={<LayoutDashboard size={20} />} label="Dashboard" />
            <SidebarLink to="/apply" icon={<FileText size={20} />} label="Apply for Loan" />
            <SidebarLink to="/loans" icon={<CreditCard size={20} />} label="My Loans" />
            <SidebarLink to="/transactions" icon={<ReceiptText size={20} />} label="Transactions" />
            <SidebarLink to="/analytics" icon={<BarChart3 size={20} />} label="Analytics" />
            
            {isAdmin && (
              <>
                <div className="pt-4 pb-1">
                  <div className="px-3">
                    <p className="text-xs font-medium text-sidebar-foreground/60 uppercase tracking-wider">Admin</p>
                  </div>
                </div>
                <SidebarLink to="/admin/users" icon={<Users size={20} />} label="Users" />
                <SidebarLink to="/admin/loans" icon={<BarChart4 size={20} />} label="Loan Management" />
              </>
            )}
            
            <div className="pt-4 pb-1">
              <div className="px-3">
                <p className="text-xs font-medium text-sidebar-foreground/60 uppercase tracking-wider">Account</p>
              </div>
            </div>
            
            <SidebarLink to="/settings" icon={<Settings size={20} />} label="Settings" />
            
            <div className="px-3 mt-2">
              <button
                onClick={logout}
                className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
              >
                <LogOut size={20} className="mr-3" />
                Sign Out
              </button>
            </div>
          </div>
        </nav>
      </div>
      
      <Button
        variant="ghost"
        size="icon"
        className="fixed bottom-4 right-4 z-40 md:hidden bg-bizblue-600 text-white rounded-full shadow-lg hover:bg-bizblue-700"
        onClick={toggleSidebar}
      >
        <AlignJustify />
      </Button>
    </>
  );
};

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, label }) => {
  return (
    <NavLink 
      to={to}
      className={({ isActive }) => 
        cn(
          "w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
          isActive 
            ? "bg-sidebar-primary text-sidebar-primary-foreground" 
            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        )
      }
    >
      <span className="mr-3">{icon}</span>
      {label}
    </NavLink>
  );
};

export default Sidebar;
