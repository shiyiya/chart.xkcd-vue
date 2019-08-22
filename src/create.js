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
      new chartXkcd[ctorsName](this.$el, this.config)
    },
    beforeDestroy: function () {},
    methods: {
      // TODO
    },
    render: function (createElement) {
      return createElement('svg')
    }
  }
}
