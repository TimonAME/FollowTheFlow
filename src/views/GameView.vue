<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import ArrowIcon from '@/components/ArrowIcon.vue'

const router = useRouter()

const templateString = "URDL"

const upAnimation = ref(false)
const rightAnimation = ref(false)
const downAnimation = ref(false)
const leftAnimation = ref(false)

let gameString = ""
const round = ref(1);
const inputString = ref("")
const waitingForInput = ref(false)
const roundWonInfo = ref(false)
const roundLostInfo = ref(false)
const resetting = ref(false)
const inputLoading = ref(false)

function createGameString() {
  gameString = ""
  for (let i = 0; i < round.value + 4; i++) {
    let rand = Math.floor(Math.random() * 4);
    gameString += templateString[rand]
  }
  console.log("Game String created: " + gameString);
}

function glow(direction) {
  if (direction === 'U') {
    upAnimation.value = true
    setTimeout(() => {
      upAnimation.value = false
    }, 200)
  }
  else if (direction === 'R') {
    rightAnimation.value = true
    setTimeout(() => {
      rightAnimation.value = false
    }, 200)
  }
  else if (direction === 'D') {
    downAnimation.value = true
    setTimeout(() => {
      downAnimation.value = false
    }, 200)
  }
  else if (direction === 'L') {
    leftAnimation.value = true
    setTimeout(() => {
      leftAnimation.value = false
    }, 200)
  }
}

function loadGameString() {
  inputLoading.value = true
  resetGame()
  if (waitingForInput.value) return;
  resetting.value = false

  inputString.value = ''
  roundWonInfo.value = false
  roundLostInfo.value = false

  let instructions = gameString.split('')

  let timeouts = [];
  instructions.forEach((item, index) => {
    const id = setTimeout(() => {
      if (resetting.value) return;
      glow(item);
    }, 500 * index);

    timeouts.push(id);
  });

  setTimeout(() => {
    if (resetting.value) return; // for reset during show of input
    waitingForInput.value = true
    inputLoading.value = false
  }, 500*instructions.length)
}

function addToInputString(input) {
  inputString.value += input

  if (inputString.value.length === gameString.length) {
    waitingForInput.value = false

    if (inputString.value !== gameString ) {
      console.log("Game Over")
      roundLostInfo.value = true
    } else {
      console.log("Round Won")
      roundWonInfo.value = true

      glow("U");glow("R");glow("D");glow("L")

      round.value++

      createGameString()
    }
  }
}

function returnToLobby() {
  resetGame()
  router.push('/')
}

function resetGame() {
  resetting.value = true // initiate reset (info for other functions)

  round.value = 1
  inputString.value = ''
  gameString = ''
  waitingForInput.value = false
  createGameString()
}

onMounted(() => {
  resetGame()
  resetting.value = false

  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
      if (waitingForInput.value) {
        addToInputString("U")
        glow("U")
      }
    }
    else if (e.key === 'ArrowRight') {
      if (waitingForInput.value) {
        addToInputString("R")
        glow("R")
      }
    }
    else if (e.key === 'ArrowDown') {
      if (waitingForInput.value) {
        addToInputString("D")
        glow("D")
      }
    }
    else if (e.key === 'ArrowLeft') {
      if (waitingForInput.value) {
        addToInputString("L")
        glow("L")
      }
    }
    else if (e.key === 'Enter') {
      if (!waitingForInput.value && !inputLoading.value) loadGameString()
    }
    else if (e.key === 'r') {
      resetGame()
    }
  })
})

onUnmounted(() => {
  window.removeEventListener('keydown', () => {}) // funktioniert leider nicht
})
</script>

