import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, ViewChildren, QueryList, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
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
    if (video.readyState >= 3) {
      tryPlay()
    } else {
      /* Espera o evento que indica que o vídeo está pronto para
      *  iniciar (mesmo não carregando tudo)
      *
      *  Depois tenta iniciar novamente
      */
      video.addEventListener('loadeddata', tryPlay, { once: true })
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
      // Garante que o vídeo está mudo e pronto para reproduzir
      video.muted = true;
      video.currentTime = 0; // Reinicia o vídeo

      const playPromise = video.play();

      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log('Falha no autoplay:', error);
          setTimeout(() => {
            video.play().catch(e => console.log('Segunda tentativa falhou:', e));
          }, 100);
        });
      }
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

  /*  SEÇÃO DE CLIENTES  */

  clienteGrupoAtual = 0;
  clientesPorGrupo = 3;

  clientes = [
    {
      nome: 'Alexander Gatesh',
      cargo: 'Empresário de tecnologia',
      foto: 'assets/images/clientes/cliente1.png',
      comentario: 'Viajo o mundo inteiro a negócios e raramente encontro um serviço tão impecável quanto o da LuxCar. Cada detalhe, do atendimento à entrega do veículo, reflete excelência absoluta. Não é apenas sobre dirigir um carro de luxo, é sobre viver uma experiência memorável.',
      estrelas: 5
    },
    {
      nome: 'Sophia Walton',
      cargo: 'Socialite e financista',
      foto: 'assets/images/clientes/cliente2.png',
      comentario: 'A LuxCar entende o verdadeiro significado de exclusividade. Senti que tudo foi personalizado para mim, desde a escolha do carro até a atenção da equipe. Dirigir um dos modelos da frota é como vestir uma joia rara: algo reservado apenas a quem aprecia o extraordinário.',
      estrelas: 5
    },
    {
      nome: 'Isabella Arnault',
      cargo: 'Diretora criativa de uma maison de luxo',
      foto: 'assets/images/clientes/cliente3.png',
      comentario: 'Escolher a LuxCar é ter a certeza de estar no mais alto patamar de sofisticação. A frota é impecável, os carros parecem sair diretamente de um salão privado de colecionadores. É um privilégio poder contar com um serviço tão diferenciado no Brasil.',
      estrelas: 5
    },
    {
      nome: 'Victoria Sterling',
      cargo: 'Top Model Internacional',
      foto: 'assets/images/clientes/cliente4.png',
      comentario: 'A LuxCar é sinônimo de elegância e sofisticação. Cada evento que compareço com um de seus carros se transforma em uma verdadeira passarela. O serviço é tão impecável quanto as peças que visto nas maiores semanas de moda do mundo.',
      estrelas: 5
    },
    {
      nome: 'Sebastian Montgomery',
      cargo: 'Fundador do Grupo Montgomery',
      foto: 'assets/images/clientes/cliente5.png',
      comentario: 'Como investidor em múltiplos continentes, exijo excelência em todos os serviços que contrato. A LuxCar não apenas atende, mas supera todas as expectativas. Uma parceria que eleva não apenas minha mobilidade, mas meu status.',
      estrelas: 5
    },
    {
      nome: 'Rafael Van Horn',
      cargo: 'CEO do Fundo Van Horn Capital',
      foto: 'assets/images/clientes/cliente6.png',
      comentario: 'A discrição e profissionalismo da LuxCar são incomparáveis. Para reuniões com investidores e clientes de alto padrão, contar com seu serviço é um diferencial estratégico que transmite credibilidade e sofisticação instantaneamente.',
      estrelas: 5
    },
    {
      nome: 'Christian Davenport',
      cargo: 'Herdeiro do Império Davenport',
      foto: 'assets/images/clientes/cliente7.png',
      comentario: 'Cresci cercado pelo que há de mais refinado no mundo, e posso afirmar: a LuxCar está no mesmo patamar das marcas mais exclusivas da Europa. Uma experiência que combina tradição do luxo com inovação brasileira.',
      estrelas: 5
    },
    {
      nome: 'Jonathan Blackwood',
      cargo: 'Investidor em Tecnologia',
      foto: 'assets/images/clientes/cliente8.png',
      comentario: 'A fusão perfeita entre tecnologia de ponta e luxo atemporal. Os veículos da LuxCar não são apenas meios de transporte, são extensões do sucesso e da excelência que busco em todos os aspectos da minha vida.',
      estrelas: 5
    },

    {
      nome: 'Camille de Laurent',
      cargo: 'Embaixadora de Marcas de Luxo',
      foto: 'assets/images/clientes/cliente9.png',
      comentario: 'A excelência da LuxCar redefine o padrão do serviço automotivo premium. Cada detalhe, desde a reserva até a entrega, é executado com perfeição que rivaliza com as mais refinadas experiências europeias. Uma verdadeira obra-prima.',
      estrelas: 5
    }


  ];

  get clientesVisiveis() {
    const start = this.clienteGrupoAtual * this.clientesPorGrupo;
    return this.clientes.slice(start, start + this.clientesPorGrupo);
  }

  get totalGrupos() {
    return Math.ceil(this.clientes.length / this.clientesPorGrupo);
  }

  proximoGrupo() {
    this.clienteGrupoAtual = (this.clienteGrupoAtual + 1) % this.totalGrupos;
  }

  grupoAnterior() {
    this.clienteGrupoAtual = (this.clienteGrupoAtual - 1 + this.totalGrupos) % this.totalGrupos;
  }
}
