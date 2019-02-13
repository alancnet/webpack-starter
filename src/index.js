require('material-icons/iconfont/material-icons.css')
require('material-design-lite/dist/material.indigo-green.min.css')


const angular = require('angular')
angular.module('app', [])
require('./body')

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

document.addEventListener('DOMContentLoaded', () => {
  angular.bootstrap(document.documentElement, ['app'])
})