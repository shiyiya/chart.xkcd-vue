export default {
  beforeMount() {
    if (this.title) {
      this.margin.top = 60
    }
    if (this.xLabel) {
      this.margin.bottom = 50
    }
    if (this.yLabel) {
      this.margin.left = 70
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
  },
  watch: {
    title() {
      if (this.title) {
        this.margin.top = 60
      } else {
        this.margin.top = 50
      }
    },
    xLabel() {
      if (this.xLabel) {
        this.margin.bottom = 50
      }
    },
    yLabel() {
      console.log(this.margin)
      if (this.yLabel) {
        this.margin.left = 70
      } else {
        this.margin.left = 50
      }
    }
  }
}
