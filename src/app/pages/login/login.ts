import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  senhaVisivel = false;

  togglePassword() {
    const input = document.getElementById('passwordLogin') as HTMLInputElement;
    if (!input) return;

    this.senhaVisivel = !this.senhaVisivel;
    input.type = this.senhaVisivel ? 'text' : 'password';
  }

}
