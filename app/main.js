import Vue from 'vue'
import Main from './main.vue'
import colors from 'vuetify/es5/util/colors'

import 'vuetify/dist/vuetify.min.css'
import Vuetify, {
  VApp, // required
  VNavigationDrawer,
  VFooter,
  VToolbar,
  VFadeTransition,
  VContent,
  VContainer,
  VToolbarSideIcon,
  VToolbarTitle
} from 'vuetify/lib'
import { Ripple } from 'vuetify/lib/directives'

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VToolbar,
    VFadeTransition,
    VContent,
    VContainer,
    VToolbarSideIcon,
    VToolbarTitle
  },
  directives: {
    Ripple
  },
  theme: {
    primary: colors.red.darken1, // #E53935
    secondary: colors.red.lighten4, // #FFCDD2
    accent: colors.indigo.base // #3F51B5
  }
})


const component = new Vue({
  el: document.body,
  components: { Main },
  render: ce => ce('Main')
})

const serviceWorkerFile = require('file-loader!./service-worker.js')

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations()
    .then(regs => Promise.all(regs.map(reg => reg.unregister())))
    .then(() => navigator.serviceWorker.register(serviceWorkerFile))
  
  .then(function(registration) {
    console.log('Registration successful, scope is:', registration.scope);
  })
  .catch(function(error) {
    console.log('Service worker registration failed, error:', error);
  });
}
