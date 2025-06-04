// src/components/ui/LogoutButton/LogoutButton.tsx
import React from 'react';
import { Button } from 'react-bootstrap';
import { useAuth } from '@/contexts/UserContext';
import { useConfig } from '@/contexts/ConfigContext';
import { useNavigate } from 'react-router-dom';

interface LogoutButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline-danger';
  size?: 'sm' | 'lg';
  className?: string;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ 
  variant = 'outline-danger', 
  size,
  className 
}) => {
  const { signOut } = useAuth();
  const { clearConfiguration } = useConfig();
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (window.confirm('Tem certeza que deseja sair?')) {
      try {
        clearConfiguration();
        await signOut();
        navigate('/', { replace: true });
      } catch (error) {
        console.error('Erro ao fazer logout:', error);
      }
    }
  };

  return (
    <Button 
      variant={variant}
      size={size}
      onClick={handleLogout}
      className={className}
    >
      🚪 Sair
    </Button>
  );
};

export default LogoutButton;
