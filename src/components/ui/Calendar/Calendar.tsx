// src/components/ui/Calendar/Calendar.tsx
import  { useMemo } from 'react';
import { generateDate, months } from '../../../utils/calendar';
import cn from '../../../utils/cn';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { Table } from 'react-bootstrap';
import { useDate } from '../../../contexts/DateContext';
import { useStore } from '../../../contexts/StoreContext';
import styles from './Calendar.module.scss';
import dayjs from 'dayjs';
import type { Agendamento } from '@/types/barbearia';

interface CalendarProps {
  showSchedule?: boolean;
  showCalendar?: boolean;
  onDateSelect?: (date: any) => void;
  onAppointmentClick?: (appointment: any) => void;
}

export default function Calendar({ 
  showSchedule = false, 
  showCalendar = true,
  onDateSelect,
  onAppointmentClick
}: CalendarProps) {
  
  const days = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  const daysFull = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

  const { 
    today, 
    selectedDate, 
    setSelectedDate, 
    setToday, 
    currentDate,
    formatDate,
    isToday,
    isSameDay
  } = useDate();

  // ✅ CORRIGIR: Usar nomes corretos do StoreContext
  const { 
    selectedFuncionario,        // ✅ Correto (não selectedEmployee)
    agendamentos,              // ✅ Correto (não appointments)
    clientes,                  // ✅ Correto (não clients)
    funcionarios,              // ✅ Correto (não employees)
    servicos,                  // ✅ Correto (não services)
    getAgendamentosByDate      // ✅ Correto (não getAppointmentsByDate)
  } = useStore();

  // ✅ CORRIGIR: Filtra agendamentos baseado no funcionário selecionado e data
  const filteredAppointments = useMemo(() => {
    let filtered = getAgendamentosByDate(selectedDate.toDate());
    
    // ✅ CORRIGIR: Usar selectedFuncionario em vez de selectedEmployee
    if (selectedFuncionario && selectedFuncionario.id !== '0') {
      filtered = filtered.filter((apt: Agendamento) => apt.funcionarioId === selectedFuncionario.id);
    }
    
    return filtered.sort((a: Agendamento, b: Agendamento) => 
      a.horarioInicio.localeCompare(b.horarioInicio)
    );
  }, [selectedDate, selectedFuncionario, agendamentos, getAgendamentosByDate]);

  // ✅ CORRIGIR: Conta agendamentos por data para mostrar indicadores no calendário
  const appointmentsByDate = useMemo(() => {
    const dateMap = new Map();
    
    agendamentos.forEach((agendamento: Agendamento) => {
      const dateKey = formatDate(dayjs(agendamento.data), 'YYYY-MM-DD');
      const current = dateMap.get(dateKey) || 0;
      
      // ✅ CORRIGIR: Filtra por funcionário se selecionado
      if (!selectedFuncionario || selectedFuncionario.id === '0' || agendamento.funcionarioId === selectedFuncionario.id) {
        dateMap.set(dateKey, current + 1);
      }
    });
    
    return dateMap;
  }, [agendamentos, selectedFuncionario, formatDate]);

  const handleDateClick = (date: any) => {
    setSelectedDate(date);
    onDateSelect?.(date);
  };

  const handleAppointmentClick = (agendamento: Agendamento) => {
    onAppointmentClick?.(agendamento);
  };

  const getAppointmentStatusColor = (status: string) => {
    const colors = {
      agendado: '#ed8936',
      confirmado: '#48bb78',
      em_andamento: '#00bcd4',
      concluido: '#38a169',
      cancelado: '#e53e3e'
    };
    return colors[status as keyof typeof colors] || '#gray';
  };

  const renderSchedule = () => {
    if (!showSchedule) return null;

    return (
      <div className={styles.schedule}>
        <div className={styles.scheduleHeader}>
          <h2 className={styles.scheduleTitle}>
            Agendamentos para {formatDate(selectedDate, 'DD [de] MMMM [de] YYYY')}
          </h2>
          <div className={styles.scheduleInfo}>
            <span className={styles.dayOfWeek}>
              {daysFull[selectedDate.day()]}
            </span>
            {selectedFuncionario && selectedFuncionario.id !== '0' && (
              <span className={styles.employeeFilter}>
                Funcionário: {selectedFuncionario.nome}
              </span>
            )}
          </div>
        </div>

        <div className={styles.appointmentsList}>
          {filteredAppointments.length === 0 ? (
            <div className={styles.noAppointments}>
              <div className={styles.emptyIcon}>📅</div>
              <h3>Nenhum agendamento</h3>
              <p>Não há agendamentos para esta data</p>
            </div>
          ) : (
            <Table striped hover className={styles.appointmentsTable}>
              <thead>
                <tr>
                  <th>Horário</th>
                  <th>Cliente</th>
                  <th>Funcionário</th>
                  <th>Serviços</th>
                  <th>Status</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map((agendamento: Agendamento) => {
                  // ✅ CORRIGIR: Usar nomes corretos das propriedades
                  const cliente = clientes.find(c => c.id === agendamento.clienteId);
                  const funcionario = funcionarios.find(f => f.id === agendamento.funcionarioId);
                  const servicosAgendamento = servicos.filter(s => 
                    agendamento.servicoIds.includes(s.id)
                  );

                  return (
                    <tr 
                      key={agendamento.id} 
                      className={styles.appointmentRow}
                      onClick={() => handleAppointmentClick(agendamento)}
                    >
                      <td className={styles.timeCell}>
                        <div className={styles.timeRange}>
                          <span className={styles.startTime}>{agendamento.horarioInicio}</span>
                          <span className={styles.endTime}>{agendamento.horarioFim}</span>
                        </div>
                      </td>
                      <td className={styles.clientCell}>
                        <div className={styles.clientInfo}>
                          <span className={styles.clientName}>
                            {cliente?.nome || 'Cliente não encontrado'}
                          </span>
                          <span className={styles.clientPhone}>{cliente?.telefone}</span>
                        </div>
                      </td>
                      <td className={styles.employeeCell}>
                        {funcionario?.nome || 'Funcionário não encontrado'}
                      </td>
                      <td className={styles.servicesCell}>
                        <div className={styles.servicesList}>
                          {servicosAgendamento.map((servico) => (
                            <span key={servico.id} className={styles.serviceTag}>
                              {servico.nome}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className={styles.statusCell}>
                        <span 
                          className={styles.statusBadge}
                          style={{ backgroundColor: getAppointmentStatusColor(agendamento.status) }}
                        >
                          {agendamento.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </td>
                      <td className={styles.priceCell}>
                        R$ {agendamento.precoTotal.toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
        </div>
      </div>
    );
  };

  const renderCalendar = () => {
    if (!showCalendar) return null;

    return (
      <div className={styles.calendar}>
        <div className={styles.calendarHeader}>
          <h1 className={styles.monthYear}>
            {months[today.month()]}, {today.year()}
          </h1>
          
          <div className={styles.calendarControls}>
            <button
              className={styles.navButton}
              onClick={() => setToday(today.month(today.month() - 1))}
              aria-label="Mês anterior"
            >
              <GrFormPrevious />
            </button>
            
            <button
              className={styles.todayButton}
              onClick={() => {
                setSelectedDate(currentDate);
                setToday(currentDate);
              }}
            >
              Hoje
            </button>
            
            <button
              className={styles.navButton}
              onClick={() => setToday(today.month(today.month() + 1))}
              aria-label="Próximo mês"
            >
              <GrFormNext />
            </button>
          </div>
        </div>

        <div className={styles.weekDays}>
          {days.map((day, index) => (
            <div key={index} className={styles.weekDay}>
              {day}
            </div>
          ))}
        </div>

        <div className={styles.datesGrid}>
          {generateDate(today.month(), today.year()).map(({ date, currentMonth }, index) => {
            const dateKey = formatDate(date, 'YYYY-MM-DD');
            const appointmentCount = appointmentsByDate.get(dateKey) || 0;
            const isSelected = isSameDay(selectedDate, date);
            const isTodayDate = isToday(date);

            return (
              <div
                key={index}
                className={cn(
                  styles.dateCell,
                  !currentMonth && styles.otherMonth,
                  isTodayDate && styles.today,
                  isSelected && styles.selected,
                  appointmentCount > 0 && styles.hasAppointments
                )}
                onClick={() => handleDateClick(date)}
              >
                <span className={styles.dateNumber}>
                  {date.date()}
                </span>
                
                {appointmentCount > 0 && (
                  <div className={styles.appointmentIndicator}>
                    <span className={styles.appointmentCount}>
                      {appointmentCount}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.calendarContainer}>
      {renderCalendar()}
      {renderSchedule()}
    </div>
  );
}
