import ctors from './constructors.js'
import create from './create.js'

export default function install(Vue) {
  for (var name in ctors) {
    var component = create(name)
    component && Vue.component(name, component)
  }
}

if (typeof window !== 'undefined' && window.Vue && window.chartXkcd) {
  install(window.Vue)
}

var chartXKCDLine = create('chartxkcd-line')
var chartXKCDBar = create('chartxkcd-bar')
var chartXKCDXY = create('chartxkcd-xy')
var chartXKCDPie = create('chartxkcd-pie')
var chartXKCDRadar = create('chartxkcd-radar')
var chartxkcdStackedbar = create('chartxkcd-stackedbar')

export {
  create as genComponent,
  chartXKCDLine,
  chartXKCDBar,
  chartXKCDXY,
  chartXKCDPie,
  chartXKCDRadar,
  chartxkcdStackedbar
}
