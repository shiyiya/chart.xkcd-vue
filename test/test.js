/* global expect, Vue */
/* eslint-env mocha */

import chartXkcdVue, { genComponent } from '../src/index.js'
// import clone from '../src/clone.js'

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

  it('should support <ChartXkcdLine> component', function () {
    return componentHelper('<ChartXkcdLine :config="{}"></ChartXkcdLine>')
  })

  it('should support <ChartXkcdBar> component', function () {
    return componentHelper('<ChartXkcdBar :config="{}"></ChartXkcdBar>')
  })

  it('should support <ChartXkcdPie> component', function () {
    return componentHelper('<ChartXkcdPie :config="{}"></ChartXkcdPie>')
  })

  it('can generate single Componet', function () {
    var names = ['ChartXkcdLine', 'ChartXkcdBar', 'ChartXkcdPie']
    names.forEach(function (name) {
      var Component = genComponent(window.chartXkcd, name)
      expect(Component.name).to.equal(name)
    })
    var Unknown = genComponent(window.chartXkcd, 'Unknown')
    expect(Unknown).to.not.exist
  })
})

// describe('clone', function () {
//   it('should clone object', function () {
//     var obj = {
//       arr: [{ a: 1 }, 2, '3', null, undefined, false],
//       num: 1,
//       str: '2',
//       bool: false,
//       obj: { a: 1 }
//     }
//     expect(clone(obj)).to.deep.equal(obj)
//   })
// })
