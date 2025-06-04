// src/components/ui/MenuAsideRight/MenuAsideRight.tsx
import React, { ReactNode } from 'react';
import { useStore } from '../../../contexts/StoreContext';
import { useConfig } from '../../../contexts/ConfigContext';
import { useDate } from '../../../contexts/DateContext';
import styles from './MenuAsideRight.module.scss';
import type { Agendamento, Cliente, Funcionario } from '@/types';

interface MenuAsideRightProps {
  children?: ReactNode;
  title?: string;
  showQuickStats?: boolean;
}

interface QuickStatProps {
  icon: string;
  label: string;
  value: string | number;
  color?: string;
}

const QuickStat: React.FC<QuickStatProps> = ({ icon, label, value, color = '#b9954a' }) => (
  <div className={styles.quickStat}>
    <div className={styles.statIcon} style={{ color }}>
      {icon}
    </div>
    <div className={styles.statInfo}>
      <span className={styles.statLabel}>{label}</span>
      <span className={styles.statValue}>{value}</span>
    </div>
  </div>
);

export default function MenuAsideRight({ 
  children, 
  title = "Informações",
  showQuickStats = true 
}: MenuAsideRightProps) {
  // ✅ CORRIGIR: Usar nomes corretos dos contextos
  const { 
    agendamentos,              // ✅ Em vez de appointments
    clientes,                  // ✅ Em vez de clients
    funcionarios,              // ✅ Em vez de employees
    getFuncionariosAtivos,     // ✅ Em vez de getActiveEmployees
    selectedFuncionario        // ✅ Em vez de selectedEmployee
  } = useStore();
  
  const { barbearia } = useConfig(); // ✅ Em vez de barberShopConfig
  const { formatDate, isToday } = useDate();

  // ✅ CORRIGIR: Estatísticas usando propriedades corretas
  const todayAppointments = agendamentos.filter((agendamento: Agendamento) => 
    isToday(agendamento.data) && 
    (!selectedFuncionario || selectedFuncionario.id === '0' || agendamento.funcionarioId === selectedFuncionario.id)
  );

  const todayRevenue = todayAppointments
    .filter((agendamento: Agendamento) => agendamento.status === 'concluido')
    .reduce((total: number, agendamento: Agendamento) => total + agendamento.precoTotal, 0);

  const nextAppointment = agendamentos
    .filter((agendamento: Agendamento) => 
      new Date(agendamento.data).getTime() >= new Date().getTime() && 
      agendamento.status === 'agendado' &&
      (!selectedFuncionario || selectedFuncionario.id === '0' || agendamento.funcionarioId === selectedFuncionario.id)
    )
    .sort((a: Agendamento, b: Agendamento) => 
      new Date(a.data).getTime() - new Date(b.data).getTime()
    )[0];

  const activeEmployeesCount = getFuncionariosAtivos().length;
  const activeClientsCount = clientes.filter((cliente: Cliente) => cliente.ativo).length;

  // ✅ CORRIGIR: Nome da barbearia
  const displayName = barbearia?.nomeEstabelecimento || 'Barbearia';

  return (
    <aside className={styles.menuAside}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.shopInfo}>
          <span className={styles.shopName}>{displayName}</span>
          <span className={styles.currentDate}>
            {formatDate(new Date(), 'dddd, DD [de] MMMM')}
          </span>
        </div>
      </div>

      {showQuickStats && (
        <div className={styles.quickStats}>
          <h4 className={styles.sectionTitle}>Resumo do Dia</h4>
          
          <div className={styles.statsGrid}>
            <QuickStat
              icon="📅"
              label="Agendamentos Hoje"
              value={todayAppointments.length}
              color="#00bcd4"
            />
            
            <QuickStat
              icon="💰"
              label="Faturamento"
              value={`R$ ${todayRevenue.toFixed(2)}`}
              color="#48bb78"
            />
            
            <QuickStat
              icon="👥"
              label="Funcionários"
              value={activeEmployeesCount}
              color="#ed8936"
            />
            
            <QuickStat
              icon="👤"
              label="Clientes"
              value={activeClientsCount}
              color="#9f7aea"
            />
          </div>

          {nextAppointment && (
            <div className={styles.nextAppointment}>
              <h5 className={styles.nextTitle}>Próximo Agendamento</h5>
              <div className={styles.appointmentCard}>
                <div className={styles.appointmentTime}>
                  {nextAppointment.horarioInicio} {/* ✅ Propriedade correta */}
                </div>
                <div className={styles.appointmentInfo}>
                  <span className={styles.clientName}>
                    {clientes.find((cliente: Cliente) => cliente.id === nextAppointment.clienteId)?.nome || 'Cliente'}
                  </span>
                  <span className={styles.employeeName}>
                    {funcionarios.find((funcionario: Funcionario) => funcionario.id === nextAppointment.funcionarioId)?.nome || 'Funcionário'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div className={styles.content}>
        {children}
      </div>

      <div className={styles.footer}>
        <div className={styles.workingHours}>
          <h5 className={styles.footerTitle}>Horário de Funcionamento</h5>
          {barbearia?.horarioFuncionamento ? (
            <div className={styles.hours}>
              <span>
                {barbearia.horarioFuncionamento.abertura} - {barbearia.horarioFuncionamento.fechamento}
              </span>
              <span className={styles.workingDays}>
                {barbearia.horarioFuncionamento.diasFuncionamento.join(', ')}
              </span>
            </div>
          ) : (
            <span className={styles.noInfo}>Não configurado</span>
          )}
        </div>

        {barbearia?.telefone && (
          <div className={styles.contact}>
            <h5 className={styles.footerTitle}>Contato</h5>
            <span className={styles.phone}>{barbearia.telefone}</span>
          </div>
        )}
      </div>
    </aside>
  );
}
