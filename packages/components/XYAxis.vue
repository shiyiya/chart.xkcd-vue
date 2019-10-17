<template>
  <g :class="`${!options.unxkcdify ? 'axis-wrapper xkcd' : 'axis-wrapper'}`">
    <g ref="yScale" class="axis-y"></g>
    <g ref="xScale" class="axis-x"></g>
  </g>
</template>

<script>
import select from 'd3-selection/src/select'
import { axisBottom, axisLeft } from 'd3-axis/src/axis'

export default {
  name: 'XYLabel',
  props: ['yScale', 'xScale', 'options', 'height'],
  data() {
    return {
      tickCount: this.options.tickCount,
      fontFamily: this.options.fontFamily
    }
  },
  methods: {
    handleY() {
      const { yScale, tickCount } = this

      select(this.$refs.yScale).call(
        axisLeft(yScale)
          .tickSize(1)
          .tickPadding(10)
          .ticks(tickCount, 's')
      )
    },
    handleX() {
      const { xScale, tickCount, height } = this

      select(this.$refs.xScale)
        .attr('transform', `translate(0, ${height})`)
        .call(
          axisBottom(xScale)
            .tickSize(0)
            .tickPadding(6)
            .ticks(tickCount)
        )
    }
  },
  watch: {
    height() {
      this.handleX()
    },
    yScale() {
      this.handleY()
    },
    xScale() {
      this.handleX()
    }
  },
  mounted() {
    this.handleY()
    this.handleX()
  }
}
</script>

<style>
.axis-wrapper path {
  stroke: black;
}

.axis-wrapper text {
  font-size: 16px;
  font-family: 'inherit';
}

.xkcd path {
  filter: url(#xkcdify);
}

.xkcd text {
  font-family: xkcd;
}
</style>
