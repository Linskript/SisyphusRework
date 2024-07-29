import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  showPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastController: ToastController,
    private router: Router // Adicionado para redirecionamento
  ) {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.maxLength(10)]],
    });
  }

  ngOnInit() {}

  async login() {
    const email = this.loginForm.get('email')!.value;
    const password = this.loginForm.get('password')!.value;

    try {
      await this.authService.login(email, password);
      this.presentToast('Login realizado com sucesso!', 'success');
      this.router.navigate(['/painel']); // Redireciona para a página "painel"
    } catch (error) {
      let errorMessage = 'Erro desconhecido';

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      this.presentToast('Erro no login: ' + errorMessage, 'danger');
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  async presentToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      color,
    });

    await toast.present();
  }
}
