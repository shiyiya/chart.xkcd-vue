(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue'), require('chart.xkcd')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue', 'chart.xkcd'], factory) :
  (global = global || self, factory(global.chartXkcdVue = {}, global.Vue, global.chartXkcd));
}(this, function (exports, Vue, chartXkcd) { 'use strict';

  Vue = Vue && Vue.hasOwnProperty('default') ? Vue['default'] : Vue;
  chartXkcd = chartXkcd && chartXkcd.hasOwnProperty('default') ? chartXkcd['default'] : chartXkcd;

  var ctors = {
    'chartxkcd-line': 'Line',
    'chartxkcd-bar': 'Bar',
    'chartxkcd-pie': 'Pie',
    'chartxkcd-xy': 'XY'
  };

  function create(name) {
    var ctorsName = ctors[name];
    if (!ctorsName) {
      // eslint-disable-next-line prefer-template
      throw TypeError(name + ' component does not exist')
    }

    return Vue.extend({
      name: name,
      props: {
        config: { type: Object, required: true }
      },
      // TODO
      // watch: {
      //   config: {
      //     handler: function () {},
      //     deep: true
      //   }
      // },

      mounted: function () {
        // eslint-disable-next-line no-new
        new chartXkcd[ctorsName](this.$el, this.config);
      },

      // beforeDestroy: function () {},

      render: function (h) {
        return h('svg')
      }
    })
  }

  function install(Vue$$1) {
    for (var name in ctors) {
      var component = create(name);
      component && Vue$$1.component(name, component);
    }
  }

  if (typeof window !== 'undefined' && window.Vue && window.chartXkcd) {
    install(window.Vue);
  }

  exports.default = install;
  exports.genComponent = create;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
