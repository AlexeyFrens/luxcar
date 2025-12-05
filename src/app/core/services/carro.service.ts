import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Carro} from '../types/type';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarroService {
  private readonly API = 'https://luxcar-pi3-default-rtdb.firebaseio.com/carros';

  constructor(private http: HttpClient) {}

  findAll(): Observable<Carro[]> {
    return this.http.get<{ [key: string]: Carro }>(`${this.API}.json`).pipe(
      map(data => {
        // Se não tiver dados, retorna array vazio
        if (!data) return [];

        // Transforma o Objeto { "key1": {dado}, "key2": {dado} }
        // em Array [ {id: "key1", ...dado}, {id: "key2", ...dado} ]
        return Object.keys(data).map(key => ({
          ...data[key],
          id: key
        }));
      })
    );
  }

  incluir(carro: Carro): Observable<any> {
    // Volta a usar POST. O Firebase gera o ID sozinho e retorna { name: "-MdT..." }
    return this.http.post(`${this.API}.json`, carro);
  }

  editar(carro: Carro): Observable<any> {
    // Monta a URL correta: .../carros/-MdT12345.json
    return this.http.put(`${this.API}/${carro.id}.json`, carro);
  }

  // Se o ID for string, o parâmetro aqui deve ser string
  excluir(id: string): Observable<any> {
    return this.http.delete(`${this.API}/${id}.json`);
  }
}
