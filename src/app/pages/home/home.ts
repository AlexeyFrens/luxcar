import {Component, ElementRef, ViewChild, AfterViewInit} from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements AfterViewInit {

  @ViewChild('heroVideo') heroVideo!: ElementRef<HTMLVideoElement>;

  /*
  * Usando essa função, estamos garantindo que o vídeo já foi
  * carregado no DOM e podemos manipulá-lo
  */
  ngAfterViewInit() {
    const video = this.heroVideo.nativeElement;

    video.muted = true;

    const tryPlay = () => {
      video.play().catch(err => {
        console.warn(err);
      })
    }

    //Verifica se o vídeo carregou dados suficientes para iniciar
    if(video.readyState >= 3) {
      tryPlay()
    }else {
      /* Espera o evento que indica que o vídeo está pronto para
      *  iniciar (mesmo não carregando tudo)
      *
      *  Depois tenta iniciar novamente
      */
      video.addEventListener('loadeddata', tryPlay, {once: true})
    }
  }
}
