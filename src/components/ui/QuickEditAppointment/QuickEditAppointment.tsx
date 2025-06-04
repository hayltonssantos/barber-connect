// src/components/ui/QuickEditAppointment/QuickEditAppointment.tsx
import React, { useState } from 'react';
import { Modal, Button, Form, Badge } from 'react-bootstrap';
import { useStore } from '@/contexts/StoreContext';
import type { Agendamento, StatusAgendamento } from '@/types';
import styles from './QuickEditAppointment.module.scss';

interface QuickEditAppointmentProps {
  appointment: Agendamento | null;
  show: boolean;
  onHide: () => void;
  onUpdate: (appointmentId: string, updates: Partial<Agendamento>) => Promise<void>;
}

const QuickEditAppointment: React.FC<QuickEditAppointmentProps> = ({
  appointment,
  show,
  onHide,
  onUpdate
}) => {
  const { clientes, funcionarios, servicos } = useStore();
  const [isUpdating, setIsUpdating] = useState(false);
  const [newStatus, setNewStatus] = useState<StatusAgendamento>('agendado');

  const statusOptions: { value: StatusAgendamento; label: string; color: string }[] = [
    { value: 'agendado', label: 'Agendado', color: '#ed8936' },
    { value: 'confirmado', label: 'Confirmado', color: '#48bb78' },
    { value: 'em_andamento', label: 'Em Andamento', color: '#00bcd4' },
    { value: 'concluido', label: 'Concluído', color: '#38a169' },
    { value: 'cancelado', label: 'Cancelado', color: '#e53e3e' }
  ];

  React.useEffect(() => {
    if (appointment) {
      setNewStatus(appointment.status);
    }
  }, [appointment]);

  const handleUpdateStatus = async () => {
    if (!appointment) return;

    setIsUpdating(true);
    try {
      await onUpdate(appointment.id, { 
        status: newStatus,
        ...(newStatus === 'concluido' && { pago: true })
      });
      onHide();
    } catch (error) {
      console.error('Erro ao atualizar agendamento:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (!appointment) return null;

  const cliente = clientes.find(c => c.id === appointment.clienteId);
  const funcionario = funcionarios.find(f => f.id === appointment.funcionarioId);
  const servicosAgendamento = servicos.filter(s => appointment.servicoIds.includes(s.id));

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edição Rápida - Agendamento</Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        <div className={styles.appointmentInfo}>
          <div className={styles.infoRow}>
            <strong>Cliente:</strong>
            <span>{cliente?.nome || 'N/A'}</span>
          </div>
          
          <div className={styles.infoRow}>
            <strong>Funcionário:</strong>
            <span>{funcionario?.nome || 'N/A'}</span>
          </div>
          
          <div className={styles.infoRow}>
            <strong>Data/Hora:</strong>
            <span>
              {new Date(appointment.data).toLocaleDateString('pt-BR')} às {appointment.horarioInicio}
            </span>
          </div>
          
          <div className={styles.infoRow}>
            <strong>Serviços:</strong>
            <div className={styles.services}>
              {servicosAgendamento.map(servico => (
                <Badge key={servico.id} bg="secondary" className="me-1">
                  {servico.nome}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className={styles.infoRow}>
            <strong>Valor:</strong>
            <span className={styles.price}>R$ {appointment.precoTotal.toFixed(2)}</span>
          </div>
        </div>

        <Form.Group className="mt-4">
          <Form.Label><strong>Alterar Status:</strong></Form.Label>
          <div className={styles.statusOptions}>
            {statusOptions.map(option => (
              <div key={option.value} className={styles.statusOption}>
                <Form.Check
                  type="radio"
                  id={`status-${option.value}`}
                  name="status"
                  checked={newStatus === option.value}
                  onChange={() => setNewStatus(option.value)}
                />
                <label 
                  htmlFor={`status-${option.value}`}
                  className={styles.statusLabel}
                  style={{ borderColor: option.color }}
                >
                  <Badge 
                    style={{ backgroundColor: option.color }}
                    className={styles.statusBadge}
                  >
                    {option.label}
                  </Badge>
                </label>
              </div>
            ))}
          </div>
        </Form.Group>

        {newStatus === 'concluido' && (
          <div className={styles.completedInfo}>
            <small className="text-muted">
              ✓ Ao marcar como concluído, o pagamento será automaticamente marcado como realizado.
            </small>
          </div>
        )}
      </Modal.Body>
      
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button 
          variant="primary" 
          onClick={handleUpdateStatus}
          disabled={isUpdating || newStatus === appointment.status}
        >
          {isUpdating ? 'Atualizando...' : 'Atualizar Status'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default QuickEditAppointment;
