import { Cast } from './../../interfaces/creditos-response';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import Swiper from 'swiper';


@Component({
  selector: 'app-cast-slideshow',
  templateUrl: './cast-slideshow.component.html',
  styleUrls: ['./cast-slideshow.component.css']
})
export class CastSlideshowComponent implements OnInit, AfterViewInit {

  @Input() elenco: Cast[];

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    const swiper = new Swiper('.swiper-container',
    {
      slidesPerView: 5.5,
      spaceBetween: 15,
      grabCursor: true,
      freeMode: true,
    });
  }

}
