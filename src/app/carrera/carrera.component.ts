import { Component, OnInit } from '@angular/core';
import { Carrera } from '../models/carrera';
import { CarreraService } from '../services/carrera.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SiderbarComponent } from '../siderbar/siderbar.component';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-carrera',
  standalone: true,
  imports: [
    TableModule, 
    DialogModule, 
    ButtonModule, 
    ToolbarModule, 
    CommonModule, 
    FormsModule, 
    ToastModule, 
    ConfirmDialogModule,
    SiderbarComponent,
    CardModule
  ],
  templateUrl: './carrera.component.html',
  styleUrls: ['./carrera.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class CarreraComponent implements OnInit {
  carreras: Carrera[] = [];
  carrera!: Carrera;
  carreraDialog: boolean = false;
  submitted: boolean = false;

  constructor(
    private carreraService: CarreraService, 
    private messageService: MessageService, 
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadCarreras();
  }

  loadCarreras(): void {
    this.carreraService.getCarrera().subscribe(
      (data) => {
        console.log('Carreras cargadas:', data);
        this.carreras = data;
      },
      (error) => {
        console.error('Error al cargar las carreras', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar las carreras', life: 3000 });
      }
    );
  }

  openNew() {
    this.carrera = { id: 0, estado: '', nombre: '' };
    this.submitted = false;
    this.carreraDialog = true;
  }

  hideDialog() {
    this.carreraDialog = false;
    this.submitted = false;
  }

  saveCarrera() {
    this.submitted = true;

    if (this.carrera.nombre.trim()) {
      if (this.carrera.id) {
        // Actualizar carrera existente
        this.carreraService.updateCarrera(this.carrera).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Carrera actualizada', life: 3000 });
          this.loadCarreras();
        });
      } else {
        // Crear nueva carrera
        this.carreraService.createCarrera(this.carrera).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Carrera creada', life: 3000 });
          this.loadCarreras();
        });
      }

      this.carreraDialog = false;
      this.carrera = { id: 0, estado: '', nombre: '' };
    }
  }

  editCarrera(carrera: Carrera) {
    this.carrera = { ...carrera };
    this.carreraDialog = true;
  }

  deleteCarrera(carrera: Carrera) {
    this.confirmationService.confirm({
      message: `¿Estás seguro de que deseas eliminar esta Carrera?`,
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.carreraService.deleteCarrera(carrera.id).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Carrera eliminada', life: 3000 });
            this.loadCarreras();
          },
          (error) => {
            console.error('Error al eliminar la Carrera', error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar la Carrera', life: 3000 });
          }
        );
      }
    });
  }
}
