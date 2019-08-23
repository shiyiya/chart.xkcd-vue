import ctors from './constructors.js'

export default function create(chartXkcd, name) {
  var ctorsName = ctors[name]
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
      new chartXkcd[ctorsName](this.$el, this.config)
    },

    // beforeDestroy: function () {},

    render: function (createElement) {
      return createElement('svg')
    }
  }
}
