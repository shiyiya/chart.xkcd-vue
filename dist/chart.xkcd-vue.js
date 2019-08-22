(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('chart.xkcd')) :
  typeof define === 'function' && define.amd ? define(['exports', 'chart.xkcd'], factory) :
  (global = global || self, factory(global.ChartXkcdVue = {}, global.chartXkcd));
}(this, function (exports, chartXkcd) { 'use strict';

  chartXkcd = chartXkcd && chartXkcd.hasOwnProperty('default') ? chartXkcd['default'] : chartXkcd;

  var ctors = {
    ChartXkcdLine: 'Line',
    ChartXkcdBar: 'Pie',
    ChartXkcdPie: 'Bar'
  };

  function create(name, chartXkcd$$1) {
    var ctorsName = ctors[name];
    if (!ctorsName) {
      return null
    }
    return {
      name: name,
      props: {
        config: { type: Object, required: true }
      },
      watch: {
        config: {
          handler: function () {
            // TODO
          },
          deep: true
        }
      },
      mounted: function () {
        // eslint-disable-next-line no-new
        new chartXkcd$$1[ctorsName](this.$el, this.config);
      },
      beforeDestroy: function () {
        this.chart.destroy();
      },
      methods: {
        // TODO
      },
      render: function (createElement) {
        return createElement('svg')
      }
    }
  }

  function install(Vue) {
    for (var name in ctors) {
      var component = create(name, chartXkcd);
      component && Vue.component(name, component);
    }
  }

  if (typeof window !== 'undefined' && window.Vue && window.chartXkcd) {
    install(window.Vue, window.chartXkcd);
  }

  exports.default = install;
  exports.genComponent = create;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
