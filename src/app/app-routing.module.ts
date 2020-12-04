import { PeliculaComponent } from './pages/pelicula/pelicula.component';
import { BuscadorComponent } from './pages/buscador/buscador.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'pelicula/:id', component: PeliculaComponent
  },
  {
    path: 'buscar/:texto', component: BuscadorComponent
  },
  {
    path: 'buscar/genero/:numero', component: BuscadorComponent
  },

  {path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
