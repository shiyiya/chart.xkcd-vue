# chart.xkcd-vue

[![](https://raw.githubusercontent.com/timqian/images/master/20190819131226.gif)](https://shiyiya.github.io/chart.xkcd-vue/)

[chart.xkcd](https://timqian.com/chart.xkcd/) component for Vue.

Read the [documentation](https://shiyiya.github.io/chart.xkcd-vue/) for more information.

[Github](https://github.com/shiyiya/chart.xkcd-vue) | [documentation](https://shiyiya.github.io/chart.xkcd-vue/)

## what's chart.xkcd?

Chart.xkcd is a chart library plots “sketchy”, “cartoony” or “hand-drawn” styled charts. Check out the Check out the [documentation](https://timqian.com/chart.xkcd/) for more instructions and links.

## Requirements

- Vue >= 2.0.0
- chart.xkcd >= 1.0.8

## Installation

**You must install chart.xkcd at first.**

```shell
 npm i -S chart.xkcd
```

## ① Install from NPM

```shell
 npm i -S chart.xkcd-vue
```

## ② Install from `<script>`

When chart.xkcd-vue is included by `<script>`, it will be installed automatically if `window.Vue` and `window.chartXkcd` exists, ohterwise you should to install it manually by calling `Vue.use(window.chartXkcdVue["default");`

# Use

Before you use it, you need to register components.
There are **two ways** to register components

## ① Register all components

Register components at the main entry.
**All must be prefixed with `chartxkcd-`**

```js
import Vue from 'vue'
import chartXkcdVue from 'chart.xkcd-vue'

// ↓↓↓ will auto register all chart.xkcd component.
Vue.use(chartXkcdVue)
```

## ② Register a single component

Register components at the main entry.

```js
import Vue from 'vue'
import chartXkcd from 'chart.xkcd'
import { chartXKCDLine } from 'chart.xkcd-vue'
Vue.component('chartxkcd-line', chartXKCDLine)
```

## Using components in templates

If you register a component at the entrance, you can use it as follows

```html
<template>
  <chartxkcd-line :config="config"></chartxkcd-line>
</template>

<script>
  import { chartXKCDLine } from 'chart.xkcd-vue'

  export default {
    name: 'app',
    data() {
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
    components: {
      'chartxkcd-line': chartXKCDLine
    }
  }
</script>
```
