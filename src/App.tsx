// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from '@/contexts/UserContext';
import { ConfigProvider } from '@/contexts/ConfigContext';
import { StoreProvider } from '@/contexts/StoreContext';
import { DateProvider } from '@/contexts/DateContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute/ProtectedRoute';
import ContribuinteCheck from '@/components/auth/ContribuinteCheck/ContribuinteCheck';
import Login from '@/Pages/Login/Login';
import ConfigurationPage from '@/Pages/configuration/ConfigurationPage';
import StorePage from '@/Pages/store/StorePage';
import CreateSchedule from '@/Pages/CreateSchedule/CreateSchedule';
import FuncionariosPage from '@/Pages/Funcionarios/FuncionariosPage';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import './App.scss';
import Register from './Pages/Register/Register';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <DateProvider>
        <UserProvider>
          <ConfigProvider>
            <StoreProvider>
              <BrowserRouter>
                <div className="app">
                  <Routes>
                    {/* Rota inicial - verificação de contribuinte */}
                    <Route path="/" element={<ContribuinteCheck />} />
                    
                    {/* Rota de login */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<ContribuinteCheck />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    
                    {/* ✅ ROTA DE CONFIGURAÇÃO SEM PROTEÇÃO */}
                    <Route path="/configuration" element={<ConfigurationPage />} />
                    
                    {/* Rotas protegidas */}
                    <Route 
                      path="/store" 
                      element={
                        <ProtectedRoute requiresConfiguration={true}>
                          <StorePage />
                        </ProtectedRoute>
                      } 
                    />
                    
                    <Route 
                      path="/create-schedule" 
                      element={
                        <ProtectedRoute requiresConfiguration={true}>
                          <CreateSchedule />
                        </ProtectedRoute>
                      } 
                    />

                    <Route 
                      path="/funcionarios" 
                      element={
                        <ProtectedRoute requiresConfiguration={true}>
                          <FuncionariosPage />
                        </ProtectedRoute>
                      } 
                    />
                    
                    <Route 
                      path="/schedule" 
                      element={
                        <ProtectedRoute requiresConfiguration={true}>
                          <div style={{ padding: '2rem', textAlign: 'center', color: 'white' }}>
                            <h2>Página de Agendamentos</h2>
                            <p>Em desenvolvimento...</p>
                          </div>
                        </ProtectedRoute>
                      } 
                    />
                    
                    <Route 
                      path="/reports" 
                      element={
                        <ProtectedRoute requiresConfiguration={true}>
                          <div style={{ padding: '2rem', textAlign: 'center', color: 'white' }}>
                            <h2>Página de Relatórios</h2>
                            <p>Em desenvolvimento...</p>
                          </div>
                        </ProtectedRoute>
                      } 
                    />

                    {/* Rota 404 */}
                    <Route 
                      path="*" 
                      element={
                        <div className="not-found">
                          <div className="not-found-content">
                            <h1>404</h1>
                            <h2>Página não encontrada</h2>
                            <p>A página que você está procurando não existe.</p>
                            <button onClick={() => window.location.href = '/'}>
                              Voltar ao início
                            </button>
                          </div>
                        </div>
                      } 
                    />
                  </Routes>
                </div>
              </BrowserRouter>
            </StoreProvider>
          </ConfigProvider>
        </UserProvider>
      </DateProvider>
    </ErrorBoundary>
  );
};

export default App;
