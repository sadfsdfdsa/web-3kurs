<script setup lang="ts">
import { ref, Ref } from 'vue'
import axios from 'axios'
import { links, arrows, subjectIcons } from './constants'
import type { Link } from './constants'

const showCalendar = ref(true)
const showInfo = ref(true)
const showSubjects = ref(true)

type Subject = {
  title: string
  links: Array<Link>
}

const remote = 'https://sleepy-anchorage-96400.herokuapp.com/'
const localStorageKey = 'cacheApplication'

const getSubjectsFromStorage = (): Array<Subject> => {
  const cache = localStorage.getItem(localStorageKey)
  return cache ? JSON.parse(cache) : []
}

axios.get(remote).then(r => {
  subjects.value = r.data
  localStorage.setItem(localStorageKey, JSON.stringify(r.data))
})

const subjects: Ref<Array<Subject>> = ref(getSubjectsFromStorage())

const getRandomArrow = (): string => {
  return arrows[Math.floor(Math.random() * arrows.length)]
}

const getRandomSubjectIcon = (): string => {
  return subjectIcons[Math.floor(Math.random() * subjectIcons.length)]
}
</script>

<template>
  <div class="container">
    <div
      class="sticky w-screen top-0 h-16 p-2 bg-white mb-auto flex items-center flex-row justify-between"
    >
      <div class="text-2xl">Кузнецов Денис Борисович</div>
    </div>

    <div class="flex w-screen">
      <div class="flex justify-center w-full sm:mx-24 md:mx-36 lg:mx-48 xl:mx-72">
        <div class="flex flex-col mx-5 flex-grow items-center">
          <div
            @click="showInfo = !showInfo"
            class="flex p-2 sticky top-16 mx-8 my-4 w-full text-lg rounded-lg hover:bg-indigo-200 shadow cursor-pointer bg-indigo-100 text-indigo-700"
          >&#128582; Контакты и информация</div>

          <div
            v-if="showInfo"
            class="bg-white w-full flex-col flex mx-8 my-4 p-2 rounded-lg shadow"
          >
            <a
              v-for="link, index in links"
              :key="index"
              :href="link.href"
              target="__blank"
              class="flex w-full hover:bg-indigo-50 m-2 p-1 rounded-lg flex-row items-center"
            >
              <div class="mr-2 text-blue-900">&#10145; {{ link.label }}</div>
              <span class="text-2xl text-green-600" v-html="getRandomArrow()" />
            </a>
          </div>

          <div
            @click="showSubjects = !showSubjects"
            class="p-2 mx-8 sticky top-16 my-4 w-full flex text-lg rounded-lg shadow hover:bg-indigo-200 cursor-pointer bg-indigo-100 text-indigo-700"
          >&#127979; Предметы</div>

          <div
            v-for="subject, index in showSubjects ? subjects : []"
            :key="index"
            class="bg-white flex-col w-full flex mx-8 my-4 p-2 rounded-lg shadow"
          >
            <div class="text-lg font-medium">&#9989; {{ subject.title }}</div>
            <div class="m-2 flex-wrap flex flex-row gap-y-2">
              <a
                v-for="link, subIndex in subject.links"
                :href="link.href"
                target="__blank"
                :key="subIndex"
                class="mr-3 bg-indigo-100 flex flex-row p-1 pr-2 rounded-lg hover:bg-indigo-200"
              >
                <span v-html="getRandomSubjectIcon()" />
                &nbsp;
                {{ link.label }}
              </a>
            </div>
          </div>

          <div
            @click="showCalendar = !showCalendar"
            class="p-2 mx-8 sticky top-16 my-4 w-full flex text-lg rounded-lg shadow hover:bg-indigo-200 cursor-pointer bg-indigo-100 text-indigo-700"
          >&#128197; Календарь</div>

          <div
            v-show="showCalendar"
            class="h-96 bg-white flex flex-col w-full mx-8 my-4 p-2 rounded-lg shadow"
          >
            <div class="flex mt-2 h-96 justify-center">
              <iframe
                src="https://calendar.google.com/calendar/embed?src=kdenisb@gmail.com&ctz=Asia/Yekaterinburg"
                loading="lazy"
                class="flex w-56 xl:w-full md:w-full"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>