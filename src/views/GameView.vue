<script setup>
import { onMounted, ref } from 'vue'
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

function createGameString() {
  gameString = ""
  for (let i = 0; i < round.value + 4; i++) {
    let rand = Math.floor(Math.random() * 4);
    gameString += templateString[rand]
  }
  console.log("Game String created:" + gameString);
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp') {
    console.log('ArrowUp detected')

    if (waitingForInput.value) {
      addToInputString("U")
      glow("U")
    }
  }
  else if (e.key === 'ArrowRight') {
    console.log('ArrowRight detected')

    if (waitingForInput.value) {
      addToInputString("R")
      glow("R")
    }
  }
  else if (e.key === 'ArrowDown') {
    console.log('ArrowDown detected')

    if (waitingForInput.value) {
      addToInputString("D")
      glow("D")
    }
  }
  else if (e.key === 'ArrowLeft') {
    console.log('ArrowLeft detected')

    if (waitingForInput.value) {
      addToInputString("L")
      glow("L")
    }
  }
  else if (e.key === 'Enter') {
    console.log('Enter detected')

    if (!waitingForInput.value) loadGameString()
  }
  else if (e.key === 'r') {
    console.log('R detected')

    resetGame()
  }
})

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
  if (waitingForInput.value) return;

  inputString.value = ''
  roundWonInfo.value = false
  roundLostInfo.value = false

  let instructions = gameString.split('')

  instructions.forEach((item, index) => {
    setTimeout(() => {
      console.log(item)
      glow(item)
    }, 500 * index)
  })

  setTimeout(() => {
    waitingForInput.value = true
  }, 500*instructions.length)
}

function addToInputString(input) {
  inputString.value += input

  if (inputString.value.length === gameString.length) {
    console.log("Input Complete")
    waitingForInput.value = false

    if (inputString.value !== gameString ) {
      console.log("Game Over")
      roundLostInfo.value = true
      resetGame()
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
  round.value = 1
  inputString.value = ''
  gameString = ''
  waitingForInput.value = false
  createGameString()
}

onMounted(() => {
  resetGame()
})
</script>

<template>
  <div class="w-screen h-screen overflow-hidden flex justify-center flex-col items-center">
    <div>
      <button class="p-2 text-sm border-white border-2 rounded hover:shadow-xl/20 shadow-white" @click="returnToLobby">Return to lobby</button>
      <div class="text-sm text-gray-500">press R to Restart</div>
      <div class="flex flex-col text-end my-6">
        <div>{{ round }} - Round</div>
      </div>
      <div class="p-5 w-fit mx-auto">
        <div class="rotate-45">
          <div class="flex">
            <div @click="glow('U'); addToInputString('U')" :class="{glowUp: upAnimation}" class="w-24 h-24 bg-red-400 opacity-30 hover:opacity-100 rounded-tl-full hover:shadow-[0px_0px_50px_15px_#ff6467] hover:z-0">
              <ArrowIcon class="-rotate-135"/>
            </div>
            <div @click="glow('R'); addToInputString('R')" :class="{glowRight: rightAnimation}" class="w-24 h-24 bg-blue-400 opacity-30 hover:opacity-100 rounded-tr-full hover:shadow-[0px_0px_50px_15px_#50a2ff] hover:z-0">
              <ArrowIcon class="-rotate-45 ml-18"/>
            </div>
          </div>
          <div class="flex rotate-180 justify-end">
            <div @click="glow('D'); addToInputString('D')" :class="{glowDown: downAnimation}" class="w-24 h-24 bg-green-400 opacity-30 hover:opacity-100 rounded-tl-full hover:shadow-[0px_0px_50px_15px_#05df72] hover:z-0">
              <ArrowIcon class="-rotate-135"/>
            </div>
            <div @click="glow('L'); addToInputString('L')" :class="{glowLeft: leftAnimation}" class="w-24 h-24 bg-yellow-400 opacity-30 hover:opacity-100 rounded-tr-full hover:shadow-[0px_0px_50px_15px_#fdc700] hover:z-0">
              <ArrowIcon class="-rotate-45 ml-18"/>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-16 mx-auto text-center">
        <button v-if="!waitingForInput" @click="loadGameString" class="p-4 border-white border-2 rounded hover:hover:shadow-[0px_0px_50px_8px_#ffffff] shadow-white transition-shadow">{{ round === 1 ? 'Start Game':'Next Round' }}</button>
        <div  v-if="!waitingForInput" class="text-sm text-gray-500">or press ENTER</div>
        <button v-else class="p-4 border-white border-2 rounded shadow-xl/20 shadow-white">Game in Progress</button>
      </div>
    </div>

    <div class="text-lg mt-16">Log:<span class="animate-pulse">_</span>{{ inputString }}</div>
    <div v-if="roundWonInfo" class="text-lg text-green-400 animate-pulse">ROUND WON</div>
    <div v-if="roundLostInfo" class="text-lg text-red-400 animate-pulse">ROUND LOST</div>
    <div v-else></div>
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
