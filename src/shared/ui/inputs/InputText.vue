<script setup lang="ts">
interface InputTextProps {
  modelValue?: string;
  fluid?: boolean;
  invalid?: boolean;
  disabled?: boolean;
  type?: string;
}

withDefaults(defineProps<InputTextProps>(), {
  type: 'text'
});

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
      { 'input-text--disabled': disabled },
      { 'is-invalid': invalid }
    ]"
    :type="type"
    :value="modelValue"
    @input="inputHandler"
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

.input-text.input-text--disabled {
  background-color: var(--ag-snow-white-color);
  pointer-events: none;
}
</style>
