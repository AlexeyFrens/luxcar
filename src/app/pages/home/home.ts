import { Component, ElementRef, ViewChild, ViewChildren, QueryList, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements AfterViewInit {

  @ViewChild('heroVideo') heroVideo!: ElementRef<HTMLVideoElement>;
  @ViewChildren('video1, video2, video3') videoDestaques!: QueryList<ElementRef<HTMLVideoElement>>;

  /*
  * Usando essa função, estamos garantindo que o vídeo já foi
  * carregado no DOM e podemos manipulá-lo
  */
  ngAfterViewInit() {
    this.configurarHeroVideo();
    this.configurarVideosDestaques();
  }

  private configurarHeroVideo() {
    const video = this.heroVideo.nativeElement;

    video.muted = true;

    const tryPlay = () => {
      video.play().catch(err => {
        console.warn('Erro no vídeo hero:', err);
      })
    }

    //Verifica se o vídeo carregou dados suficientes para iniciar
    if(video.readyState >= 3) {
      tryPlay()
    } else {
      /* Espera o evento que indica que o vídeo está pronto para
      *  iniciar (mesmo não carregando tudo)
      *
      *  Depois tenta iniciar novamente
      */
      video.addEventListener('loadeddata', tryPlay, {once: true})
    }
  }

  private configurarVideosDestaques() {
    this.videoDestaques.forEach((videoRef, index) => {
      const video = videoRef.nativeElement;
      
      // Configurações básicas dos vídeos de destaque
      video.muted = true;
      video.preload = 'metadata';

      // Adiciona listeners para debug
      video.addEventListener('loadeddata', () => {
        console.log(`Vídeo destaque ${index + 1} carregado`);
      });

      video.addEventListener('error', (e) => {
        console.error(`Erro no vídeo destaque ${index + 1}:`, e);
      });
    });
  }

  // Métodos para controle dos vídeos de destaque no hover
  playVideo(event: Event) {
    const videoCard = event.currentTarget as HTMLElement;
    const video = videoCard.querySelector('video') as HTMLVideoElement;
    
    if (video) {
      video.play().catch(error => {
        console.log('Erro ao reproduzir vídeo destaque:', error);
      });
    }
  }

  pauseVideo(event: Event) {
    const videoCard = event.currentTarget as HTMLElement;
    const video = videoCard.querySelector('video') as HTMLVideoElement;
    
    if (video) {
      video.pause();
      video.currentTime = 0; // Volta ao início
    }
  }
}