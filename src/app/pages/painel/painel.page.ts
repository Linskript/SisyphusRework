// src/app/painel/painel.page.ts

import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonItemSliding } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { CrudService } from 'src/app/services/crud.service';
import { EventModalPage } from '../event-modal/event-modal.page';
import { combineLatest, map } from 'rxjs';
import { CustomIntervalModalPage } from '../custom-interval-modal/custom-interval-modal.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.page.html',
  styleUrls: ['./painel.page.scss'],
})
export class PainelPage implements OnInit {
  daysOfWeek: string[] = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'];
  events: { [key: string]: any[] } = {};

  @ViewChild(IonItemSliding, { static: false }) slidingItem!: IonItemSliding;

  constructor(
    private authService: AuthService,
    private crudService: CrudService,
    private modalController: ModalController,
    private router: Router,
  ) {}

  ngOnInit() {
    this.authService.$user.subscribe((user) => {
      if (user) {
        this.loadEventsAndIntervals(user.uid);
      }
    });
  }

  loadEventsAndIntervals(userId: string) {
    this.crudService.obterHorariosDoUsuario(userId).subscribe((data) => {
      const eventsWithIntervals = data.map((event) => {
        return this.crudService.obterIntervalosDoEvento(event.id).pipe(
          map((intervals) => ({ ...event, intervals }))
        );
      });

      combineLatest(eventsWithIntervals).subscribe((events) => {
        this.events = this.organizeEventsByDay(events);
      });
    });
  }

  organizeEventsByDay(events: any[]): { [key: string]: any[] } {
    const organizedEvents: { [key: string]: any[] } = {};

    this.daysOfWeek.forEach((day) => {
      organizedEvents[day] = events
        .filter((event) => event.day === day)
        .sort((a, b) => {
          const timeA = a.hour * 60 + a.minute; // Convert time to minutes
          const timeB = b.hour * 60 + b.minute; // Convert time to minutes
          return timeA - timeB;
        });
    });

    return organizedEvents;
  }

  async openEventModal() {
    const modal = await this.modalController.create({
      component: EventModalPage,
    });
    modal.onDidDismiss().then(() => {
      // Atualizar os eventos após o modal ser fechado
      this.authService.$user.subscribe((user) => {
        if (user) {
          this.loadEventsAndIntervals(user.uid);
        }
      });
    });
    return await modal.present();
  }

  deleteEvent(eventId: string) {
    this.crudService.excluirHorarios(eventId).then(() => {
      console.log('Evento excluído com sucesso');
      // Atualizar a lista de eventos após exclusão
      this.authService.$user.subscribe((user) => {
        if (user) {
          this.loadEventsAndIntervals(user.uid);
        }
      });
    }).catch(error => {
      console.error('Erro ao excluir evento:', error);
    });
  }

  async createInterval(eventId: string) {
    const modal = await this.modalController.create({
      component: CustomIntervalModalPage,
    });
  
    modal.onDidDismiss().then((data) => {
      if (data.data) {
        const intervalData = {
          originalEventId: eventId,
          name: data.data.name,
          description: data.data.description,
        };
  
        this.crudService.cadastrarIntervalo(intervalData).then(() => {
          console.log('Intervalo cadastrado com sucesso');
          this.authService.$user.subscribe((user) => {
            if (user) {
              this.loadEventsAndIntervals(user.uid);
            }
          });
        }).catch((error) => {
          console.error('Erro ao cadastrar intervalo:', error);
        });
      }
    });
  
    await modal.present();
  }

  deleteInterval(intervalId: string) {
    this.crudService.excluirIntervalo(intervalId).then(() => {
      console.log('Intervalo excluído com sucesso');
      // Atualizar a lista de eventos após exclusão do intervalo
      this.authService.$user.subscribe((user) => {
        if (user) {
          this.loadEventsAndIntervals(user.uid);
        }
      });
    }).catch((error: any) => {
      console.error('Erro ao excluir intervalo:', error);
    });
  }

  onLogout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']); // Redireciona para a página de login após o logout
    }).catch(error => {
      console.error('Erro ao fazer logout:', error);
    });
  }

}
