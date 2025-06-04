// src/components/auth/ProtectedRoute/ProtectedRoute.tsx
import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/UserContext';
import { useConfig } from '@/contexts/ConfigContext';
import Header from '@/components/ui/Header/Header';
import Loading from '@/components/ui/Loading/Loading';

interface ProtectedRouteProps {
  children: ReactNode;
  requiresConfiguration?: boolean;
  redirectTo?: string;
  showHeader?: boolean; // ✅ Nova prop para controlar header
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiresConfiguration = false,
  redirectTo = '/login',
  showHeader = true // ✅ Mostrar header por padrão
}) => {
  const { user, loading: authLoading } = useAuth();
  const { isConfigured, loading: configLoading } = useConfig();
  const location = useLocation();

  if (authLoading || configLoading) {
    return <Loading message="Verificando autenticação..." />;
  }

  if (!user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  if (requiresConfiguration && !isConfigured) {
    return <Navigate to="/configuration" state={{ from: location }} replace />;
  }

  return (
    <>
      {showHeader && <Header />}
      {children}
    </>
  );
};

export default ProtectedRoute;
