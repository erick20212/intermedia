import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Carrera } from '../models/carrera';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarreraService {
  private apiUrl = 'http://localhost:8080/api/carrera';

  constructor(private http: HttpClient) {}

  
  getCarrera(): Observable<Carrera[]> {
    return this.http.get<Carrera[]>(this.apiUrl);
  }

  getCarreraById(id: number): Observable<Carrera> {
    return this.http.get<Carrera>(`${this.apiUrl}/${id}`); 
  }

  createCarrera(carrera: Carrera): Observable<Carrera> {
    return this.http.post<Carrera>(this.apiUrl, carrera);
  }

  
  updateCarrera(carrera: Carrera): Observable<Carrera> {
    return this.http.put<Carrera>(`${this.apiUrl}/${carrera.id}`,carrera); 
  }

  deleteCarrera(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`); 
  }
}