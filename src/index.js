import chartXkcd from 'chart.xkcd'
import ctors from './constructors.js'
import create from './create.js'

export default function install(Vue) {
  for (var name in ctors) {
    var component = create(name, chartXkcd)
    component && Vue.component(name, component)
  }
}

if (typeof window !== 'undefined' && window.Vue && window.chartXkcd) {
  install(window.Vue, window.chartXkcd)
}

export { create as genComponent }
