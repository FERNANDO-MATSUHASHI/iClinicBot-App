import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private urlLogin = 'https://www.admmaster.com.br/iclinicbot/api/Auth/signIn';
  private urlAgendaChatBotId = 'https://www.admmaster.com.br/iclinicbot/api/AgendaChatBot';
  private urlMedicoEmail = 'https://www.admmaster.com.br/iclinicbot/api/Medico';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post<any>(this.urlLogin, body, { responseType: 'text' as 'json' }).pipe(
      catchError((error) => {
        console.error('Erro na requisição de login', error);
        return of({
          error: true,
          message: error?.message || 'Erro desconhecido',
          status: error?.status || 'Desconhecido',
          response: error?.error || 'Sem resposta'
        });
      })
    );
  }

  getAgendaChatBotById(id: number): Observable<any> {
    const authToken = localStorage.getItem('authToken'); // Obtém o token armazenado

    // Define os cabeçalhos da requisição com o token Bearer
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`
    });

    // Adiciona o ID na URL
    const url = `${this.urlAgendaChatBotId}/${id}`;

    return this.http.get<any>(url, { headers }).pipe(
      catchError((error) => {
        console.error(`Erro ao obter AgendaChatBot com ID ${id}`, error);
        return of(null);
      })
    );
  }

  getMedicoEmail(userEmail: string, authToken: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });

    const url = `${this.urlMedicoEmail}/${encodeURIComponent(userEmail)}`;

    return this.http.get<any>(url, { headers });
  }

  updateAgenda(idAgendaChatBot: number, item: any): Observable<any> {
    const authToken = localStorage.getItem('authToken'); // Obtém o token armazenado

    if (!authToken) {
      console.error('Token de autenticação não encontrado.');
      return of(null); // Retorna null se o token não for encontrado
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`
    });

    const body = {
      idAgendaChatBot: item.idAgendaChatBot,
      dataAgendaChatBot: item.dataAgendaChatBot,
      cel: item.cel,
      nome: item.nome,
      especialidade: item.especialidade,
      formaPagamento: item.formaPagamento,
      idCadastro: item.idCadastro,
      isAtendido: true  // Altera o status para 'Atendido'
    };

    // Adiciona o ID na URL
    const url = `${this.urlAgendaChatBotId}/${idAgendaChatBot}`;

    return this.http.put<any>(url, body, { headers }).pipe(
      catchError((error) => {
        console.error('Erro ao atualizar agenda:', error);
        return of(null); // Retorna null em caso de erro
      })
    );
  }
}
