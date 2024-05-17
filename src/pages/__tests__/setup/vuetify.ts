   import { createVuetify } from 'vuetify'
   import { config } from '@vue/test-utils'

   export default function setupVuetify() {
     const vuetify = createVuetify()
     config.global.plugins.push({
       install(app) {
         app.use(vuetify)
       },
     })
   }
