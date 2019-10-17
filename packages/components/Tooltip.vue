<template>
  <svg
    id="Tooltip"
    ref="Tooltip"
    :x="_getUpLeftX"
    :y="_getUpLeftY"
    :style="
      `visibility: ${show ? 'visible' : 'hidden'};'pointer-events': 'none';`
    "
  >
    <rect
      fill-opacity="0.85"
      stroke="#aaa"
      stroke-width="2"
      rx="5"
      ry="5"
      :filter="filter"
      :width="_getBackgroundWidth"
      :height="_getBackgroundHeight"
      x="5"
      y="5"
      style="fill: white;"
    />
    <text x="15" y="25" style="font-size: 15px; font-weight: bold;">
      {{ title }}
    </text>
    <g v-for="(item, i) in items" :key="i">
      <rect
        width="8"
        height="8"
        rx="2"
        ry="2"
        :filter="filter"
        x="15"
        y="37"
        :style="`fill: ${item.color};`"
      />
      <text x="27" y="45" style="font-size: 15px;">{{ item.text }}</text>
    </g>
  </svg>
</template>

<script>
import config from '../config'

export default {
  name: 'Tooltip',
  props: {
    show: { type: Boolean, default: () => false },
    title: { type: String, default: () => '' },
    items: { type: Array, default: () => [] },
    position: { type: Object, default: () => ({ type: 2, x: 30, y: 30 }) },
    unxkcdify: { type: Boolean, default: () => false }
  },

  computed: {
    filter() {
      return !this.unxkcdify ? 'url(#xkcdify)' : null
    },
    _getUpLeftX() {
      if (
        this.position.type === config.positionType.upRight ||
        this.position.type === config.positionType.downRight
      ) {
        return this.position.x
      }
      return this.position.x - this._getBackgroundWidth - 20
    },
    _getUpLeftY() {
      if (
        this.position.type === config.positionType.downLeft ||
        this.position.type === config.positionType.downRight
      ) {
        return this.position.y
      }
      return this.position.y - this._getBackgroundHeight - 20
    },
    _getBackgroundWidth() {
      const maxItemLength = this.items.reduce(
        (pre, cur) => (pre > cur.text.length ? pre : cur.text.length),
        0
      )
      const maxLength = Math.max(maxItemLength, this.title.length)

      return maxLength * 7.4 + 25
    },
    _getBackgroundHeight() {
      const rows = this.items.length + 1
      return rows * 20 + 10
    }
  }
}
</script>
