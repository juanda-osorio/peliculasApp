import { Cast } from './../../interfaces/creditos-response';
import { MovieResponse, Genre } from './../../interfaces/movie-response';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

/* Me da toda la información acerca de la localización del usuario */
import { Location } from '@angular/common';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  public pelicula: MovieResponse;
  public elenco: Cast[] = [];
  public generoPeli: Genre[] = [];


  constructor(private activatedRoute: ActivatedRoute,
              private _pelisService: PeliculasService,
              private localtion: Location,
              private router: Router) { }



  ngOnInit(): void {

    /* Con la desestructuración podríamos sacar mas argumentos: {id, nombre, etc} */
    const { id } = this.activatedRoute.snapshot.params;

    /* Este motodo combina n numero de observables en una sola instruccion: */
    combineLatest([

      this._pelisService.verDetallePelicula( id ),
      this._pelisService.verCreditosPelicula( id )

    ]).subscribe( ([movie, cast]) => {
        if(!movie){
          this.router.navigateByUrl('/home');
          return;
        }
        for (const genero of movie.genres) {
          this.generoPeli.push(genero);          
        }
        this.pelicula = movie;

        this.elenco = cast.filter(actor => actor.profile_path !== null);
    });

    // this._pelisService.verDetallePelicula( id )
    //   .subscribe(movie => {
    //     /* Si el usuario manipula el id de la peli y busca uno que no exista, esto
    //     *  lo redirije al 'home'.
    //     *  Véase 'catchError' en el servicio */
    //     if(!movie){
    //       this.router.navigateByUrl('/home');
    //       return;
    //     }
    //     for (const genero of movie.genres) {
    //       this.generoPeli.push(genero);          
    //     }
    //     this.pelicula = movie;
    //   });

    //   this._pelisService.verCreditosPelicula( id )
    //   .subscribe( cast => {
    //     /* Filter ==> Devuelve un nuevo array. */
    //     this.elenco = cast.filter(actor => actor.profile_path !== null)
    //   });

  }


  regresar(){
    this.localtion.back();
  }



}
