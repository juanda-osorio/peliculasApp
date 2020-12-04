import { Cast, CreditResponse } from './../interfaces/creditos-response';
import { MovieResponse } from './../interfaces/movie-response';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';

/* Tap solo ejecuta el codigo cada vez que el observable emite un valor.
*  El tap no modifica ni altera nada. */
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private baseUrl: string = "https://api.themoviedb.org/3";
  private carteleraPage = 1;
  public cargando: boolean = false;

  constructor(private http: HttpClient) { }

  get parametros(){
    return{
      api_key: "699b8e9f1b2fe6fce02cfcf5520e1066",
      language: "es-ES",
      page: this.carteleraPage.toString(),
    }
  }


  resetCarteleraPage(){
    this.carteleraPage = 1;
  }

  
  
  getCartelera(): Observable<Movie[]> {
    if (this.cargando) {
      /* of (rxjs) ==> emite un observable, el que definamos
      *  en este caso [] */
      return of([]);
    }
    
    this.cargando = true;
    return this.http.get<CarteleraResponse>(`${ this.baseUrl }/movie/now_playing`,
      {
        params: this.parametros
      }).pipe(
        /* con el map, devolvemos un tipo <Movie> que es lo especificado
        *  en el metodo. */
        map( resp =>resp.results ),
        
        /* Cada vez que CarteleraResponse emita un valor, aumenta en 1 */
        tap( ()=>{
          this.carteleraPage++;
          this.cargando = false;
        })
      )
  }

  
  buscarPelis(peliBuscar: string): Observable<Movie[]>{
    
    /* Forma de modificar los parametros para agregar 'query' que es lo que pide la url API */
    const params = {...this.parametros, page: '1', query: peliBuscar};

    return this.http.get<CarteleraResponse>(`${ this.baseUrl }/search/movie/`,
    {
      params: params
    }).pipe(
      map( resp => resp.results )
    )
  
  }


  cargaGeneros(){
    return this.http.get(`${ this.baseUrl }/genre/movie/list`, {params: this.parametros})
      .pipe(
        map( (resp:any) => resp.genres )
      )
  }

  buscarPelisGenero(generoBuscar: string): Observable<Movie[]>{

    const params = {...this.parametros, with_genres: generoBuscar};

     return this.http.get<CarteleraResponse>(`${ this.baseUrl }/discover/movie`, 
      {
        params: params
      }).pipe(
        map( resp => resp.results )
      )
        
  }


  verDetallePelicula(movie_id: number){
    return this.http.get<MovieResponse>(`${ this.baseUrl }/movie/${ movie_id }`, 
    {
      params: this.parametros
    }).pipe(
      // tap( resp => console.log(resp.genres)),
      catchError( err => of(null) )
    )
  }


  verCreditosPelicula(movie_id: number): Observable<Cast[]>{
    return this.http.get<CreditResponse>(`${ this.baseUrl }/movie/${ movie_id }/credits`,
    {
      params: this.parametros
    }).pipe(
      map( resp => resp.cast ),
      catchError( err => of([]) )
    )
  }




}//fin servicio
