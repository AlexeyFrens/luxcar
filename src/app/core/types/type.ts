
export interface Carro {
  id?: string,
  imageUrl: string,
  carBrand?: string,
  title: string,
  description: string,
  engine: string,
  power: number,
  seats: number

  location: string;
  bookings: { startDate: string; endDate: string; time: string }[];
}
export interface Cliente {
  idCliente: number | undefined;
  id?: string,
  nome: string,
  cpf: string,
  email: string,
  telefone: string,
  endereco : string,
}
