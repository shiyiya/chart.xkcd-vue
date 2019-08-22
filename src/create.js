import ctors from './constructors.js'

export default function create(name, chartXkcd) {
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
      new chartXkcd[ctorsName](this.$refs.ref, this.config)
    },
    beforeDestroy: function () {
      this.chart.destroy()
    },
    methods: {
      // TODO
    },
    render(createElement) {
      return createElement('svg', { ref: 'ref' })
    }
  }
}
