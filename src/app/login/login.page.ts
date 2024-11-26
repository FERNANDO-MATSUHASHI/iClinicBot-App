import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonButton, IonLabel, IonText } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientService } from '../service/client.service';

@Component({
  selector: 'app-home',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
  standalone: true,
  imports: [
    IonText,
    IonLabel,
    IonButton,
    IonInput,
    IonItem,
    IonContent,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [ClientService] // Adiciona o ClientService aqui
})
export class HomePage {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private clientServices: ClientService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      // Chama o ClientService para realizar o login
      this.clientServices.login(email, password).subscribe({
        next: (response) => {
          if (response.error) {
            // Em caso de erro, exibe uma mensagem de erro
            alert(`email e/ou senha inválido(s)!`);
          } else {
            const token = response;
            localStorage.setItem('authToken', token);
            localStorage.setItem('userEmail', email);
            const userEmail = localStorage.getItem('userEmail');
            const authToken = localStorage.getItem('authToken');

            if (userEmail != null && authToken != null) {
              this.clientServices.getMedicoEmail(userEmail, authToken).subscribe({
                next: (data) => {
                  localStorage.setItem('idCadastro', data.idCadastro);
                },
                error: (err) => {
                  console.error('Erro ao carregar dados:', err);
                },
              });
            }

            this.navCtrl.navigateForward('home');
          }
        },
        error: (err) => {
          // Tratar erro de rede ou outros erros gerais
          console.error('Erro de rede ou outro tipo de erro', err);
          alert('Erro ao se comunicar com o servidor. Tente novamente mais tarde.');
        }
      });
    }
  }
}
