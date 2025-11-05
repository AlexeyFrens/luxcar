import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Carro} from '../types/type';

@Injectable({
  providedIn: 'root'
})
export class CarroService {
  private readonly API = 'http://localhost:3000/carros';

  constructor(private http: HttpClient) {}

  findAll(): Observable<Carro[]> {
    return this.http.get<Carro[]>(this.API);
  }
}
