<template>
  <g>
    <text
      if="xLabel"
      class="xlable"
      x="50%"
      y="100%"
      text-anchor="middle"
      style="font-size: 17px; transform: translateY(-10px)"
      >{{ xLabel }}</text
    >
    <text
      ref="ylable"
      class="ylable"
      v-if="yLabel"
      text-anchor="end"
      dy=".75em"
      y="6"
      x="0"
      transform="rotate(-90)"
      style="font-size: 17px;"
      >{{ yLabel }}</text
    >
  </g>
</template>

<script>
import select from 'd3-selection/src/select'

export default {
  name: 'XYLabel',
  props: {
    height: { type: Number },
    xLabel: {
      type: String,
      require: false
    },
    yLabel: {
      type: String,
      require: false
    }
  },
  methods: {
    getYlabelX() {
      this.$refs.ylable &&
        select(this.$refs.ylable).call(f => {
          const textLength = f.node().getComputedTextLength()
          f.attr('x', 0 - this.height / 2 + textLength / 2)
        })
    }
  },
  watch: {
    height() {
      this.getYlabelX()
    },
    yLabel() {
      this.getYlabelX()
    }
  },
  mounted() {
    this.getYlabelX()
  }
}
</script>
