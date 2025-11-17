import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../core/types/type';
import { CadastroService } from '../../core/services/cadastro.service';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css'
})
export class Cadastro implements OnInit {

  titulo = 'Cadastro de Clientes';

  clienteId?: number;
  cliente: Cliente = {} as Cliente;

  constructor(
    private service: CadastroService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    // Verifico se é alteração ou inclusão
    this.clienteId = Number(this.route.snapshot.params['id']);

    if (this.clienteId) {

      this.service.buscarPorId(this.clienteId).subscribe((cliente) => {
        if (cliente) {
          this.cliente.id = cliente.id;
          this.cliente.nome = cliente.nome;
          this.cliente.cpf = cliente.cpf;
          this.cliente.email = cliente.email;
          this.cliente.endereco = cliente.endereco;
        }
      });
    }
  }

  submeter() {
    if (this.clienteId) {

      this.service.editar(this.cliente).subscribe(() => {
        this.router.navigate(['/clientes']);
      });

    } else {
      // Inclusão
      this.service.incluirCliente(this.cliente).subscribe(() => {
        this.router.navigate(['/clientes']);
      });
    }
  }

  cancelar() {
    this.router.navigate(['/clientes']);
  }

  senhaVisivel = false;

  togglePassword() {
    const input = document.getElementById('passwordInput') as HTMLInputElement;
    if (!input) return;

    this.senhaVisivel = !this.senhaVisivel;
    input.type = this.senhaVisivel ? 'text' : 'password';
  }
}
