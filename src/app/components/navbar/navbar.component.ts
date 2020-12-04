import { Genre } from './../../interfaces/cartelera-response';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public generos: Genre;

  constructor(private router: Router,
              private _pelisService: PeliculasService) { }
              

  ngOnInit(): void {
    this._pelisService.cargaGeneros().subscribe( resp =>{
      // console.log("(navbar.ts) CARGAR GENEROS ==> ", resp);
      this.generos = resp;
    })
  }
  

  buscarPeli(peliBuscar: string){
    peliBuscar = peliBuscar.trim();
    
    if (peliBuscar.length == 0) {
      return;
    }
    this.router.navigate(['/buscar', peliBuscar]);
  }
  
  
  genreChange(evento){
    this.router.navigate(['/buscar/genero', evento.target.value ]);
  }

}
