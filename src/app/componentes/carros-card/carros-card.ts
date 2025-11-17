import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Carro} from '../../core/types/type';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-carros-card',
  imports: [
    NgClass
  ],
  templateUrl: './carros-card.html',
  styleUrl: './carros-card.css'
})
export class CarrosCard {
  @Input() carro!: Carro;

  @Output() reservaClicada = new EventEmitter<Carro>();

  @Input() isAvailable: boolean = true;

  onReservarClick(): void {

    if (!this.isAvailable) {
      return;
    }

    this.reservaClicada.emit(this.carro);
  }
}
