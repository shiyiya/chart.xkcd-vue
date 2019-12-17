/* global expect, Vue */
/* eslint-env mocha */

import chartXkcdVue, { genComponent } from '../src/index.js'

describe('chart.xkcd-vue', function () {
  var createVM = function (template) {
    return new Vue({
      el: document.createElement('div'),
      template: template
    })
  }
  var componentHelper = function (template, data) {
    var vm = createVM(template, data)

    return vm.$nextTick().then(function () {
      expect(vm.$el.tagName === 'svg').to.exist
    })
  }

  before(function () {
    Vue.use(chartXkcdVue)
  })

  it('should support <chartxkcd-line> component', function () {
    return componentHelper('<chartxkcd-line :config="{}"></chartxkcd-line>')
  })

  it('should support <chartxkcd-bar> component', function () {
    return componentHelper('<chartxkcd-bar :config="{}"></chartxkcd-bar>')
  })

  it('should support <chartxkcd-pie> component', function () {
    return componentHelper('<chartxkcd-pie> :config="{}"></chartxkcd-pie>')
  })

  it('should support <chartxkcd-radar> component', function () {
    return componentHelper('<chartxkcd-radar> :config="{}"></chartxkcd-radar>')
  })

  it('should support <chartxkcd-stackedbar> component', function () {
    return componentHelper('<chartxkcd-stackedbar> :config="{}"></chartxkcd-stackedbar>')
  })

  it('can generate single Componet', function () {
    var names = ['chartxkcd-line', 'chartxkcd-bar', 'chartxkcd-pie', 'chartxkcd-xy', 'chartxkcd-radar', 'chartxkcd-stackedbar']
    names.forEach(function (name) {
      var Component = genComponent(name)
      expect(Component.name).to.equal(name)
      componentHelper(`<${name}> :config="{}"></${name}>`)
    })
    // var Unknown =expect(genComponent('Unknown'))
    // expect(Unknown).to.not.exist //TODO catch error
  })
})
