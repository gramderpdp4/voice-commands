<template>
    <div>
        Clique em qualquer lugar da tela para iniciar
    </div>
</template>
<script lang="ts">
import { inject } from 'vue';

export default {
    data() {
        return {
            dialog: inject('dialogRef'),
        }
    },

    methods: {
        initializeCommands() {

            ( this.dialog as { data?: { initializeCommandsVoice: () => void } })?.data?.initializeCommandsVoice()

            document.removeEventListener('click', this.initializeCommands);

            ( this.dialog as { close: () => void } ).close()
        }
    },

    mounted() {
        document.addEventListener('click', this.initializeCommands)
    },
}
</script>