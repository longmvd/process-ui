<template>
  <div class="flex-c-m h-full">
    <h1>{{ Message.COMING_SOON }}</h1>
  </div>
</template>

<script>
import { Message } from '@/i18n';
export default {
    name: 'IncomingPage',
    data(){
        return {
            Message
        }
    }
}
</script>

<style>

</style>