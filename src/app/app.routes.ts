import { Routes } from '@angular/router';
import {CatalogoCarros} from './pages/catalogo-carros/catalogo-carros';
import {Home} from './pages/home/home';
import {Servicos} from './pages/servicos/servicos';
import {Contato} from './pages/contato/contato';
import {Cadastro} from './pages/cadastro/cadastro';
export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Luxcar - Home'
  },
  {
    path: 'carros',
    component: CatalogoCarros,
    title: 'Luxcar - Catalogo Carros'
  },
  {
    path: 'servicos',
    component: Servicos,
    title: 'Luxcar - Serviços'
  },
  {
    path: 'contato',
    component: Contato,
    title: 'Luxcar - Contato'
  },
  {
    path: 'cadastro',
    component: Cadastro,
    title: 'Luxcar - Cadastro'
  }
];
