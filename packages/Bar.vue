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

    <g :transform="`translate(${margin.left}, ${margin.top})`">
      <XYAxis
        :height="nheight"
        :xScale="xScale"
        :yScale="yScale"
        :options="_options"
      />
      <g class="xkcd-chart-bar-wrapper">
        <rect
          v-for="(item, key) in data.datasets[0].data"
          class="xkcd-chart-bar"
          :key="key"
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
import selectAll from 'd3-selection/src/selectAll'
import mouse from 'd3-selection/src/mouse'
import scaleBand from 'd3-scale/src/band'
import scaleLinear from 'd3-scale/src/linear'
// import { transition } from "d3-transition";

// import addAxis from "./mixins/addAxis";
// import addLabels from "./mixins/addLabels";
import addFont from './mixins/addFont'
import addFilter from './mixins/addFilter'
import initData from './mixins/initData'
import colors from './mixins/colors'
import config from './config'

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
    data: Object,
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
      margin: {
        top: 50,
        right: 30,
        bottom: 50,
        left: 50
      },
      filter: this.options.unxkcdify ? null : 'url(#xkcdify)',
      config: config,
      width: 0,
      height: 0,
      nwidth: 0,
      nheight: 0,
      tooltip: false,
      tooltipConfig: {},
      // eslint-disable-next-line vue/no-reserved-keys
      _options: {
        unxkcdify: false,
        yTickCount: 3,
        dataColors: [],
        fontFamily: 'xkcd'
      }
    }
  },

  updated() {
    this._options = Object.assign(
      {
        unxkcdify: false,
        yTickCount: 3,
        dataColors: [],
        fontFamily: 'xkcd'
      },
      this.options
    )
    console.log(this.options.unxkcdify)
    console.log(this._options.unxkcdify)
  },

  computed: {
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
        .domain([0, Math.max(...this.allData)])
        .range([this.nheight, 0])
    }
  },

  mixins: [
    initData,
    addFont,
    addFilter
    // addLabels.xLabel,
    // addLabels.yLabel,
    // addAxis
  ],

  beforeMount() {
    // TODO merge {xx: null} => {xx: default}
    this._options = Object.assign(
      {
        unxkcdify: false,
        yTickCount: 3,
        dataColors: [],
        fontFamily: 'xkcd'
      },
      this.options
    )
  },

  methods: {
    loadChart() {
      selectAll('.xkcd-chart-bar')
        .data(this.data.datasets[0].data)
        .on('mouseover', (d, i, nodes) => {
          select(nodes[i]).attr(
            'fill',
            this._options.dataColors[i]
              ? this._options.dataColors[i]
              : colors[i]
          )
          this.tooltip = true
        })
        .on('mouseout', (d, i, nodes) => {
          select(nodes[i]).attr('fill', 'none')
          this.tooltip = false
        })
        .on('mousemove', (d, i, nodes) => {
          const tipX = mouse(nodes[i])[0] + this.margin.left + 10
          const tipY = mouse(nodes[i])[1] + this.margin.top + 10

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
        })
    }
  },

  mounted() {
    const {
      $refs: { svg },
      margin
    } = this

    this.width = svg.parentElement.clientWidth
    this.height = Math.min(
      (svg.parentElement.clientWidth * 2) / 3,
      window.innerHeight
    )

    this.nwidth = this.width - margin.left - margin.right
    this.nheight = this.height - margin.top - margin.bottom

    this.loadChart()

    // this.addxAxis();
    // this.addyAxis();
  },

  components: { Tooltip, Title, XYLabel, XYAxis }
}
</script>

<style lang="css" scoped>
.xkcd-chart-bar-root {
  stroke-width: 3;
}
</style>
