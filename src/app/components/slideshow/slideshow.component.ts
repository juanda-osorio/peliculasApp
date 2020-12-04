import { Movie } from './../../interfaces/cartelera-response';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit, AfterViewInit {

  @Input() movies: Movie[];
  mySwiper: Swiper;
  

  constructor() { }
  
  /* Este metodo se carga casi antes que la vista. */
  ngOnInit(): void {
  }
  
  /* Este metodo se carga después de que se cargue la vista.  */
  ngAfterViewInit(){
    
    this.mySwiper = new Swiper('.swiper-container', {
      loop: true,
      autoplay: {
        delay: 1000
      }
    });

  }//fin ngAfterViewInit

  slideNext(){
    this.mySwiper.slideNext();    
  }

  slidePrev(){
    this.mySwiper.slidePrev();
  }

}
