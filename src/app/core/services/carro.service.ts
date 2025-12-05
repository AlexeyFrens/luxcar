import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Carro} from '../types/type';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarroService {
  private readonly API = 'https://luxcar-pi3-default-rtdb.firebaseio.com/carros.json';

  constructor(private http: HttpClient) {}

  findAll(): Observable<Carro[]> {
    return this.http.get<{ [key: string]: Carro }>(this.API).pipe(
      map(data => {
        if (!data) {
          return [];
        }
        return Object.values(data);
      })
    );
  }

  incluir(carro: Carro): Observable<Carro> {
    return this.http.post<Carro>(this.API, carro);
  }
  editar(carro: Carro): Observable<Carro> {
    const url = `${this.API}/${carro.id}`;
    return this.http.put<Carro>(url, carro);
  }
  buscarId(): Observable<number | undefined> {
    return this.http.get<{ [key: string]: Carro }>(this.API).pipe(
      map(data => {
        const carros = data ? Object.values(data) : [];

        if (carros && carros.length > 0) {
          const ultimoCarro = carros[carros.length - 1];
          return ultimoCarro.id ? Number(ultimoCarro.id) : -1;
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
