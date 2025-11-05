import { Component, OnInit } from '@angular/core';
import {CarrosCard} from '../../componentes/carros-card/carros-card';
import {Carro} from '../../core/types/type';
import {CarroService} from '../../core/services/carro.service';

@Component({
  selector: 'app-catalogo-carros',
  imports: [
    CarrosCard
  ],
  templateUrl: './catalogo-carros.html',
  styleUrl: './catalogo-carros.css'
})
export class CatalogoCarros {
  listaCarros: Carro[] = [];

  constructor(private service: CarroService) {}

  ngOnInit(): void {
    this.service.findAll().subscribe(carros => this.listaCarros = carros);
  }
}
