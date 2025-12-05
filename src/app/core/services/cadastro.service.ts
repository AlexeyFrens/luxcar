import { Injectable } from '@angular/core';
import { Cliente } from '../types/type';
import { Observable } from 'rxjs'; // http cliente e rxjs permite a chamada http
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  private readonly API = 'https://luxcar-pi3-default-rtdb.firebaseio.com/cliente'; //endereco da API

  constructor(private http: HttpClient) {} //injecao de dependencia

  listar(): Observable<Cliente[]> {
    return this.http.get<{ [key: string]: Cliente }>(`${this.API}.json`).pipe(
      map(data => {
        if (!data) return [];
        return Object.keys(data).map(key => ({
          ...data[key],
          id: key
        }));
      })
    );
  }

  incluirCliente(cliente: Cliente): Observable<any> {
    return this.http.post(`${this.API}.json`, cliente);
  }

  editar(cliente: Cliente): Observable<any> {
    return this.http.put(`${this.API}/${cliente.id}.json`, cliente);
  }

  excluircliente(id: string): Observable<any> {
    return this.http.delete(`${this.API}/${id}.json`);
  }

  buscarPorId(id: string): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.API}/${id}.json`);
  }
}
