import Vue from 'vue';
import chartXkcd from 'chart.xkcd';

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

export default install;
export { create as genComponent };
