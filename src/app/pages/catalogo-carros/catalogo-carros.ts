import {Component, OnInit} from '@angular/core';
import {CarrosCard} from '../../componentes/carros-card/carros-card';
import {Carro} from '../../core/types/type';
import {CarroService} from '../../core/services/carro.service';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerIntl, MatDatepickerModule} from '@angular/material/datepicker';
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {provideMomentDateAdapter} from '@angular/material-moment-adapter';
import 'moment/locale/pt-br';
import {MatTimepickerModule} from '@angular/material/timepicker';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
    timeInput: 'HH:mm:ss'
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
    timeInput: 'HH:mm',
    timeOptionLabel: 'HH:mm',
  }
}

@Component({
  selector: 'app-catalogo-carros',
  standalone: true,
  imports: [
    CarrosCard,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatTimepickerModule,
    FormsModule,
  ],
  providers: [
    provideMomentDateAdapter(),
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
  templateUrl: './catalogo-carros.html',
  styleUrl: './catalogo-carros.css',
})
export class CatalogoCarros implements OnInit {
  listaCarrosCompleta: Carro[] = [];
  listaCarrosExibidos: Carro[] = [];
  listaFiltrada: Carro[] = [];
  limiteCarros = 8;
  incremento = 8;

  filtro = ""

  minDate: Date;

  bookingForm = new FormGroup({
    pickupLocation: new FormControl(null),
    dateRange: new FormGroup({
      startDate: new FormControl(null),
      endDate: new FormControl(null),
    }),
    time: new FormControl(null),
  })

  constructor(private service: CarroService,
              private adapter: DateAdapter<any>,
              private datePickerIntl: MatDatepickerIntl
  ) {
    this.adapter.setLocale('pt-br');
    this.datePickerIntl.prevMonthLabel = 'Mês anterior';
    this.datePickerIntl.nextMonthLabel = 'Próximo mês';

    this.minDate = new Date();
  }

  ngOnInit(): void {
    this.service.findAll().subscribe(carros => {
      this.listaCarrosCompleta = carros
      this.aplicarFiltro()
    });
  }

  aplicarFiltro(): void {
    const termo = this.filtro.trim().toLowerCase();

    if(termo === "") {
      this.listaFiltrada = this.listaCarrosCompleta;
    }else {
      this.listaFiltrada = this.listaCarrosCompleta.filter(carro =>
        carro.carBrand?.toLowerCase().includes(termo)
      )
    }

    this.listaCarrosExibidos = this.listaFiltrada.slice(0, this.limiteCarros);
  }

  aumentarLista() {
    this.limiteCarros += this.incremento;

    this.aplicarFiltro();
  }

  search() {
    const toJsonData = JSON.parse(JSON.stringify(this.bookingForm.value))

    const timeFormated = new Date(toJsonData.time);
    const startDateFormated = new Date(toJsonData.dateRange.startDate)
    const endDateFormated = new Date(toJsonData.dateRange.endDate)

    alert(
      "Local: " + toJsonData.pickupLocation + "\nRetirada: " + startDateFormated.toLocaleDateString('pt-BR') +
      "\nDevolução: " + endDateFormated.toLocaleDateString('pt-BR') +
      "\nHorário: " + timeFormated.toLocaleTimeString('pt-BR', {hour: "2-digit", minute: "2-digit", timeZone: 'America/Sao_Paulo'})
    )
  }

  clearForm(): void {
    this.bookingForm.reset();
  }
}
