// src/pages/Register/Register.tsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '@/contexts/UserContext';

const Register: React.FC = () => {
  const { signUp, loading, error } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const contribuinte = location.state?.contribuinte;
  
  const [form, setForm] = useState({
    nome: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (form.password !== form.confirmPassword) {
      alert('Senhas não coincidem');
      return;
    }

    try {
      await signUp(form.email, form.password, form.nome);
      // Após criar conta, vai para configuração
      navigate('/configuration', { 
        state: { contribuinte }
      });
    } catch (error) {
      console.error('Erro ao criar conta:', error);
    }
  };

  return (
    <div style={{ 
      padding: '2rem', 
      maxWidth: '500px', 
      margin: '0 auto',
      color: 'white'
    }}>
      <h2>Criar Conta</h2>
      <p>Contribuinte: {contribuinte}</p>
      
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            value={form.nome}
            onChange={(e) => setForm({...form, nome: e.target.value})}
            required
          />
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={form.email}
            onChange={(e) => setForm({...form, email: e.target.value})}
            required
          />
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            value={form.password}
            onChange={(e) => setForm({...form, password: e.target.value})}
            required
          />
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Confirmar Senha</Form.Label>
          <Form.Control
            type="password"
            value={form.confirmPassword}
            onChange={(e) => setForm({...form, confirmPassword: e.target.value})}
            required
          />
        </Form.Group>
        
        <Button type="submit" disabled={loading}>
          {loading ? 'Criando...' : 'Criar Conta'}
        </Button>
      </Form>
    </div>
  );
};

export default Register;
