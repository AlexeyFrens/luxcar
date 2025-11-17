import { Injectable } from '@angular/core';
import { Cliente } from '../types/type';
import { Observable } from 'rxjs'; // http cliente e rxjs permite a chamada http
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  private readonly API = 'http://localhost:3000/cliente'; //endereco da API

  constructor(private http: HttpClient) {} //injecao de dependencia

  listar(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.API); //chamada assincrona
  }

  incluirCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.API,cliente);    // metodo para inclusao(post)
  }
  editar(cliente: Cliente):Observable<Cliente> {
    const url=`${this.API}/${cliente.id}`;
    return this.http.put<Cliente>(url,cliente);  //metodo para alteracao (put)
  }

  buscarPorId(id: number): Observable<Cliente>{
    return this.http.get<Cliente>(this.API + `/${id}`);
  }

  excluircliente(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(this.API + `/${id}`);
  }
}
