import {Component, Input} from '@angular/core';
import {Carro} from '../../core/types/type';

@Component({
  selector: 'app-carros-card',
  imports: [],
  templateUrl: './carros-card.html',
  styleUrl: './carros-card.css'
})
export class CarrosCard {
  @Input() listaCarros: Carro = {
    description: 'O Huracán EVO Spyder permite experimentar a emoção de uma condução extrema.',
    engine: 'V10',
    imageUrl: 'assets/images/car_images/huracan_green.png',
    power: 640,
    seats: 2,
    title: 'Lamborghini Huracan Spyder'
  };
}
