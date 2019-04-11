<template lang="html">
  <svg viewBox="0 0 48 48" class="radio-input-icon" :style="{backgroundColor: color}">
    <circle class="circle" cx="24" cy="24" r="12" fill="white" />
    <circle :class="{'selected': isSelected}" cx="24" cy="24" r="9" fill="none" />
  </svg>
</template>

<script>
export default {
  props: {
    color: {
      type: String
    },
    isSelected: {
      type: Boolean
    }
  }
}
</script>

<style lang="css" scoped>
  .radio-input-icon {
    width: calc(var(--baseline) * 3 - 1px);
    height: calc(var(--baseline) * 3 - 1px);
    display: inline-block;
    margin-right: var(--baseline);
    border-right: 2px solid var(--border-color);
  }

  .radio-input-icon .circle{
    stroke-width: 2px;
    stroke: var(--border-color);
  }

  .radio-input-icon .selected {
    fill: var(--border-color);
  }
</style>
