import { Movie } from './../../interfaces/cartelera-response';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {

  public movies: Movie[] = [];
  public textoBuscado: string = "";
  public id_genero: string;

  constructor(private activatedRoute: ActivatedRoute,
              private _pelisService: PeliculasService) { }

  ngOnInit(): void {

    
    this.id_genero = this.activatedRoute.snapshot.paramMap.get('numero');

    console.log(this.id_genero);
    
    if (this.id_genero !== null) {
      this._pelisService.cargaGeneros()
      .subscribe( genero =>{
        for (const gen of genero) {
          if (gen.id == this.id_genero) {
            this.textoBuscado = gen.name;
          }
        }
      });
      this._pelisService.buscarPelisGenero(this.id_genero)
      .subscribe( resp => {
        this.movies = resp;
        });
    }else{
      this.activatedRoute.params.subscribe( buscar =>{      
        this._pelisService.buscarPelis(buscar.texto)
          .subscribe( resp => {
            this.textoBuscado = buscar.texto
            this.movies = resp;
          });
      })
    }
    
  }//fin onInit





}
