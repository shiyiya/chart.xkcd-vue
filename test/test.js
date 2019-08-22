/**
 * See https://github.com/npm/npm/issues/5499
 *
 * For it's impossible to install multiple versions of a dependency,
 * only latest version of Vue and Highcharts will be tested.
 *
 * Old version of Vue and Highcharts should be tested manually.
 */

/* global expect, Vue */
/* eslint-env mocha */
// TODO
import chartXkcdVue, { genComponent } from '../src/index.js'
import clone from '../src/clone.js'

describe('chart.xkcd-vue', function () {
  var createVM = function (template) {
    return new Vue({
      el: document.createElement('div'),
      template: template
    })
  }
  var componentHelper = function (template) {
    var vm = createVM(template)
    return vm.$nextTick().then(function () {
      expect(vm.$el.querySelector('svg')).to.exist
    })
  }

  before(function () {
    Vue.use(chartXkcdVue)
  })

  it('should support <ChartXkcdLine> component', function () {
    return componentHelper('<ChartXkcdLine :options="{}"></ChartXkcdLine>')
  })

  it('should support <ChartXkcdBar> component', function () {
    return componentHelper('<ChartXkcdBar :options="{}"></ChartXkcdBar>')
  })

  it('should support <ChartXkcdPie> component', function () {
    return componentHelper('<ChartXkcdPie :options="{}"></ChartXkcdPie>')
  })

  it('can generate single Componet', function () {
    var names = ['ChartXkcdLine', 'ChartXkcdBar', 'ChartXkcdPie']
    names.forEach(function (name) {
      var Component = genComponent(name, window.chartXkcd)
      expect(Component.name).to.equal(name)
    })
    var Unknown = genComponent('Unknown', window.chartXkcd)
    expect(Unknown).to.not.exist
  })
})

describe('clone', function () {
  it('should clone object', function () {
    var obj = {
      arr: [{ a: 1 }, 2, '3', null, undefined, false],
      num: 1,
      str: '2',
      bool: false,
      obj: { a: 1 }
    }
    expect(clone(obj)).to.deep.equal(obj)
  })
})
