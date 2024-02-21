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
            this.dialog?.data.initializeCommandsVoice();

            document.removeEventListener('click', this.initializeCommands)

            this.dialog!.close();
        }
    },

    mounted() {
        document.addEventListener('click', this.initializeCommands)
    },
}
</script>