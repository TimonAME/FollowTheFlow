<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function startGame() {
  router.push('/game')
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    startGame()
  }
})
</script>

<template>
  <div class="w-screen h-screen overflow-hidden flex justify-center flex-col items-center">
  <div class="text-3xl mb-6 transition-colors text-white text-center">Welcome To <span class="hover:text-red-400">Fol</span><span class="hover:text-blue-400">low</span><span class="hover:text-green-400">The</span><span class="hover:text-yellow-400">Flow</span></div>
    <button class="p-2 text-sm border-white border-2 rounded hover:shadow-xl/20 shadow-white cursor-pointer" @click="startGame">Start Game</button>
    <div class="text-sm text-gray-500">or press ENTER</div>
  </div>
</template>

<style scoped>

</style>
