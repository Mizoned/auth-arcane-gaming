<script setup lang="ts">
interface InputTextProps {
  fluid?: boolean;
  invalid?: boolean;
}

const modelValue = defineModel<string>();

defineProps<InputTextProps>();
</script>

<template>
  <input
    :class="[
      'input-text',
      { 'is-filled': modelValue?.length },
      { 'is-fluid': fluid },
      { 'is-invalid': invalid }
    ]"
    v-model="modelValue"
    type="text"
  />
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

  &.is-invalid {
    border-color: var(--ag-red-color);
  }
}
</style>
