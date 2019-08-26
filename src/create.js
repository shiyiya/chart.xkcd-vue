import chartXkcd from 'chart.xkcd'
import ctors from './constructors.js'

export default function create(name) {
  var ctorsName = ctors[name]
  if (!ctorsName) {
    // eslint-disable-next-line prefer-template
    throw TypeError(name + ' component does not exist')
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
      new chartXkcd[ctorsName](this.$el, this.config)
    },

    // beforeDestroy: function () {},

    render: function (h) {
      return h('svg')
    }
  }
}
