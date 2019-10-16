<template>
  <div>
    <!-- <XLine v-bind="config" /> -->
    <XBar v-bind="bconfig" />
    <textarea :value="bconfigS" cols="50" rows="10" @input="changeC" />
    <button @click="togglexkcd">
      {{ !bconfig.options.unxkcdify ? 'xkcdify' : 'normal' }}
    </button>
  </div>
</template>

<script>
import { XBar, XLine } from '../packages/index'

export default {
  name: 'app',
  data() {
    return {
      config: {
        title: 'Monthly income of an indie developer',
        xLabel: 'Month',
        yLabel: '$ Dollors',
        data: {
          labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
          datasets: [
            {
              label: 'Plan',
              data: [30, 70, 200, 300, 500, 800, 1500, 2900, 5000, 8000]
            },
            { label: 'Reality', data: [0, 1, 30, 70, 80, 100, 50, 80, 40, 150] }
          ]
        },
        options: { yTickCount: 3, legendPosition: 1 }
      },
      bconfig: {
        xLabel: 'type',
        yLabel: 'total',
        title: 'github stars VS patron number',
        data: {
          labels: ['github stars', 'patrons'],
          datasets: [{ data: [100, 500] }]
        },
        options: { yTickCount: 2, unxkcdify: false }
      }
    }
  },
  computed: {
    bconfigS() {
      return JSON.stringify(this.bconfig)
    }
  },
  methods: {
    changeC(e) {
      this.bconfig = JSON.parse(e.target.value)
    },
    togglexkcd() {
      this.bconfig.options.unxkcdify = !this.bconfig.options.unxkcdify
    }
  },
  components: {
    XLine,
    XBar
  }
}
</script>

<style lang="css">
body {
  width: 600px;
  height: 400px;
  margin: 0 auto;
}
</style>
