import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Carro} from '../types/type';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarroService {
  private readonly API = 'http://localhost:3000/carros';

  constructor(private http: HttpClient) {}

  findAll(): Observable<Carro[]> {
    return this.http.get<Carro[]>(this.API);
  }

  incluir(carro: Carro): Observable<Carro> {
    return this.http.post<Carro>(this.API, carro);
  }
  editar(carro: Carro): Observable<Carro> {
    const url = `${this.API}/${carro.id}`;
    return this.http.put<Carro>(url, carro);
  }
  buscarId(): Observable<number | undefined> {
    return this.http.get<Carro[]>(this.API).pipe(
      map(carros => {
        if (carros && carros.length > 0) {
          return Number(carros[carros.length - 1].id);
        } else {
          return -1;
        }
      })
    );
  }
  buscarPorId(id: number): Observable<Carro | undefined> {
    return this.http.get<Carro>(this.API + `/${id}`);
  }
  excluir(id: number): Observable<Carro> {
    return this.http.delete<Carro>(this.API + `/${id}`);
  }
}
