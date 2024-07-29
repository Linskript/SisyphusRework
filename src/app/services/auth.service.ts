import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';
import { catchError } from 'rxjs/operators';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  $user: Observable<firebase.User | null>;

  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore) {
    this.$user = this.afAuth.authState;
  }

  // Cadastrar usuário e criar documento na coleção 'users'
  signUp(email: string, password: string): Promise<void> {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          return this.firestore.collection('users').doc(user.uid).set({
            email: user.email
          }).then(() => {
            // Retorna uma Promise resolvida após criar o documento
            return;
          }).catch(error => {
            console.error('Erro ao criar documento do usuário:', error);
            throw error; // Propaga o erro
          });
        } else {
          throw new Error('Usuário não autenticado'); // Propaga um erro se o usuário for null
        }
      })
      .catch(error => {
        console.error('Erro ao cadastrar usuário:', error);
        throw error; // Propaga o erro
      });
  }

  login(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  logout(): Promise<void> {
    return this.afAuth.signOut();
  }

  estadoLogin(): Observable<firebase.User | null> {
    return this.afAuth.authState;
  }
}
