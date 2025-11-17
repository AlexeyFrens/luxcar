import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Carro} from '../../core/types/type';

@Component({
  selector: 'app-carros-card',
  imports: [],
  templateUrl: './carros-card.html',
  styleUrl: './carros-card.css'
})
export class CarrosCard {
  @Input() carro: Carro = {
    description: '',
    engine: '',
    imageUrl: '',
    power: 0,
    seats: 0,
    title: ''
  };

  @Output() reservaClicada = new EventEmitter<Carro>();

  onReservarClick(): void {
    this.reservaClicada.emit(this.carro);
  }
}
