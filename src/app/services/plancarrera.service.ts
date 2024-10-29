import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plancarrera, Carrera, Plan } from '../models/plancarrera';

interface PlancarreraPayload {
  id: number;
  estado: string;
  carrera: number | null;
  plan: number | null;
}

@Injectable({
  providedIn: 'root'
})
export class PlancarreraService {

    private apiUrl = 'http://localhost:8080/api/plancarrera';
    private carreraUrl = 'http://localhost:8080/api/carrera';
    private planUrl = 'http://localhost:8080/api/plan';
  
    constructor(private http: HttpClient) {}
  
    // Cargar todos los planes de carrera
    getPlancarrera(): Observable<Plancarrera[]> {
      return this.http.get<Plancarrera[]>(this.apiUrl);
    }
  
    // Cargar todas las carreras
    getCarreras(): Observable<Carrera[]> {
      return this.http.get<Carrera[]>(this.carreraUrl);
    }
  
    // Cargar todos los planes
    getPlanes(): Observable<Plan[]> {
      return this.http.get<Plan[]>(this.planUrl);
    }
  
    // Crear un nuevo plan de carrera
    createPlancarrera(plancarrera: Plancarrera): Observable<Plancarrera> {
      return this.http.post<Plancarrera>(this.apiUrl, plancarrera);
    }
  
    // Actualizar un plan de carrera existente
    updatePlancarrera(plancarrera: Plancarrera): Observable<Plancarrera> {
      return this.http.put<Plancarrera>(`${this.apiUrl}/${plancarrera.id}`, plancarrera);
    }
  
    // Eliminar un plan de carrera
    deletePlancarrera(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
  }