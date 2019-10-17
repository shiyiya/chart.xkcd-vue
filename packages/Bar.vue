<template>
  <svg
    class="xkcd-chart-bar-root"
    ref="svg"
    :width="width"
    :style="
      `font-family: ${
        _options.unxkcdify ? `inherit` : _options.fontFamily || 'xkcd'
      }`
    "
    :height="height"
  >
    <Title v-if="title" :title="title" />

    <g
      :transform="`translate(${margin.left}, ${margin.top})`"
      class="xkcd-chart-bar-main"
    >
      <XYAxis
        :height="nheight"
        :xScale="xScale"
        :yScale="yScale"
        :options="_options"
      />
      <g class="xkcd-chart-bar-wrapper">
        <rect
          v-for="(item, key) in data.datasets[0].data"
          :key="key"
          class="xkcd-chart-bar"
          :data-index="key"
          :x="xScale(data.labels[key])"
          :y="yScale(item)"
          :width="xScale.bandwidth()"
          :height="nheight - yScale(item)"
          fill="none"
          pointer-events="all"
          stroke="black"
          :stroke-width="3"
          :rx="2"
          :filter="filter"
        />
      </g>
    </g>

    <XYLabel
      :height="height"
      :width="width"
      :xLabel="xLabel"
      :yLabel="yLabel"
    />

    <Tooltip
      :show="tooltip"
      :unxkcdify="_options.unxkcdify"
      v-bind="tooltipConfig"
    />
  </svg>
</template>

<script>
import select from 'd3-selection/src/select'
import scaleBand from 'd3-scale/src/band'
import scaleLinear from 'd3-scale/src/linear'
import addFont from './mixins/addFont'
import addFilter from './mixins/addFilter'
import initData from './mixins/initData'
import config, { colors, margin } from './config'

import Title from './components/Title'
import XYLabel from './components/XYLabel'
import XYAxis from './components/XYAxis'

import Tooltip from './components/Tooltip'

export default {
  name: 'xkcd-chart-bar',
  props: {
    title: String,
    xLabel: String,
    yLabel: String,
    data: {
      type: Object,
      default: () => ({
        datasets: [],
        labels: []
      })
    },
    options: {
      type: Object,
      default: () => ({
        unxkcdify: false,
        yTickCount: 3,
        dataColors: [],
        fontFamily: 'xkcd'
      })
    }
  },

  data() {
    return {
      margin: margin,
      config: config,
      width: 0,
      height: 0,
      nwidth: 0,
      nheight: 0,
      tooltip: false,
      tooltipConfig: {}
    }
  },

  computed: {
    _options() {
      return {
        unxkcdify: false,
        yTickCount: 3,
        dataColors: [],
        fontFamily: 'xkcd',
        ...this.options
      }
    },
    filter() {
      return this._options.unxkcdify ? null : 'url(#xkcdify)'
    },
    xScale() {
      return scaleBand()
        .range([0, this.nwidth])
        .domain(this.data.labels)
        .padding(0.4)
    },
    allData() {
      return this.data.datasets.reduce((pre, cur) => pre.concat(cur.data), [])
    },
    yScale() {
      return scaleLinear()
        .range([this.nheight, 0])
        .domain([0, Math.max(...this.allData)])
    }
  },

  mixins: [initData, addFont, addFilter],

  methods: {
    mouseover({ target }) {
      if (target.classList.contains('xkcd-chart-bar')) {
        const i = Number(target.getAttribute('data-index'))
        select(target).attr(
          'fill',
          this._options.dataColors[i] ? this._options.dataColors[i] : colors[i]
        )
        this.tooltip = true
      }
    },
    mouseout({ target }) {
      select(target).attr('fill', 'none')
      this.tooltip = false
    },
    mousemove(e) {
      const { target } = e

      if (!target.classList.contains('xkcd-chart-bar')) return

      const i = Number(target.getAttribute('data-index'))
      const d = this.data.datasets[0].data[i]
      const tipX = e.offsetX
      const tipY = e.offsetY

      let tooltipPositionType = config.positionType.downRight
      if (tipX > this.width / 2 && tipY < this.height / 2) {
        tooltipPositionType = config.positionType.downLeft
      } else if (tipX > this.width / 2 && tipY > this.height / 2) {
        tooltipPositionType = config.positionType.upLeft
      } else if (tipX < this.width / 2 && tipY > this.height / 2) {
        tooltipPositionType = config.positionType.upRight
      }

      this.tooltipConfig = {
        title: this.data.labels[i],
        items: [
          {
            color: this._options.dataColors
              ? this._options.dataColors[i]
              : colors[i],
            text: `${this.data.datasets[0].label || ''}: ${d}`
          }
        ],
        position: {
          x: tipX,
          y: tipY,
          type: tooltipPositionType
        }
      }
    },
    addEventListener() {
      document
        .querySelector('.xkcd-chart-bar-wrapper')
        .addEventListener('mouseover', this.mouseover)

      document
        .querySelector('.xkcd-chart-bar-wrapper')
        .addEventListener('mouseout', this.mouseout)

      document
        .querySelector('.xkcd-chart-bar-wrapper')
        .addEventListener('mousemove', this.mousemove)
    }
  },

  mounted() {
    const {
      $refs: { svg },
      margin
    } = this

    //TODO better ?
    this.width = svg.parentElement.clientWidth
    this.height = Math.min(
      (svg.parentElement.clientWidth * 2) / 3,
      window.innerHeight
    )

    this.nwidth = this.width - margin.left - margin.right
    this.nheight = this.height - margin.top - margin.bottom

    this.addEventListener()
  },

  beforeDestroy() {
    document
      .querySelector('.xkcd-chart-bar-wrapper')
      .removeEventListener('mouseover', this.mouseover)

    document
      .querySelector('.xkcd-chart-bar-wrapper')
      .removeEventListener('mouseout', this.mouseout)

    document
      .querySelector('.xkcd-chart-bar-wrapper')
      .removeEventListener('mousemove', this.mousemove)
  },

  components: { Tooltip, Title, XYLabel, XYAxis }
}
</script>

<style lang="css" scoped>
.xkcd-chart-bar-root {
  stroke-width: 3;
}
</style>
