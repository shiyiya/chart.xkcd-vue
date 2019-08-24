# chart.xkcd-vue

[chart.xkcd-vue's documentation](https://shiyiya.github.io/chart.xkcd-vue/)

[chart.xkcd](https://timqian.com/chart.xkcd/) component for Vue.

## what's chart.xkcd?

[![](https://raw.githubusercontent.com/timqian/images/master/20190819131226.gif)](https://timqian.com/chart.xkcd/)

Chart.xkcd is a chart library plots “sketchy”, “cartoony” or “hand-drawn” styled charts.

Check out the [documentation](https://timqian.com/chart.xkcd/) for more instructions and links, or try out the [examples](./examples), or chat with us in [Slack](https://join.slack.com/t/t9tio/shared_invite/enQtNjgzMzkwMDM0NTE3LTE5ZTUzYjU4Y2I0YzRiZjNkYTkzMzE1ZmM0NDdmYzRlZmMxNGY1MzZlN2EwYjYyNWVlMWY0Nzk2MDBhNWZlY2I)

## Requirements

- Vue >= 2.0.0
- chart.xkcd >= 1.0.7

## Installation

```bash
npm i -S chart.xkcd-vue
```

## Usage

### Auto register components

You can simply import it and use it.
**All components will be prefixed with `chartxkcd-`**

```js
import Vue from 'vue'
import chartXkcdVue from 'chart.xkcd-vue'

// ↓↓↓ will auto register all chart.xkcd component.
// ↓↓↓ eg: chartxkcd-line: 'Line', chartxkcd-bar: 'Pie', chartxkcd-pie: 'Bar' ...
Vue.use(chartXkcdVue)
```

When chart.xkcd-vue is included by `<script>`, it will be installed automatically if `window.Vue` and `window.chartXkcd` exists, ohterwise you should to install it manually by calling `Vue.use(window.chartXkcdVue['default']);`.

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
    return createElement('chartxkcd-line')
  }
}
```

### Manual registration of individual components

```bash
npm i -S chart.xkcd
```

**All components need to be prefixed with `chartxkcd-`**

```js
import Vue from 'vue'
import chartXkcd from 'chart.xkcd'
import { genComponent } from 'chart.xkcd-vue'

// register -> { componentTag: chartxkcd-line, value: chartXkcd.Line }
Vue.component('chartxkcd-line', genComponent(chartXkcd, 'chartxkcd-line'))
Vue.component('chartxkcd-pie', genComponent(chartXkcd, 'chartxkcd-pie'))
```
