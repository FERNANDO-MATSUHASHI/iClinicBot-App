import { Component, OnInit } from '@angular/core';
import { AgendaService } from '../../service/agenda.service';  // Importa o serviço de agenda
import { AgendaItem } from '../../models/agenda-item.model';  // Importa o modelo de item de agenda
import { ClientService } from '../../service/client.service';  // Serviço para comunicação com a API do cliente
import { NavController } from '@ionic/angular';
import {
  IonContent,
  IonItemSliding,
  IonLabel,
  IonItem,
  IonButton,
  IonIcon,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonList,
  IonItemOptions,
  IonItemOption,
  IonAlert,
} from '@ionic/angular/standalone';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonAlert,
    IonItemOption,
    IonItemOptions,
    IonList,
    IonButtons,
    IonTitle,
    IonToolbar,
    IonHeader,
    IonButton,
    IonItem,
    IonLabel,
    IonItemSliding,
    IonContent,
    CommonModule,
    FormsModule,
  ]
})
export class HomePage implements OnInit {
  filteredAgenda: AgendaItem[] = [];  // Lista filtrada da agenda para exibição
  todayDate: Date = new Date();  // Data de hoje para filtrar agendamentos

  constructor(
    private agendaService: AgendaService,  // Serviço que mantém o estado da agenda
    private clientService: ClientService,  // Serviço para carregar a agenda da API
    private navCtrl: NavController  // Navegação
  ) {}

  ngOnInit() {
    // Inscreve-se no Observable do serviço de agenda
    this.agendaService.agenda$.subscribe((agenda) => {
      // Filtra a agenda para exibir apenas os agendamentos de hoje
      this.filteredAgenda = agenda.filter((item) =>
        item.dataAgendaChatBot.startsWith(this.todayDate.toISOString().split('T')[0])
      );
    });

    // Carrega a agenda do médico (ID fictício 1 - substitua pelo ID real)
    this.loadAgenda(1);  // Chama o método para carregar a agenda
  }

  getAlertButtons(item: any, slidingItem: any) {
    return [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          console.log('Ação cancelada');
        },
      },
      {
        text: 'OK',
        handler: () => {
          this.concluirAgenda(item, slidingItem);
        },
      },
    ];
  }

  loadAgenda(medicoId: number) {
    // Chama o serviço para carregar a agenda do médico
    this.clientService.getAgendaChatBotById(medicoId).subscribe({
      next: (data) => {
        // Atualiza a agenda no serviço com os dados recebidos
        this.agendaService.updateAgenda(data);
      },
      error: (err) => {
        console.error('Erro ao carregar agenda:', err);
      },
    });
  }

  // Método para alterar o status de um agendamento para "Em andamento"
  andamentoAgenda(item: AgendaItem, slidingItem: any) {
    item.status = 'Andamento';  // Altera o status do agendamento
    slidingItem.close();  // Fecha o item deslizante
    this.agendaService.updateAgenda([...this.filteredAgenda]);  // Atualiza a agenda com a mudança
  }

  async concluirAgenda(item: any, slidingItem: any) {
    const idAgendaChatBot = item.idAgendaChatBot;
    const updatedAgenda = { ...item, isAtendido: true };

    // Chama o serviço para atualizar o item
    this.clientService.updateAgenda(idAgendaChatBot, updatedAgenda).subscribe({
      next: (response) => {
        if (response == null) {
          item.status = 'Concluído';

          slidingItem.close();

          this.filteredAgenda = this.filteredAgenda.filter((agendaItem) => agendaItem.idAgendaChatBot !== item.idAgendaChatBot);

          this.filterAgendaByToday();
        }
      },
      error: (err) => {
        console.error('Erro ao concluir agenda:', err);
      },
    });
  }

  filterAgendaByToday() {
    const todayStr = this.todayDate.toISOString().split('T')[0];
    this.filteredAgenda = this.filteredAgenda.filter((item) =>
      item.dataAgendaChatBot.startsWith(todayStr)
    );
  }

  setResult() {
    console.log('Dismissed with role: ');
  }

  // Método de logout
  logout() {
    this.navCtrl.navigateRoot('/');  // Navega para a página inicial (login)
  }
}
