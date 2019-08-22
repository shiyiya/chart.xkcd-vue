# chart.xkcd-vue

chart.xkcd component for Vue.

## Requirements

- Vue >= 2.0.0
- chart.xkcd >= 4.2.0

## Installation

```bash
npm i -S chart.xkcd-vue
```

## Usage

### auto register components

You can simply import it and use it.

```js
import Vue from 'vue'
import ChartXkcdVue from 'chart.xkcd-vue'

// ↓↓↓ will auto register  ChartXkcdLine: 'Line', ChartXkcdBar: 'Pie', ChartXkcdPie: 'Bar'
Vue.use(ChartXkcdVue)
```

When chart.xkcd-vue is included by `<script>`, it will be installed automatically if `window.Vue` and `window.chartXkcd` exists, ohterwise you should to install it manually by calling `Vue.use(window.ChartXkcdVue['default']);`.

```js
{
  name: name,
  data: function () {
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
            {
              label: 'Reality',
              data: [0, 1, 30, 70, 80, 100, 50, 80, 40, 150]
            }
          ]
        }
      }
    }
  },
  render: function (createElement) {
    return createElement('ChartXkcdLine')
  }
}
```

### Manual registration of individual components

```bash
npm i -S chart.xkcd
```

```js
import Vue from 'vue'
import chartXkcd from 'chart.xkcd'
import { genComponent } from 'chart.xkcd-vue'

// register -> { componentTag:ChartXkcdLine, value: chartXkcd.Line }
const ChartXkcdLine = genComponent('ChartXkcdLine', chartXkcd)
Vue.component('ChartXkcdLine', ChartXkcdLine)
```
