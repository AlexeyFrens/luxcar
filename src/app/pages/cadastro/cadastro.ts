import { Component } from '@angular/core';

@Component({
  selector: 'app-cadastro',
  imports: [],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css'
})
export class Cadastro {
//exibr senha
  senhaVisivel = false;

  togglePassword() {
    const input = document.getElementById('passwordInput') as HTMLInputElement;

    if (!input) return;

    this.senhaVisivel = !this.senhaVisivel;

    if (this.senhaVisivel) {
      input.type = 'text';
    } else {
      input.type = 'password';
    }
  }
}
