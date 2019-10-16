import select from 'd3-selection/src/select'

const title = {
  mounted() {
    select(this.$refs.svg)
      .append('text')
      .style('font-size', '20')
      .style('font-weight', 'bold')
      .attr('x', '50%')
      .attr('y', 30)
      .attr('text-anchor', 'middle')
      .text(this.title)
  }
}
const xLabel = {
  mounted() {
    select(this.$refs.svg)
      .append('text')
      .style('font-size', 17)
      .attr('x', '50%')
      .attr('y', this.height - 10)
      .attr('text-anchor', 'middle')
      .text(this.xLabel)
  }
}
const yLabel = {
  mounted() {
    select(this.$refs.svg)
      .append('text')
      .attr('text-anchor', 'end')
      .attr('dy', '.75em')
      .attr('transform', 'rotate(-90)')
      .style('font-size', 17)
      .text(this.yLabel)
      .attr('y', 6)
      .call(f => {
        const textLength = f.node().getComputedTextLength()

        f.attr('x', 0 - this.height / 2 + textLength / 2)
      })
  }
}

export default {
  title,
  xLabel,
  yLabel
}
