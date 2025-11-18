import {Component, OnInit} from '@angular/core';
import {Carro} from '../../core/types/type';
import {CarroService} from '../../core/services/carro.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-painel-carros',
  imports: [
    FormsModule
  ],
  templateUrl: './painel-carros.html',
  styleUrl: './painel-carros.css'
})
export class PainelCarros implements OnInit{
  listaCarros: Carro[] = [];

  isModalAberto = false;
  modo: 'incluir' | 'editar' = 'incluir';
  carroAtual: Carro = {} as Carro; // O carro sendo editado/criado

  constructor(private service: CarroService) {
  }

  ngOnInit(): void {
    this.carregarTabela();
  }

  carregarTabela(): void {
    this.service.findAll().subscribe((carros) => {
      this.listaCarros = carros;
    });
  }


  abrirModalInclusao(): void {
    this.modo = 'incluir';
    this.isModalAberto = true;

    this.service.buscarId().subscribe((ultimoId) => {
      let novoId = (ultimoId || 0) + 1;
      this.carroAtual = { id: String(novoId) } as Carro;
    });
  }

  abrirModalEdicao(carro: Carro): void {
    this.modo = 'editar';
    this.carroAtual = { ...carro };
    this.isModalAberto = true;
  }

  fecharModal(): void {
    this.isModalAberto = false;
    this.carroAtual = {} as Carro;
  }

  excluir(id: string) {
    if (id) {
      if (confirm(`Certeza que deseja excluir o carro com o id ${id}?`)) {
        this.service.excluir(Number(id)).subscribe(() => {
          this.carregarTabela();
        });
      }
    }
  }

  submeter() {

    if (this.modo === 'editar') {
      this.service.editar(this.carroAtual).subscribe(() => {
        this.carregarTabela();
        this.fecharModal();
      });
    } else {
      this.service.incluir(this.carroAtual).subscribe(() => {
        this.carregarTabela();
        this.fecharModal();
      });
    }
  }
}
