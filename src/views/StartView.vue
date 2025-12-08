<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const isExpanded = ref(true)
const router = useRouter()

function startGame() {
  router.push('/game')
}


function toggleTutorial() {
  isExpanded.value = !isExpanded.value
  localStorage.setItem('tutorialExpanded', JSON.stringify(isExpanded.value))
}

onMounted(() => {
  const saved = localStorage.getItem('tutorialExpanded')
  if (saved !== null) {
    isExpanded.value = JSON.parse(saved)
  }
  
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      startGame()
    }
  })
})
</script>

<template>
  <div class="w-screen h-screen overflow-hidden flex justify-center flex-col items-center px-4">
    <div class="text-3xl mb-8 transition-colors text-white text-center">
      Welcome To 
      <span class="hover:text-white text-red-400">Fol</span><span class="hover:text-white text-blue-400">low</span><span class="hover:text-white text-green-400">The</span><span class="hover:text-white text-yellow-400">Flow</span>
    </div>

    <button class="p-4 text-lg border-white border-2 rounded hover:shadow-[0px_0px_50px_8px_#ffffff] shadow-white cursor-pointer transition-shadow animate-pulse" @click="startGame">
      Start Game
    </button>
    <div class="text-sm text-gray-500 mt-2">or press ENTER</div>
    
    <!-- Tutorial Section -->
    <div class="max-w-2xl mt-8 border border-gray-700 rounded-lg bg-black/30 overflow-hidden transition-all duration-300">
      <!-- Header -->
      <button 
        @click="toggleTutorial"
        class="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
      >
        <h2 class="text-lg text-gray-300">How to Play</h2>
        <svg 
          class="w-5 h-5 text-gray-400 transition-transform duration-300"
          :class="{ 'rotate-180': isExpanded }"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      <!-- Collapsible Content -->
      <div 
        class="transition-all duration-300 ease-in-out overflow-hidden"
        :style="{ maxHeight: isExpanded ? '500px' : '0px' }"
      >
        <div class="px-6 pb-6">
          <div class="space-y-4 text-sm text-gray-400">
            <div class="flex items-start gap-3">
              <span class="text-white font-bold min-w-[20px]">1.</span>
              <p><span class="text-white">Watch</span> the sequence as colored arrows light up</p>
            </div>
            
            <div class="flex items-start gap-3">
              <span class="text-white font-bold min-w-[20px]">2.</span>
              <p><span class="text-white">Repeat</span> the exact sequence using arrow keys or by clicking</p>
            </div>
            
            <div class="flex items-start gap-3">
              <span class="text-white font-bold min-w-[20px]">3.</span>
              <p>Each round adds <span class="text-white">one more</span> direction to memorize</p>
            </div>
          </div>
      
          <!-- Keybinds -->
          <div class="mt-6 pt-4 border-t border-gray-700">
            <h3 class="text-sm text-gray-500 mb-3 text-center">Controls</h3>
            <div class="flex flex-wrap justify-center gap-3 text-xs">
              <div class="flex items-center gap-2 px-3 py-1.5 border border-gray-700 rounded bg-black/20">
                <div class="flex gap-1">
                  <kbd class="px-2 py-1 bg-red-400/20 text-red-400 rounded border border-red-400/30 hover:bg-red-400/50">↑</kbd>
                  <kbd class="px-2 py-1 bg-blue-400/20 text-blue-400 rounded border border-blue-400/30 hover:bg-blue-400/50">→</kbd>
                  <kbd class="px-2 py-1 bg-green-400/20 text-green-400 rounded border border-green-400/30 hover:bg-green-400/50">↓</kbd>
                  <kbd class="px-2 py-1 bg-yellow-400/20 text-yellow-400 rounded border border-yellow-400/30 hover:bg-yellow-400/50">←</kbd>
                </div>
                <span class="text-gray-500">Input</span>
              </div>
              
              <div class="flex items-center gap-2 px-3 py-1.5 border border-gray-700 rounded bg-black/20 group">
                <kbd class="px-2 py-1 bg-white/10 text-white rounded border border-gray-600 group-hover:bg-white/50">Enter</kbd>
                <span class="text-gray-500">Start/Next</span>
              </div>
              
              <div class="flex items-center gap-2 px-3 py-1.5 border border-gray-700 rounded bg-black/20 group">
                <kbd class="px-2 py-1 bg-white/10 text-white rounded border border-gray-600 group-hover:bg-white/50">R</kbd>
                <span class="text-gray-500">Restart</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
