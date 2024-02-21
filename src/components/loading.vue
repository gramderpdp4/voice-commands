<template>
    <p class="text-center" v-if="command">Abrindo {{ command }}...</p>
    <ProgressSpinner class="flex justify-center mx-auto mt-4 w-12 h-12"/>
</template>
<script lang="ts">
import { inject } from 'vue';

export default {
    data() {
        return {
            dialog: inject('dialogRef'),
            command: ''
        }
    },

    computed: {
        command(): string | undefined {
            return this.dialog?.data?.command
        }
    },
}

</script>
