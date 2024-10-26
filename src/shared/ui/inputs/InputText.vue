<script setup lang="ts">
interface InputTextProps {
  fluid?: boolean
}

const modelValue = defineModel<string>();

defineProps<InputTextProps>();
</script>

<template>
  <input
    :class="[
      'input-text',
      { 'is-filled': modelValue?.length },
      { 'is-fluid': fluid }
    ]"
    v-model="modelValue"
    type="text"
  >
</template>

<style lang="scss">
.input-text {
  padding: calc(1rem - 1px);
  border: 1px solid var(--ag-champagne-color);
  line-height: 1.5rem;
  border-radius: var(--ag-border-radius);
  outline: none;

  &.is-fluid {
    width: 100%;
  }
}
</style>
