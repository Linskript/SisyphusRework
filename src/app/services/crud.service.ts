// src/app/services/crud.service.ts

import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private collectionName = 'horarios';
  private intervalosCollection = 'intervalos';

  constructor(private firestore: AngularFirestore) {}

  // Obter todos os horários do usuário autenticado
  obterHorariosDoUsuario(userId: string): Observable<any[]> {
    return this.firestore.collection<any>(this.collectionName, ref => ref.where('userId', '==', userId))
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        })),
        catchError(this.handleError<any[]>('obterHorarios', []))
      );
  }

  // Cadastrar ou atualizar horário
  cadastrarHorarios(dados: any): Promise<DocumentReference<any>> {
    return this.firestore.collection<any>(this.collectionName).add(dados)
      .catch(error => {
        console.error('Erro ao cadastrar/atualizar horário:', error);
        throw error;
      });
  }

  // Excluir horário
  excluirHorarios(id: string): Promise<void> {
    return this.firestore.collection<any>(this.collectionName).doc(id).delete()
      .catch(error => {
        console.error('Erro ao excluir horário:', error);
        throw error;
      });
  }

  // Cadastrar intervalo
  cadastrarIntervalo(dados: any): Promise<void> {
    const newId = this.firestore.createId();
    return this.firestore.collection(this.intervalosCollection).doc(newId).set(dados)
      .catch(error => {
        console.error('Erro ao cadastrar intervalo:', error);
        throw error;
      });
  }

  // Obter intervalos associados a um evento
  obterIntervalosDoEvento(eventId: string): Observable<any[]> {
    return this.firestore.collection<any>(this.intervalosCollection, ref => ref.where('originalEventId', '==', eventId))
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        })),
        catchError(this.handleError<any[]>('obterIntervalos', []))
      );
  }

  // Excluir intervalo
  excluirIntervalo(id: string): Promise<void> {
    return this.firestore.collection<any>(this.intervalosCollection).doc(id).delete()
      .catch(error => {
        console.error('Erro ao excluir intervalo:', error);
        throw error;
      });
  }

  // Tratamento de erros
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} falhou: ${error.message}`);
      return of(result as T);
    };
  }
}
