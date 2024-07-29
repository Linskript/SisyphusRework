import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  $user: Observable<firebase.User | null>;

  constructor(private afAuth: AngularFireAuth) {
    this.$user = afAuth.authState;
  }

  async signUp(email: string, password: string): Promise<void> {
    try {
      await this.afAuth.createUserWithEmailAndPassword(email, password);
      console.log('Cadastro realizado com sucesso!');
    } catch (error) {
      // Lançar o erro para que o componente possa capturá-lo
      throw this.handleError(error);
    }
  }

  async login(email: string, senha: string): Promise<void> {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, senha);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      throw this.handleError(error);
    }
  }

  estadoLogin(): Observable<firebase.User | null> {
    return this.afAuth.authState;
  }

  // Método para lidar com erros
  private handleError(error: any): Error {
    console.error('Erro no Firebase:', error); // Log no console para depuração
    let errorMessage = 'Erro desconhecido';

    if (error && error.code) {
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = 'O e-mail fornecido é inválido.';
          break;
        case 'auth/email-already-in-use':
          errorMessage = 'Este e-mail já está em uso.';
          break;
        case 'auth/weak-password':
          errorMessage = 'A senha fornecida é muito fraca.';
          break;
        // Adicione outros casos conforme necessário
        default:
          errorMessage = error.message || errorMessage;
      }
    } else if (typeof error === 'string') {
      errorMessage = error;
    }

    return new Error(errorMessage);
  }
}
