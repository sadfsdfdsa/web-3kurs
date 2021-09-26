<script setup lang="ts">
import { ref, Ref } from 'vue'
import axios from 'axios'

import { register } from 'register-service-worker'

// https://medium.com/google-developer-experts/workbox-4-implementing-refresh-to-update-version-flow-using-the-workbox-window-module-41284967e79c
// https://github.com/yyx990803/register-service-worker
// https://developers.google.com/web/fundamentals/primers/service-workers/high-performance-loading
export const useServiceWorker = (): {
  appNeedsRefresh: Ref<boolean>
  offlineAppReady: Ref<boolean>
} => {
  const offlineAppReady = ref(false)
  const appNeedsRefresh = ref(false)

  register(
    '/sw.js',
    {
      registrationOptions: { scope: '/' },
      updated: async() => { appNeedsRefresh.value = true },
      cached: () => { offlineAppReady.value = true },
    },
  )

  return {
    appNeedsRefresh,
    offlineAppReady,
  }
}

const showCalendar = ref(true)
const showInfo = ref(true)
const showSubjects = ref(true)
const showModalSearch = ref(false)

type Link = {
  href: string
  label: string
}

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

const links: Array<Link> = [
  { href: 'https://www.hse.ru/org/persons/504184765', label: 'Кузнецов Денис Павлович ВШЭ' },
  { href: 'http://vk.com/kdenisb', label: 'VK' },
  { href: 'mailto:kdenisb@gmail.com', label: 'kdenisb@gmail.com' },
]
const subjects: Ref<Array<Subject>> = ref(getSubjectsFromStorage())

const arrows = ['&#9758;', '&#8669;', '&#8605;', '&#10239;', '&#10155;', '&#8620;', '&#10150;']

const getRandomArrow = (): string => {
  return arrows[Math.floor(Math.random() * arrows.length)]
}

const subjectIcons = ['&#127891;', '&#128210;', '&#128211;', '&#128212;', '&#128213;', '&#128214;', '&#128215;', '&#128216;', '&#128217;', '&#128220;', '&#127914;']

const getRandomSubjectIcon = (): string => {
  return subjectIcons[Math.floor(Math.random() * subjectIcons.length)]
}

document.addEventListener('keydown', (e) => {
  if (e.key === '/' || e.charCode === 47) {
    showModalSearch.value = true
    e.preventDefault()
    return
  }
  if (e.key === 'Escape' || e.keyCode === 27) {
    showModalSearch.value = false
    e.preventDefault()
  }
})
</script>

<template>
  <div class="container">
    <div
      class="sticky w-screen top-0 h-16 p-2 bg-white mb-auto flex items-center flex-row justify-between"
    >
      <div class="text-2xl">Кузнецов Денис Павлович</div>
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
    <!-- <div
      class="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      v-if="showModalSearch"
    >
      <div
        class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div class="border shadow-2xl bg-white w-96 h-96">
          <div>Header</div>
        </div>
      </div>
    </div>-->
  </div>
</template>