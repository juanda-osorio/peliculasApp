import { Movie } from './../../interfaces/cartelera-response';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-peliculas-poster-grid',
  templateUrl: './peliculas-poster-grid.component.html',
  styleUrls: ['./peliculas-poster-grid.component.css']
})
export class PeliculasPosterGridComponent implements OnInit {
  
  /* Esta propiedad se carga cuando se entra a la pagina por primera vez (pages/home)
  *  y cuando se busca, que se le pasan los datos desde 'pages/buscador' */
  @Input() movies: Movie[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  verDetalle(movie: Movie){
    this.router.navigate(['/pelicula', movie.id]);
  }

}
