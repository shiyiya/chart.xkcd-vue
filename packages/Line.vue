<template>
  <svg
    class="Bar"
    ref="svg"
    :width="width"
    :style="
      `stroke-width: 3; font-family: ${
        options.unxkcdify
          ? `'-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif'`
          : options.fontFamily || 'xkcd'
      }`
    "
    :height="height"
  >
    <g :transform="`translate(${margin.left}, ${margin.top})`">
      <g class="graphPart" ref="graphPart" />
    </g>
    <Tooltip
      title="tooltip"
      :items="[
        { color: 'red', text: 'weweyang: 12' },
        { color: 'blue', text: 'timqian: 13' }
      ]"
      :position="{ x: 30, y: 30, type: config.positionType.upRight }"
      :unxkcdify="options.unxkcdify"
    />
  </svg>
</template>

<script>
import line from 'd3-shape/src/line'
import { monotoneX } from 'd3-shape/src/curve/monotone'
import select from 'd3-selection/src/select'
import mouse from 'd3-selection/src/mouse'
import { point as scalePoint } from 'd3-scale/src/band'
import scaleLinear from 'd3-scale/src/linear'

import addAxis from './mixins/addAxis'
import addLabels from './mixins/addLabels'
import addFont from './mixins/addFont'
import addFilter from './mixins/addFilter'
import initData from './mixins/initData'
import colors from './mixins/colors'
import addLegend from './mixins/addLegend'
import config from './config'

import Tooltip from './components/Tooltip'

export default {
  name: 'Bar',
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
      nheight: 0
    }
  },

  computed: {
    xScale() {
      return scalePoint()
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
    addFilter,
    addLabels.title,
    addLabels.xLabel,
    addLabels.yLabel,
    addAxis
  ],

  beforeMount() {
    // TODO merge {xx: null} => {xx: default}
    this.options = Object.assign(this.options, {
      unxkcdify: false,
      yTickCount: 3,
      dataColors: [],
      fontFamily: 'xkcd'
    })
  },

  mounted() {
    const {
      $refs: { graphPart, svg },
      margin
    } = this

    //mounted
    this.addxAxis()
    this.addyAxis()

    //  call lasted
    select(svg)
      .selectAll('.domain')
      .attr('filter', this.filter)

    const theLine = line()
      .x((d, i) => this.xScale(this.data.labels[i]))
      .y(d => this.yScale(d))
      .curve(monotoneX)

    select(graphPart)
      .selectAll('.xkcd-chart-line')
      .data(this.data.datasets)
      .enter()
      .append('path')
      .attr('class', 'xkcd-chart-line')
      .attr('d', d => theLine(d.data))
      .attr('fill', 'none')
      .attr('stroke', (d, i) =>
        this.options.dataColors[i] ? this.options.dataColors[i] : colors[i]
      )
      .attr('filter', this.filter)

    const verticalLine = select(graphPart)
      .append('line')
      .attr('x1', 30)
      .attr('y1', 0)
      .attr('x2', 30)
      .attr('y2', this.height)
      .attr('stroke', '#aaa')
      .attr('stroke-width', 1.5)
      .attr('stroke-dasharray', '7,7')
      .style('visibility', 'hidden')
    const circles = this.data.datasets.map((dataset, i) =>
      select(graphPart)
        .append('circle')
        .style(
          'stroke',
          this.options.dataColors[i] ? this.options.dataColors[i] : colors[i]
        )
        .style(
          'fill',
          this.options.dataColors[i] ? this.options.dataColors[i] : colors[i]
        )
        .attr('r', 3.5)
        .style('visibility', 'hidden')
    )

    select(graphPart)
      .append('rect')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('fill', 'none')
      // .attr('stroke', 'black')
      .on('mouseover', () => {
        console.log(11)
        circles.forEach(circle => circle.style('visibility', 'visible'))
        verticalLine.style('visibility', 'visible')
        // tooltip.show();
      })
      .on('mouseout', () => {
        console.log(11)
        circles.forEach(circle => circle.style('visibility', 'hidden'))
        verticalLine.style('visibility', 'hidden')
        // tooltip.hide();
      })
      .on('mousemove', (d, i, nodes) => {
        console.log(11)

        const tipX = mouse(nodes[i])[0] + margin.left + 10
        const tipY = mouse(nodes[i])[1] + margin.top + 10

        const labelXs = this.data.labels.map(
          label => this.xScale(label) + margin.left
        )
        const mouseLableDistances = labelXs.map(labelX =>
          Math.abs(labelX - mouse(nodes[i])[0] - margin.left)
        )
        const mostNearLabelIndex = mouseLableDistances.indexOf(
          Math.min(...mouseLableDistances)
        )

        verticalLine
          .attr('x1', this.xScale(this.data.labels[mostNearLabelIndex]))
          .attr('x2', this.xScale(this.data.labels[mostNearLabelIndex]))

        this.data.datasets.forEach((dataset, j) => {
          circles[j]
            .style('visibility', 'visible')
            .attr('cx', this.xScale(this.data.labels[mostNearLabelIndex]))
            .attr('cy', this.yScale(dataset.data[mostNearLabelIndex]))
        })
        const tooltipItems = this.data.datasets.map((dataset, j) => ({
          color: this.options.dataColors[i]
            ? this.options.dataColors[j]
            : colors[j],
          text: `${this.data.datasets[j].label || ''}: ${
            this.data.datasets[j].data[mostNearLabelIndex]
          }`
        }))

        let tooltipPositionType = config.positionType.downRight
        if (tipX > this.width / 2 && tipY < this.height / 2) {
          tooltipPositionType = config.positionType.downLeft
        } else if (tipX > this.width / 2 && tipY > this.height / 2) {
          tooltipPositionType = config.positionType.upLeft
        } else if (tipX < this.width / 2 && tipY > this.height / 2) {
          tooltipPositionType = config.positionType.upRight
        }

        // tooltip.update({
        //   title: this.data.labels[mostNearLabelIndex],
        //   items: tooltipItems,
        //   position: {
        //     x: tipX,
        //     y: tipY,
        //     type: tooltipPositionType
        //   }
        // });
      })

    // Legend
    const legendItems = this.data.datasets.map((dataset, i) => ({
      color: this.options.dataColors[i]
        ? this.options.dataColors[i]
        : colors[i],
      text: dataset.label
    }))

    addLegend(select(graphPart), {
      items: legendItems,
      position: this.options.legendPosition,
      unxkcdify: this.options.unxkcdify,
      parentWidth: this.width,
      parentHeight: this.height
    })
  },
  components: { Tooltip }
}
</script>
