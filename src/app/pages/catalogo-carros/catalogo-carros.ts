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
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

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

interface CarroSituacao extends Carro {
  isAvailable: boolean;
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
    MatSlideToggleModule,
  ],
  providers: [
    provideMomentDateAdapter(),
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
  templateUrl: './catalogo-carros.html',
  styleUrl: './catalogo-carros.css',
})
export class CatalogoCarros implements OnInit {
  listaCarrosCompleta: CarroSituacao[] = [];
  listaCarrosExibidos: CarroSituacao[] = [];
  listaFiltrada: CarroSituacao[] = [];
  limiteCarros = 8;
  incremento = 8;

  filtro = ""

  minDate: Date;

  modal = ""

  mostrarApenasDisponiveis = false;

  dadosReserva: {
    carro: Carro | null;
    bookingInformation: any
  } = {
    carro: null,
    bookingInformation: null,
  }

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
      this.listaCarrosCompleta = carros.map(carro => ({
        ...carro,
        isAvailable: true
      }))
      this.aplicarFiltro()
    });
  }

  aplicarFiltro(): void {
    const termo = this.filtro.trim().toLowerCase();

    if (termo === "") {
      this.listaFiltrada = this.listaCarrosCompleta;
    } else {
      this.listaFiltrada = this.listaCarrosCompleta.filter(carro =>
        carro.carBrand?.toLowerCase().includes(termo)
      )
    }

    if (this.mostrarApenasDisponiveis) {
      this.listaFiltrada = this.listaFiltrada.filter(carro => carro.isAvailable)
    }

    this.listaCarrosExibidos = this.listaFiltrada.slice(0, this.limiteCarros);
  }

  aumentarLista() {
    this.limiteCarros += this.incremento;

    this.aplicarFiltro();
  }

  search() {
    const formValue = this.bookingForm.value;
    const pickupLocation = formValue.pickupLocation
    const startDate = formValue.dateRange?.startDate ? new Date(formValue.dateRange.startDate) : null
    const endDate = formValue.dateRange?.endDate ? new Date(formValue.dateRange.endDate) : null
    const time = formValue.time ? new Date(formValue.time)
      .toLocaleTimeString('pt-BR', {hour: "2-digit", minute: "2-digit", timeZone: 'America/Sao_Paulo'}) : null

    if (!pickupLocation || !startDate || !endDate || !time) {
      alert("Por favor, preencha todos os dados antes de buscar.")
      return
    }

    this.listaCarrosCompleta.forEach(carro => {
      carro.isAvailable = this.checkCarAvailability(carro, pickupLocation, startDate, endDate, time);
    });

    this.aplicarFiltro();
  }

  checkCarAvailability(carro: Carro, location: string, startDate: Date, endDate: Date, time: string): boolean {
    if (carro.location != location) {
      return false
    }

    if (!carro.bookings || carro.bookings.length == 0) {
      return true
    }

    const [hour, minute] = time.split(':').map(Number);

    const startDateTime = new Date(startDate)
    startDateTime.setHours(hour, minute)

    const endDateTime = new Date(endDate)
    endDateTime.setHours(hour, minute)

    for(const booking of carro.bookings) {

      const [bookingHour, bookingMinute] = booking.time.split(':').map(Number);

      const [anoStart, mesStart, diaStart] = booking.startDate.split('-').map(Number);
      const bookingStartDateTime = new Date(anoStart, mesStart - 1, diaStart, bookingHour, bookingMinute);

      const [anoEnd, mesEnd, diaEnd] = booking.endDate.split('-').map(Number);
      const bookingEndDateTime = new Date(anoEnd, mesEnd - 1, diaEnd, bookingHour, bookingMinute);

      console.log("StartBooking " + bookingStartDateTime + " EndBooking " + bookingEndDateTime);
      console.log("Start " + startDateTime + " End " + endDateTime);

      if (startDateTime < bookingEndDateTime && endDateTime > bookingStartDateTime) {
        return false
      }
    }

    return true
  }

  clearForm(): void {
    this.bookingForm.reset();

    this.listaCarrosCompleta.forEach(carro => carro.isAvailable = true)

    this.aplicarFiltro();
  }

  abrirModalReserva(carro: CarroSituacao): void {

    if (this.bookingForm.value.pickupLocation == null
      || this.bookingForm.value.time == null
      || this.bookingForm.value.dateRange?.startDate == null
      || this.bookingForm.value.dateRange?.endDate == null) {
      alert("Antes de continuar. Insira os dados de retirada e devolução.")
      return
    }

    const bookingData = this.bookingForm.value;

    const formattedStartDate = bookingData.dateRange?.startDate
      ? new Date(bookingData.dateRange.startDate).toLocaleDateString()
      : null;

    const formattedEndDate = bookingData.dateRange?.endDate
      ? new Date(bookingData.dateRange.endDate).toLocaleDateString()
      : null;

    const formattedTime = bookingData.time
      ? new Date(bookingData.time)
        .toLocaleTimeString('pt-BR', {hour: "2-digit", minute: "2-digit", timeZone: 'America/Sao_Paulo'})
      : null;

    const bookingInfoParaSalvar = {
      ...bookingData,
      dateRange: {
        startDate: formattedStartDate,
        endDate: formattedEndDate
      },
      time: formattedTime,
    };

    this.dadosReserva.carro = carro
    this.dadosReserva.bookingInformation = bookingInfoParaSalvar;
    this.modal = "modal"
  }

  closeModal() {
    this.modal = ""
  }
}
