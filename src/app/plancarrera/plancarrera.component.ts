import { Component, OnInit } from '@angular/core';
import { Plancarrera, Carrera, Plan } from '../models/plancarrera';
import { PlancarreraService } from '../services/plancarrera.service';
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
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-plancarrera',
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
    CardModule,
    DropdownModule
  ],
  templateUrl: './plancarrera.component.html',
  styleUrls: ['./plancarrera.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class PlancarreraComponent implements OnInit {
  plancarreras: Plancarrera[] = [];
  plancarrera!: Plancarrera;
  carreras: Carrera[] = [];
  planes: Plan[] = [];
  plancarreraDialog: boolean = false;
  submitted: boolean = false;

  constructor(
    private plancarreraService: PlancarreraService, 
    private messageService: MessageService, 
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadPlancarreras();
    this.loadCarreras();
    this.loadPlanes();
  }

  loadPlancarreras(): void {
    this.plancarreraService.getPlancarrera().subscribe(
      (data: Plancarrera[]) => {
        this.plancarreras = data;
      },
      (error: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los planes de carrera', life: 3000 });
      }
    );
  }

  loadCarreras(): void {
    this.plancarreraService.getCarreras().subscribe(
      (data: Carrera[]) => {
        this.carreras = data;
      },
      (error: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar las carreras', life: 3000 });
      }
    );
  }

  loadPlanes(): void {
    this.plancarreraService.getPlanes().subscribe(
      (data: Plan[]) => {
        this.planes = data;
      },
      (error: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los planes', life: 3000 });
      }
    );
  }

  openNew() {
    this.plancarrera = { id: 0, estado: '', carrera: { id: 0, nombre: '', estado: '' }, plan: { id: 0, nombre: '', estado: '' } };
    this.submitted = false;
    this.plancarreraDialog = true;
  }

  hideDialog() {
    this.plancarreraDialog = false;
    this.submitted = false;
  }

  savePlancarrera() {
    this.submitted = true;

    if (this.plancarrera.estado.trim()) {
      console.log("Payload para guardar o actualizar:", this.plancarrera);

      if (this.plancarrera.id) {
        this.plancarreraService.updatePlancarrera(this.plancarrera).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Plan de Carrera actualizado', life: 3000 });
            this.loadPlancarreras();
            this.plancarreraDialog = false;
          },
          (error) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar el Plan de Carrera', life: 3000 });
          }
        );
      } else {
        this.plancarreraService.createPlancarrera(this.plancarrera).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Plan de Carrera creado', life: 3000 });
            this.loadPlancarreras();
            this.plancarreraDialog = false;
          },
          (error) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo crear el Plan de Carrera', life: 3000 });
          }
        );
      }

      this.plancarrera = { id: 0, estado: '', carrera: { id: 0, nombre: '', estado: '' }, plan: { id: 0, nombre: '', estado: '' } };
    }
  }

  editPlancarrera(plancarrera: Plancarrera) {
    this.plancarrera = { ...plancarrera };
    this.plancarreraDialog = true;
  }

  deletePlancarrera(plancarrera: Plancarrera) {
    this.confirmationService.confirm({
      message: `¿Estás seguro de que deseas eliminar este Plan de Carrera?`,
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.plancarreraService.deletePlancarrera(plancarrera.id).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Plan de Carrera eliminado', life: 3000 });
            this.loadPlancarreras();
          },
          (error: any) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el Plan de Carrera', life: 3000 });
          }
        );
      }
    });
  }
}
