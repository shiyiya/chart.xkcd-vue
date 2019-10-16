<template>
  <text
    x="50%"
    y="30"
    text-anchor="middle"
    style="font-size: 20px; font-weight: bold;"
    >{{ title }}</text
  >
</template>

<script>
export default {
  name: 'Title',
  props: {
    title: {
      type: String
    }
  }
}
</script>