<template>
  <div class="w-screen h-screen overflow-hidden flex justify-center flex-col items-center">
    <div>
      <div class="flex flex-wrap gap-2">
        <button class="p-2 text-sm border-white border-2 rounded hover:shadow-xl/20 shadow-white cursor-pointer" @click="resetGame">Restart</button>
        <button class="p-2 text-sm border-white border rounded hover:shadow-xl/20 shadow-white cursor-pointer" @click="returnToLobby">Return to lobby</button>
      </div>
      <div class="text-sm text-gray-500">press R to Restart</div>
      <div class="flex flex-col text-end my-6">
        <div>{{ round }} - Round</div>
      </div>
      <div class="p-5 w-fit mx-auto">
        <div class="rotate-45">
          <div class="flex">
            <div @click="glow('U'); addToInputString('U')" :class="{glowUp: upAnimation, 'hover:shadow-[0px_0px_50px_15px_#ff6467] hover:opacity-100': waitingForInput}" class="w-24 h-24 bg-red-400 opacity-30  rounded-tl-full hover:z-0">
              <ArrowIcon class="-rotate-135"/>
            </div>
            <div @click="glow('R'); addToInputString('R')" :class="{glowRight: rightAnimation, 'hover:shadow-[0px_0px_50px_15px_#50a2ff] hover:opacity-100': waitingForInput}" class="w-24 h-24 bg-blue-400 opacity-30 rounded-tr-full hover:z-0">
              <ArrowIcon class="-rotate-45 ml-18"/>
            </div>
          </div>
          <div class="flex rotate-180 justify-end">
            <div @click="glow('D'); addToInputString('D')" :class="{glowDown: downAnimation, 'hover:shadow-[0px_0px_50px_15px_#05df72] hover:opacity-100': waitingForInput}" class="w-24 h-24 bg-green-400 opacity-30 rounded-tl-full hover:z-0">
              <ArrowIcon class="-rotate-135"/>
            </div>
            <div @click="glow('L'); addToInputString('L')" :class="{glowLeft: leftAnimation, 'hover:shadow-[0px_0px_50px_15px_#fdc700] hover:opacity-100': waitingForInput}" class="w-24 h-24 bg-yellow-400 opacity-30 rounded-tr-full hover:z-0">
              <ArrowIcon class="-rotate-45 ml-18"/>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-16 mx-auto text-center">
        <button v-if="!waitingForInput" @click="loadGameString" class="p-4 border-white border-2 rounded hover:hover:shadow-[0px_0px_50px_8px_#ffffff] shadow-white transition-shadow" :class="{'animate-pulse': round === 1}">{{ round === 1 ? 'Start Game':'Next Round' }}</button>
        <div  v-if="!waitingForInput && !inputLoading" class="text-sm text-gray-500">or press ENTER</div>
        <button v-if="waitingForInput" class="p-4 border-white border-2 rounded shadow-xl/20 shadow-white">Game in Progress</button>
      </div>
    </div>

    <div class="text-lg mt-16">Log:<span class="animate-pulse">_</span>{{ inputString }}</div>

    <!-- Infos -->
    <div v-if="roundWonInfo" class="text-lg text-green-400 animate-pulse">ROUND WON</div>
    <div v-else class="text-lg invisible">.</div><!-- damit sich nicht alles verschiebt -->
    <div v-if="roundLostInfo" class="text-lg text-red-400 animate-pulse">ROUND LOST</div>
    <div v-else class="text-lg invisible">.</div>
    <div v-if="resetting" class="text-lg text-yellow-400 animate-pulse">GAME RESETTED</div>
    <div v-else class="text-lg invisible">.</div>
  </div>
</template>

<style scoped>
.glowUp {
  animation: glowUp .3s infinite;
}
@keyframes glowUp {
  50% {
    opacity: 1;
    box-shadow: 0 0 50px 15px #ff6467;
  }
}

.glowRight {
  animation: glowRight .3s infinite;
}
@keyframes glowRight {
  50% {
    opacity: 1;
    box-shadow: 0 0 50px 15px #50a2ff;
  }
}

.glowDown {
  animation: glowDown .3s infinite;
}
@keyframes glowDown {
  50% {
    opacity: 1;
    box-shadow: 0 0 50px 15px #05df72;
  }
}

.glowLeft {
  animation: glowLeft .3s infinite;
}
@keyframes glowLeft {
  50% {
    opacity: 1;
    box-shadow: 0 0 50px 15px #fdc700;
  }
}
</style>
