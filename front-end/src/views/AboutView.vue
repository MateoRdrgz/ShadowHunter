<template>
   <div class="bg-yellow-950"><HeaderVue/></div>
  <div class="about">
    <h1>This is an about Page with a chessboard included !</h1>
    <ChessBoard />
  </div>
</template>

<style>
</style>

<script lang="ts">
import { defineComponent } from 'vue'
import {Tab} from "@headlessui/vue";
export default defineComponent({
  components: {
    Tab,
  }
})
</script>
