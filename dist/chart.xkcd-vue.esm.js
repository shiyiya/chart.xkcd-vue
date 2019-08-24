import chartXkcd from 'chart.xkcd';

var ctors = {
  'chartxkcd-line': 'Line',
  'chartxkcd-bar': 'Bar',
  'chartxkcd-pie': 'Pie',
  'chartxkcd-xy': 'XY'
};

function create(chartXkcd$$1, name) {
  var ctorsName = ctors[name];
  if (!ctorsName) {
    return null
  }
  return {
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
      new chartXkcd$$1[ctorsName](this.$el, this.config);
    },

    // beforeDestroy: function () {},

    render: function (createElement) {
      return createElement('svg')
    }
  }
}

function install(Vue) {
  for (var name in ctors) {
    var component = create(chartXkcd, name);
    component && Vue.component(name, component);
  }
}

if (typeof window !== 'undefined' && window.Vue && window.chartXkcd) {
  install(window.Vue);
}

export default install;
export { create as genComponent };
