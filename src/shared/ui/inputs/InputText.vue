<script setup lang="ts">
interface InputTextProps {
  modelValue?: string;
  fluid?: boolean;
  invalid?: boolean;
}

defineProps<InputTextProps>();
const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const inputHandler = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emits('update:modelValue', target.value as string);
};
</script>

<template>
  <input
    :class="[
      'input-text',
      { 'is-filled': modelValue?.length },
      { 'input-text--fluid': fluid },
      { 'is-invalid': invalid }
    ]"
    :value="modelValue"
    @input="inputHandler"
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

  &.is-invalid {
    border-color: var(--ag-red-color);
  }
}

.input-text.input-text--fluid {
  width: 100%;
}
</style>
