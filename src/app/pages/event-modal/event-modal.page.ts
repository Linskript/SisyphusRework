// src/app/pages/event-modal/event-modal.page.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from 'src/app/services/crud.service';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-event-modal',
  templateUrl: './event-modal.page.html',
  styleUrls: ['./event-modal.page.scss'],
})
export class EventModalPage implements OnInit {
  eventForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private crudService: CrudService,
    private modalController: ModalController,
    private authService: AuthService
  ) {
    this.eventForm = this.formBuilder.group({
      day: [null, Validators.required],
      hour: [null, [Validators.required, Validators.pattern('^[0-2][0-9]$')]],
      minute: [null, [Validators.required, Validators.pattern('^[0-5][0-9]$')]],
      title: [null, Validators.required],
      description: [null]
    });
  }

  ngOnInit() {}

  submit() {
    if (this.eventForm.valid) {
      const eventData = this.eventForm.value;
      this.authService.$user.subscribe(user => {
        if (user) {
          // Adiciona o ID do usuário aos dados do evento
          const dadosComUsuario = { ...eventData, userId: user.uid };
          this.crudService.cadastrarHorarios(dadosComUsuario)
            .then(() => {
              this.dismiss();
            })
            .catch(error => {
              console.error('Erro ao cadastrar evento:', error);
            });
        } else {
          console.error('Usuário não autenticado');
        }
      });
    }
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
