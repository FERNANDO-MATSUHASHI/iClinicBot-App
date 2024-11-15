// src/app/service/agenda.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AgendaItem } from '../models/agenda-item.model';

@Injectable({
  providedIn: 'root',
})
export class AgendaService {
  private agendaSource = new BehaviorSubject<AgendaItem[]>([]); // BehaviorSubject mantém o último valor emitido
  agenda$ = this.agendaSource.asObservable(); // Observable para observadores se inscreverem

  constructor() {}

  // Método para atualizar a agenda
  updateAgenda(data: AgendaItem[]) {
    this.agendaSource.next(data); // Atualiza os dados da agenda
  }

  // Método para adicionar um item à agenda
  addAgendaItem(item: AgendaItem) {
    const currentData = this.agendaSource.getValue(); // Pega o valor atual
    this.agendaSource.next([...currentData, item]); // Adiciona o novo item e emite os dados atualizados
  }

  // Método para remover um item da agenda
  removeAgendaItem(id: number) {
    const currentData = this.agendaSource.getValue(); // Pega o valor atual
    this.agendaSource.next(currentData.filter(item => item.idAgendaChatBot !== id)); // Filtra e emite a agenda sem o item removido
  }
}
