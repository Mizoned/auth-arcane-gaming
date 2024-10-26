<script setup lang="ts">
import IconMagnifyingGlass from '@/shared/ui/icons/IconMagnifyingGlass.vue';
import IconCircleClose from '@/shared/ui/icons/IconCircleClose.vue';

const modelValue = defineModel<string>();

interface InputSearchProps {
  fluid?: boolean;
  placeholder?: string;
}

defineProps<InputSearchProps>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const clearHandler = () => {
  emit('update:modelValue', '');
}
</script>

<template>
  <div :class="[
    'input-search',
    { 'input-search--fluid': fluid }
  ]">
    <div class="input-search__icon input-search__search">
      <IconMagnifyingGlass />
    </div>
    <input
      v-model="modelValue"
      :placeholder="placeholder"
      class="input-search__input"
      type="text"
    >
    <div
      v-if="modelValue?.length"
      class="input-search__icon input-search__clear"
      @click="clearHandler"
    >
      <IconCircleClose />
    </div>
  </div>
</template>

<style scoped lang="scss">
.input-search {
  display: flex;
  position: relative;

  &__search {
    left: 0.625rem;
    width: 1.25rem;
    height: 1.25rem;
    color: var(--ag-light-grey-color);
  }

  &__icon {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 50%;
    transform: translateY(-50%);
  }

  &__input {
    border-radius: calc(var(--ag-border-radius) * 2);
    padding: 0.563rem 0.625rem 0.563rem 2.125rem;
    font-size: var(--ag-font-size-sm);
    font-family: var(--ag-font-family-sf-pro-display);
    background-color: var(--ag-snow-white-color);
    border: none;
    outline: none;
  }

  &__clear {
    cursor: pointer;
    right: 0.625rem;
    width: 0.875rem;
    height: 0.875rem;
    color: var(--ag-steel-grey);
  }
}

.input-search.input-search--fluid {
  width: 100%;

  input {
    width: 100%;
  }
}
</style>
