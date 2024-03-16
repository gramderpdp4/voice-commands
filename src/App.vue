
<template>
  <navbarVue />
  <main class="mx-4 mt-8">
    <div class="grid grid-cols-1 xsm:grid-cols-2 sm:flex">
      <div v-for="(item, key) in items" :key="key" class="flex-col p-4 mb-4 flex w-full xsm:w-fit card 
      rounded-xl justify-center xsm:mx-4
      cursor-default transform-gpu hover:scale-110 duration-200 ease-linear">
        <img :src="item.logo" class="mx-auto" />
        <div class="divider my-4"></div>
        <p v-text="item.command" class="text-white text-center xsm:text-left"></p>
      </div>
    </div>
  </main>
  <Toast position="bottom-right" />
  <DynamicDialog />
</template>
<script lang="ts">
//Components
import navbarVue from './components/navbar.vue';
import browserBlockingWindows from './components/browser-blocking-windows.vue';
import loadingVue from './components/loading.vue';
import clickScreenVue from './components/clickScreen.vue';
//Components

//Logos
import youtubeLogo from './assets/youtube.png';
import gmailLogo from './assets/gmail.png';
import googleLogo from './assets/google.png';
import mapsLogo from './assets/maps.png';
//Logos

import Artyom from "artyom.js"

export default {
  data() {
    return {
      items: [
        { logo: youtubeLogo, name: 'Youtube', command: 'Diga: Abrir Youtube' },
        { logo: gmailLogo, name: 'Gmail', command: 'Diga: Abrir Gmail' },
        { logo: googleLogo, name: 'Google', command: 'Diga: Abrir Google' },
        { logo: mapsLogo, name: 'Maps', command: 'Diga: Abrir Maps' }
      ],
      artyom: new Artyom(),
      firstClick: false as boolean
    }
  },

  components: {
    navbarVue, loadingVue
  },

  methods: {

    commands() {

      if (this.artyom.recognizingSupported()) { // Checa o suporte para reconhecimento de voz

        setTimeout(() => {

          const lang = 'pt-BR';

          this.artyom.initialize({
            lang: lang,
            continuous: true,
            listen: true,
            debug: true,
            speed: 1
          }).then(() => {
            console.log('ouvindo...')
            this.addCommands()
            this.artyom.say('Estou te ouvindo.', { lang: lang })
            this.$toast.add({
              severity: 'secondary',
              closable: false,
              summary: 'Ouvindo...',
              detail: 'Fale algum comando para iniciar'
            });

          })
            .catch((error: string) => {
              const code = error;

              switch (code) {
                case 'not-allowed':
                  this.$toast.add({
                    severity: 'secondary',
                    closable: false,
                    summary: 'Permissão negada',
                    detail: 'Ative a permissão do microfone para continuar',
                  });
                  break;
              }
            })
        }, 200)

      } else {
        this.$toast.add({
          severity: 'secondary',
          closable: false,
          summary: 'Ops',
          detail: 'Seu navegador não tem suporte para reconhecimento de voz'
        });
      }
    },

    addCommands() { // Adiciona os comandos ao Artyom
      const arrayCommands = [
        {
          indexes: ["Abre o *", "Abrir o *", "Abrir *"],
          smart: true,
          action: (_index: number, wildcard: string) => {
            let dialog: object = {}, txt: string = `Abrindo ${wildcard}`;

            if (wildcard) {

              const url = this.commandUrl(wildcard);

              if( url !== undefined ) {
                this.artyom.say(txt, {
                  onStart: () => {
                    dialog = this.$dialog.open(loadingVue, {
                      props: {
                        header: 'Abrindo...',
                        style: {
                          width: '350px'
                        },
                        breakpoints: {
                          '500px': '90vw'
                        }
                      },
                      data: {
                        command: wildcard
                      }
                    })
                  },
                  onEnd: () => {
                    const windowOpened = window.open(url, '_blank')

                    if (!windowOpened) this.newLockedWindow();

                    ( dialog as { close: () => void } ).close()
                  }
                })
              }
            
            }
          }
        }
      ]

      this.artyom.addCommands(arrayCommands);
    },

    commandUrl(wildcard: string): string | undefined { // Checa o comando reconhecido e retorna a url
      let url: string | undefined = undefined;

      switch (wildcard.toLowerCase()) {
        case 'youtube':
            url = 'https://youtube.com/';
          break;
          case 'google':
            url = 'https://www.google.com.br/';
          break;
          case 'maps':
            url = 'https://www.google.com.br/maps';
          break;
          case 'gmail':
            url = 'https://gmail.com/';
          break;
      }

      return url
    },

    newLockedWindow() { // Quando o navegador não permite a abertura de uma nova janela
      this.$dialog.open(browserBlockingWindows, {
        props: {
          header: 'Ops!',
          modal: true,
          style: {
            width: '350px'
          },
          breakpoints: {
            '500px': '90vw'
          }
        }
      })
      this.artyom.say('Seu navegador está bloqueando a abertura de novas janelas. Por favor habilite a permissão.')
    },

    clickScreen() { // Aguarda o primeiro clique/interação no navegador para iniciar o reconhecimento/comandos

      this.$dialog.open(clickScreenVue, {
        props: {
          header: 'Aviso',
          modal: true
        },
        data: {
          initializeCommandsVoice: () => {
            this.firstClick = true
            this.commands()
          }
        }
      });
    },

    isMobile(): boolean { // Checa se o dispositivo é mobile
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

      const test = mobile.test(navigator.userAgent);

      return test
    }
  },

  mounted() {
    if(this.isMobile()) {
      document.addEventListener('visibilitychange', () => {
        if(!document.hidden) {
          if(!this.artyom.isRecognizing()){
              window.location.href = window.location.href
          }
        }
      })
    }

    this.clickScreen()
  }
}
</script>
<style scoped>
.card {
  background-color: var(--color-dark-2);
}

img {
  width: 80px;
}
</style>
