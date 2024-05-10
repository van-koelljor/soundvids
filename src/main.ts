import { createApp, type Plugin } from 'vue'
import VueVideoPlayer from '@videojs-player/vue'
import 'video.js/dist/video-js.css'

import App from './App.vue'
import '@/assets/styles/index.css'

const app = createApp(App)
app.use(VueVideoPlayer)

Object.values(
  import.meta.glob<Plugin>('./plugins/*.ts', {
    eager: true,
    import: 'default',
  }),
).forEach((v) => app.use(v))

app.mount('#app')
