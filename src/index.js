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
var chartXKCDPie = create('chartxkcd-pie')
var chartXKCDXY = create('chartxkcd-xy')

export {
  create as genComponent,
  chartXKCDLine,
  chartXKCDBar,
  chartXKCDPie,
  chartXKCDXY
}
