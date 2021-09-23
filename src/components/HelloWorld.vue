<script setup lang="ts">
import { ref } from 'vue'

const parse = `
Лабораторные http://kdenisb.org/db/labs_bd_v3.pdf 
Видеопыты c БД (плейлист на youtube) https://www.youtube.com/playlist?list=PLrih0txcjWjE2V1x18HzxMNjaUIPWul4Y 

Лабораторные http://kdenisb.org/ipsis/met_ipsis_lab_2020_v4.docx.pdf 
apache.log http://kdenisb.org/apache.log 
Образ диска ВМ minix (torrent-файл) http://kdenisb.org/minix_330_v1_2019.vdi.torrent 
Образ диска ВМ minix (скачать по http) http://kdenisb.org/minix_330_v1.vdi 
Видеопыты с Minix (плейлист на youtube) https://www.youtube.com/playlist?list=PLrih0txcjWjHtW6QQiSqhrRQNKuo7IO2L 

Лабораторные http://kdenisb.org/spo/met_spo_labs_v2019.pdf 
Курсовая http://kdenisb.org/spo/spo_kr_an.pdf 
apache.log http://kdenisb.org/apache.log 
Лекции http://kdenisb.org/spo/spo_lect.pdf 
Презентация http://kdenisb.org/os_prez_93.pdf 

Конспект http://kdenisb.org/lections_2007.pdf 
Лабораторные minix (torrent-файл) http://kdenisb.org/minix_330_v1_2019.vdi.torrent 
Образ диска ВМ minix (скачать по http) http://kdenisb.org/minix_330_v1.vdi 
Файлы для лабы по ФС minix http://kdenisb.org/lab4v1.tar 
Методичка minix http://kdenisb.org/minixlab_v9.pdf 
Вопросы к экзамену http://kdenisb.org/os_tic_2017.pdf 
Видеопыты с Minix (плейлист на youtube) https://www.youtube.com/playlist?list=PLrih0txcjWjHtW6QQiSqhrRQNKuo7IO2L 
Лаба по ВМ http://kdenisb.org/osLabVm.pdf 

Конспект http://kdenisb.org/mt/mt_lections_2011.pdf 
Методичка http://kdenisb.org/mt/mt_labs_v_1.pdf 
Вопросы к экзамену http://kdenisb.org/mt/tic.pdf 

Конспект http://kdenisb.org/tp/proc_yls.pdf 
Контрольные http://kdenisb.org/tp/cont_tp_all.pdf 
Курсач http://kdenisb.org/tp/kurs_2016_v1.pdf 

Конспект http://kdenisb.org/pp/par_lect.pdf 
Контрольные http://kdenisb.org/pp/lab1.pdf 
Пример1 http://kdenisb.org/pp/sim_posix.c 

Лабы http://kdenisb.org/fp/fp_labs_v_1.pdf 
Вопросы к экзамену http://kdenisb.org/fp/tic_fp.pdf 
Лекции http://kdenisb.org/fp/fp_lec.pdf 
Презентация http://kdenisb.org/fp/prez-2.97.pdf 

Презентация http://kdenisb.org/xhtml_prez-1.92.pdf 
Задания курсам http://kdenisb.org/web_tasks_201409.zip 
Задание очникам ПИ http://kdenisb.org/web/task_complex.pdf 
Задание очникам БИ http://kdenisb.org/web/task_complex_b.pdf 
Презентация и примеры JS http://kdenisb.org/js_prez.zip 
on-line курс https://openedu.ru/course/ITMOUniversity/WEBDEV/ 
Видеоопыты https://www.youtube.com/playlist?list=PLrih0txcjWjEvC_IRchopcVbFmbx2e5rS 
Примеры по LESS http://kdenisb.org/less.zip 
Лабораторная 1 МК http://kdenisb.org/web/lab1_v1.pdf 
Лабораторные магистрам http://kdenisb.org/web/lab1-9_v9-mg1.pdf 
Лабораторная JavaScript (бакалаврам) http://kdenisb.org/web/lab3_bak_js_v1.pdf 
Лабораторная React (бакалаврам) http://kdenisb.org/web/lab4_bak_react_v1.pdf 

Презентация http://kdenisb.org/webprj-0.3.pdf 
on-line курс https://openedu.ru/course/ITMOUniversity/WEBDEV/ 
Задание на проектирование http://kdenisb.org/web/TZ_items_v2021.pdf 
Лабораторная CMS http://kdenisb.org/web/lab_cms_v1.pdf 
Пример прототипа http://kdenisb.org/prjprot.pdf 
Видеоопыты https://www.youtube.com/playlist?list=PLrih0txcjWjEvC_IRchopcVbFmbx2e5rS

Презентация http://kdenisb.org/secur/prez_v9.6.pdf 
Лаба 1 http://kdenisb.org/secur/lab1_v3.pdf 
Лаба 2 http://kdenisb.org/secur/lab2.pdf 
Лаба 3 http://kdenisb.org/secur/lab3.pdf 
Лаба 5 http://kdenisb.org/secur/lab5_2.pdf 
Видеоопыты https://www.youtube.com/playlist?list=PLrih0txcjWjHHR6Brcyd5Dn3HPSDoXTVh

Программа http://kdenisb.org/preddip_13.doc 
Документы http://kdenisb.org/pred_docs.zip
`

const stringArray: Array<string> = parse.split('\n\n')

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

const links: Array<Link> = [
  { href: 'https://www.hse.ru/org/persons/504184765', label: 'Кузнецов Денис Павлович ВШЭ' },
  { href: 'http://vk.com/kdenisb', label: 'VK' },
  { href: 'mailto:kdenisb@gmail.com', label: 'kdenisb@gmail.com' },
]
const subjects: Array<Subject> = [
  {
    title: 'БД',
    links: [
    ],
  }, {
    title: 'ИПСИС',
    links: [
    ],
  }, {
    title: 'СПО',
    links: [
    ],
  }, {
    title: 'ОС',
    links: [
    ],
  }, {
    title: 'Теор. Авт.',
    links: [
    ],
  }, {
    title: 'Теор. Яз. Прог.',
    links: [
    ],
  }, {
    title: 'Параллельное',
    links: [
    ],
  }, {
    title: 'Функциональное и логическое',
    links: [
    ],
  }, {
    title: 'Веб-программирование',
    links: [
    ],
  }, {
    title: 'Проектирование Веб-сайтов',
    links: [
    ],
  }, {
    title: 'Защита ПО',
    links: [
    ],
  }, {
    title: 'Преддипломное',
    links: [
    ],
  },
]


/**
 * Parsing raw links
 */
for (let index = 0; index < stringArray.length; index++) {
  const subArray = stringArray[index].split('\n')
  for (let j = 0; j < subArray.length; j++) {
    const element = subArray[j]
    const splittedElement = element.trim().split(' ')
    if (splittedElement.length >= 2) {
      const href = splittedElement[splittedElement.length - 1]
      const label = splittedElement.slice(0, splittedElement.length - 1).join(' ')
      subjects[index].links.push({
        label, href
      })
    }
  }
}

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
          >&#129496; Контакты и информация</div>

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
              <div class="mr-2 text-blue-900 ">&#10145; {{ link.label }}</div>
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
            <iframe
              src="https://calendar.google.com/calendar/embed?src=kdenisb@gmail.com&ctz=Asia/Yekaterinburg"
              loading="lazy"
              class="mt-2 h-96 xs:w-48"
            ></iframe>
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