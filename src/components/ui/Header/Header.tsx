// src/components/ui/Header/Header.tsx
import React from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import { useAuth } from '@/contexts/UserContext';
import { useConfig } from '@/contexts/ConfigContext';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  const { user, signOut } = useAuth();
  const { barbearia, clearConfiguration } = useConfig();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Limpar configurações locais
      clearConfiguration();
      
      // Fazer logout do Firebase
      await signOut();
      
      // Redirecionar para página inicial
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  if (!user) return null;

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className={styles.header}>
      <div className={styles.container}>
        <Navbar.Brand className={styles.brand}>
          <span className={styles.brandText}>Barber Connect</span>
          {barbearia && (
            <span className={styles.barbeariaName}>{barbearia.nomeEstabelecimento}</span>
          )}
        </Navbar.Brand>

        <Nav className={styles.nav}>
          <Nav.Link onClick={() => navigate('/store')}>Dashboard</Nav.Link>
          <Nav.Link onClick={() => navigate('/funcionarios')}>Funcionários</Nav.Link>
          <Nav.Link onClick={() => navigate('/create-schedule')}>Novo Agendamento</Nav.Link>
          <Nav.Link onClick={() => navigate('/reports')}>Relatórios</Nav.Link>
        </Nav>

        <div className={styles.userSection}>
          <Dropdown align="end">
            <Dropdown.Toggle variant="outline-light" className={styles.userButton}>
              <span className={styles.userAvatar}>
                {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
              </span>
              <span className={styles.userName}>
                {user.displayName || user.email?.split('@')[0]}
              </span>
            </Dropdown.Toggle>

            <Dropdown.Menu className={styles.dropdownMenu}>
              <Dropdown.Item onClick={() => navigate('/configuration')}>
                ⚙️ Configurações
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout} className={styles.logoutItem}>
                🚪 Sair
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </Navbar>
  );
};

export default Header;
