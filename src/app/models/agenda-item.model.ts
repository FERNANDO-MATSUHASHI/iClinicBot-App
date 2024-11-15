// src/app/models/agenda-item.model.ts

export interface AgendaItem {
  idAgendaChatBot: number; // ID do agendamento
  nome: string; // Nome do paciente ou cliente
  cel: string; // Celular do paciente
  especialidade: string; // Especialidade médica
  formaPagamento: string; // Forma de pagamento (ex: Dinheiro, Cartão)
  isAtendido: boolean; // Indica se o atendimento foi realizado ou não
  status: 'Pendente' | 'Andamento' | 'Concluído'; // Status do agendamento
  dataAgendaChatBot: string; // Data do agendamento (em formato ISO)
}
