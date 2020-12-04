import { NgModule } from '@angular/core';

/* Definidos en este modulo y por tanto en 'declarations' */
import { HomeComponent } from './home/home.component';
import { PeliculaComponent } from './pelicula/pelicula.component';
import { BuscadorComponent } from './buscador/buscador.component';

/* IMPORTADOS */
import { PipesModule } from './../pipes/pipes.module';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './../components/components.module';
import { RatingModule } from 'ng-starrating';


@NgModule({
  declarations: [HomeComponent, PeliculaComponent, BuscadorComponent ],
  imports: [
    CommonModule,
    ComponentsModule,
    PipesModule,
    RatingModule,
  ]
})
export class PagesModule { }
