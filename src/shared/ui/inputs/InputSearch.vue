<script setup lang="ts">

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
      <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.2725 17.085L13.3457 13.1592C14.1955 12.1191 14.6644 10.8096 14.6644 9.37988C14.6644 6.01367 11.9353 3.28613 8.56902 3.28613C5.20278 3.28613 2.5 6.01455 2.5 9.37988C2.5 12.7452 5.22886 15.4736 8.56902 15.4736C9.9988 15.4736 11.3105 14.9782 12.3493 14.1541L16.2762 18.0799C16.4403 18.2188 16.622 18.2861 16.8007 18.2861C16.9795 18.2861 17.1606 18.2175 17.298 18.0801C17.5714 17.8057 17.5714 17.3604 17.2725 17.085ZM3.90663 9.37988C3.90663 6.79531 6.01013 4.69238 8.59539 4.69238C11.1807 4.69238 13.2842 6.79531 13.2842 9.37988C13.2842 11.9645 11.1807 14.0674 8.59539 14.0674C6.01013 14.0674 3.90663 11.9639 3.90663 9.37988Z" fill="var(--ag-light-grey-color)"/>
      </svg>
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
      <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.99984 1.95288C10.2215 1.95288 12.8332 4.56455 12.8332 7.78621C12.8332 11.0079 10.2215 13.6195 6.99984 13.6195C3.77818 13.6195 1.1665 11.0079 1.1665 7.78621C1.1665 4.56455 3.77818 1.95288 6.99984 1.95288ZM8.79774 5.05929L6.99984 6.85799L5.20295 5.05929C4.94667 4.80301 4.53116 4.80301 4.27487 5.05929C4.01859 5.31558 4.01859 5.73109 4.27487 5.98737L6.07234 7.78694L4.27487 9.58725C4.01859 9.84353 4.01859 10.259 4.27487 10.5153C4.53116 10.7716 4.94667 10.7716 5.20295 10.5153L6.99984 8.7159L8.79774 10.5153C9.05402 10.7716 9.46954 10.7716 9.72582 10.5153C9.9821 10.259 9.9821 9.84353 9.72582 9.58725L7.92734 7.78694L9.72582 5.98737C9.9821 5.73109 9.9821 5.31558 9.72582 5.05929C9.46954 4.80301 9.05402 4.80301 8.79774 5.05929Z" fill="#818E95"/>
      </svg>
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
  }
}

.input-search.input-search--fluid {
  width: 100%;

  input {
    width: 100%;
  }
}
</style>
