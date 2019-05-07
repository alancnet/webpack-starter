import Vue from 'vue'
import Main from './main.vue'

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

const component = new Vue({
  el: document.body,
  components: { Main },
  render: ce => ce('Main')
})
