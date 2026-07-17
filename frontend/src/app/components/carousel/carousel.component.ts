import { Component,OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CarouselModule } from '@coreui/angular';
import {
  CarouselCaptionComponent,
  CarouselControlComponent,
  CarouselIndicatorsComponent,
  CarouselInnerComponent,
  CarouselItemComponent,
  ThemeDirective
} from '@coreui/angular';
@Component({  
  selector: 'app-carousel',
  standalone: true,
  imports: [ThemeDirective, CarouselIndicatorsComponent, CarouselInnerComponent, NgFor, CarouselItemComponent, CarouselCaptionComponent, CarouselControlComponent, RouterLink, CarouselModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent  implements OnInit {
  slides: any[] = new Array(2).fill({ id: -1, src: '', title: '', subtitle: '' });

  ngOnInit(): void {
    this.slides[0] = {
      id: 0,
      src: './assets/img/hero-1.jpg',
      title: 'Fall - Winter Collections 2030',
      subtitle: 'A specialist label creating luxury essentials. Ethically crafted with an unwavering commitment to exceptional quality.'
    };
    this.slides[1] = {
      id: 1,
      src: './assets/img/hero-2.jpg',
      title: 'Fall - Winter Collections 2030',
      subtitle: 'A specialist label creating luxury essentials. Ethically crafted with an unwavering commitment to exceptional quality.'
    };
    // this.slides[2] = {
    //   id: 2,
    //   src: './assets/img/vue.jpg',
    //   title: 'Third slide',
    //   subtitle: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
    // };
  
  }

}
