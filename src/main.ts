import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

import type { Ref } from 'vue'

import { register } from 'register-service-worker'
import { ref } from 'vue'

export const useServiceWorker = (): {
  appNeedsRefresh: Ref<boolean>
  offlineAppReady: Ref<boolean>
} => {
  const offlineAppReady = ref(false)
  const appNeedsRefresh = ref(false)

  register('/sw.js', {
    registrationOptions: { scope: '/' },
    updated: async () => {
      appNeedsRefresh.value = true
    },
    cached: () => {
      offlineAppReady.value = true
    },
  })

  return {
    appNeedsRefresh,
    offlineAppReady,
  }
}

const { appNeedsRefresh, offlineAppReady } = useServiceWorker()

createApp(App).mount('#app')
