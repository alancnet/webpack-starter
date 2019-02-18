require('material-icons/iconfont/material-icons.css')
require('angular-material/angular-material.min.css')
require('angular-material')
require('angular-ui-router')

const angular = require('angular')
const app = angular.module('app', ['ui.router.router', 'ngMaterial'])

const es6 = require('es6-string-html-template')
window.html = es6.html
window.raw = es6.raw

module.exports = app
