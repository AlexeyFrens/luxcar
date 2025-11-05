import { Component } from '@angular/core';
import {CarrosCard} from '../../componentes/carros-card/carros-card';

@Component({
  selector: 'app-catalogo-carros',
  imports: [
    CarrosCard
  ],
  templateUrl: './catalogo-carros.html',
  styleUrl: './catalogo-carros.css'
})
export class CatalogoCarros {

}
