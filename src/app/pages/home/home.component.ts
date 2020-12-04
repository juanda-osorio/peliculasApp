import { Movie } from './../../interfaces/cartelera-response';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  
  /* 'movies': Propiedad para almacenar las peliculas (20)
  *  que se mostrarán en 'poster-grid-component' y que
  *  se sumarán mas peliculas cuando esté apunto de bajar
  *  a bajo del todo. */
  public movies: Movie[] = [];

  /* 'moviesSlideshow': esta propiedad simplemente es para almacenar
  *  las 20 primeras peliculas y que se mostrarán en el propio 'slideshow' */
  public moviesSlideshow: Movie[] = [];
  
  
  constructor(private _peliculasService: PeliculasService) { }
  
  
  ngOnInit(): void {
    this._peliculasService.getCartelera().subscribe( movies => {
      this.movies = movies;
      this.moviesSlideshow = movies;
    });
  }

  
  ngOnDestroy(){
    this._peliculasService.resetCarteleraPage();
  }

  
  @HostListener('window:scroll', ['$event'])
  onScroll(){
    /* ese '+1300' es para que antes de llegar al final, supere el scroll maximo 
    *  y cargue mas pelis. (Infinite Scroll) */
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + 1300;
    const max = (document.documentElement.scrollHeight || document.body.scrollHeight);
    
    if (pos > max) {

      if (this._peliculasService.cargando) {
        return;
      }
      
      this._peliculasService.getCartelera().subscribe( movies => {
        this.movies.push(...movies);
      });
    }
  }

}
