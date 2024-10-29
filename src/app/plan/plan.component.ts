import { Component, OnInit } from '@angular/core';
import { Plan } from '../models/plan';
import { PlanService } from '../services/plan.service';
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
  selector: 'app-plan',
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
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class PlanComponent implements OnInit {
  planes: Plan[] = [];
  plan!: Plan;
  planDialog: boolean = false;
  submitted: boolean = false;

  constructor(
    private planService: PlanService, 
    private messageService: MessageService, 
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadPlanes();
  }

  loadPlanes(): void {
    this.planService.getPlan().subscribe(
      (data) => {
        console.log('Planes cargados:', data);
        this.planes = data;
      },
      (error) => {
        console.error('Error al cargar los planes', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los planes', life: 3000 });
      }
    );
  }

  openNew() {
    this.plan = { id: 0, estado: '', nombre: '' };
    this.submitted = false;
    this.planDialog = true;
  }

  hideDialog() {
    this.planDialog = false;
    this.submitted = false;
  }

  savePlan() {
    this.submitted = true;

    if (this.plan.nombre.trim()) {
      if (this.plan.id) {
        // Actualizar plan existente
        this.planService.updatePlan(this.plan).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Plan actualizado', life: 3000 });
          this.loadPlanes();
        });
      } else {
        // Crear nuevo plan
        this.planService.createPlan(this.plan).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Plan creado', life: 3000 });
          this.loadPlanes();
        });
      }

      this.planDialog = false;
      this.plan = { id: 0, estado: '', nombre: '' };
    }
  }

  editPlan(plan: Plan) {
    this.plan = { ...plan };
    this.planDialog = true;
  }

  deletePlan(plan: Plan) {
    this.confirmationService.confirm({
      message: `¿Estás seguro de que deseas eliminar este Plan?`,
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.planService.deletePlan(plan.id).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Plan eliminado', life: 3000 });
            this.loadPlanes();
          },
          (error) => {
            console.error('Error al eliminar el Plan', error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el Plan', life: 3000 });
          }
        );
      }
    });
  }
}
