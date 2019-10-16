import { axisBottom, axisLeft } from 'd3-axis/src/axis'
import select from 'd3-selection/src/select'

const Axis = {
  methods: {
    addyAxis() {
      const {
        yScale,
        options: { unxkcdify, tickCount = 3, fontFamily }
      } = this

      select(this.$refs.graphPart)
        .append('g')
        .call(
          axisLeft(yScale)
            .tickSize(1)
            .tickPadding(10)
            .ticks(tickCount, 's')
        )

      select(this.$refs.graphPart)
        .selectAll('.domain')
        .attr('filter', !unxkcdify ? 'url(#xkcdify)' : null)
        .style('stroke', 'black')

      select(this.$refs.graphPart)
        .selectAll('.tick > text')
        .style('font-family', fontFamily)
        .style('font-size', '16')
    },
    addxAxis() {
      const {
        xScale,
        tickCount = 3,
        nheight: moveDown,
        options: { unxkcdify, fontFamily }
      } = this

      select(this.$refs.graphPart)
        .append('g')
        .attr('transform', `translate(0, ${moveDown})`)
        .call(
          axisBottom(xScale)
            .tickSize(0)
            .tickPadding(6)
            .ticks(tickCount)
        )

      select(this.$refs.graphPart)
        .selectAll('.domain')
        .attr('filter', !unxkcdify ? 'url(#xkcdify)' : null)
        .style('stroke', 'black')

      select(this.$refs.graphPart)
        .selectAll('.tick > text')
        .style('font-family', fontFamily)
        .style('font-size', '16')
    }
  }
}

export default Axis
