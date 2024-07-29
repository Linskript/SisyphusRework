import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  formcc: FormGroup;
  showPassword = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastController: ToastController
  ) {
    this.formcc = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.maxLength(10)]],
    });
  }

  ngOnInit() {}

  async signUp() {
    const email = this.formcc.get('email')!.value;
    const password = this.formcc.get('password')!.value;

    try {
      await this.authService.signUp(email, password);
      this.presentToast('Cadastro realizado com sucesso!', 'success');
    } catch (error) {
      let errorMessage = 'Erro desconhecido';

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      this.presentToast('Erro no cadastro: ' + errorMessage, 'danger');
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
