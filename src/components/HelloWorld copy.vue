<script setup lang="ts">
import { reactive } from '@vue/reactivity'
import { onBeforeMount } from '@vue/runtime-core'

type CardModel = {
  isClicked: boolean
  defaultText: 'Click me'
  clickedText: 'Clicked'
  defaultColor: 'blue'
  clickedColor: 'blue'
}

const length = 6
const cards = reactive<Array<CardModel>>(new Array(length))

const createModel = (): CardModel => {
  return {
    isClicked: false,
    defaultText: 'Click me',
    clickedText: 'Clicked',
    defaultColor: 'blue',
    clickedColor: 'blue'
  }
}

const getCardColor = (isClicked: boolean, defaultColor: string, clickedColor: string): string => {
  const color = isClicked ? clickedColor : defaultColor
  return `hover:bg-${color}-400 bg-${color}-300`
}

const fillCards = (): void => {
  for (let index = 0; index < cards.length; index++) {
    cards[index] = createModel()
  }
}

onBeforeMount(() => {
  fillCards()
})


</script>

<template>
  <div class="min-h-screen w-screen grid">
    <div
      class="sticky top-0 h-16 bg-blue-100 border-b border-indigo-100 p-2 shadow mb-auto flex flex-row justify-between"
    >
      <div class="flex flex-col font-bold">
        <div class="text-xl">Title</div>
        <div class="text-sm">Subtitle</div>
      </div>
      <div class="flex flex-col justify-center text-xl">Home</div>
    </div>
    <div class="flex overflow-scroll pb-5 pt-5 px-5 justify-center gap-5 w-full flex-wrap">
      <div
        class="flex flex-col w-96 h-72 text-xl text-white cursor-pointer rounded-3xl p-5"
        v-for="card, index in cards"
        :key="index"
        :class="getCardColor(card.isClicked, card.defaultColor, card.clickedColor)"
        @click="card.isClicked = !card.isClicked"
      >
        <div class="flex flex-row">
          <div class="w-24 h-24 bg-white rounded-xl"></div>
          <div class="flex flex-col flex-grow ml-2">
            <div>Title</div>
            <div class="text-sm">caption</div>
          </div>
        </div>
        <div
          class="text-sm pt-2"
        >Lorem ipsum dolor sit amet, consectetur adipiscing elit. In suscipit nec leo sed accumsan. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
      </div>
    </div>
    <div
      class="sticky rounded-2xl ml-2 mr-2 shadow-lg opacity-95 bottom-2 mt-auto h-16 bg-blue-100 items-center flex flex-row p-2 justify-around"
    >
      <div
        class="flex flex-col font-medium justify-center cursor-pointer items-center"
        v-for="title, index in ['Home', 'News', 'Me']"
        :key="index"
      >
        <div
          class="w-8 h-8 rounded-lg shadow-2xl focus:bg-ingido-00 hover:bg-indigo-300"
          :class="index === 0 ? 'bg-blue-400' : 'bg-indigo-200'"
        ></div>
        <span :class="index === 0 && 'text-blue-900'">{{ title }}</span>
      </div>
    </div>
  </div>
</template>