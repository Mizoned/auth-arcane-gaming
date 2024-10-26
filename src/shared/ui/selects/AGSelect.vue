<script setup lang="ts">
import { ref } from 'vue';

interface AGSelectProps {
  // options: [];
  // optionLabel: string;
  fluid?: boolean
}

defineProps<AGSelectProps>();

const isOpen = ref<boolean>(false);

const toggleHandler = (value: boolean) => {
  console.log('test', value);
  isOpen.value = value;
}
</script>

<template>
  <div
    :class="[
      'ag-select',
      { 'is-fluid': fluid },
      { 'is-open': isOpen }
    ]"
    @click="toggleHandler(true)"
  >
    <span class="ag-select__label"></span>
    <div class="ag-select__icon">
      <svg
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21.5739 9.62504L12.9374 17.1128C12.6761 17.3849 12.3352 17.5 11.9999 17.5C11.6647 17.5 11.3249 17.3855 11.0624 17.1566L2.42596 9.66889C1.87908 9.19142 1.85607 8.39686 2.37269 7.89349C2.89117 7.38656 3.75794 7.36866 4.30112 7.84443L12.0001 14.563L19.699 7.84443C20.2423 7.36858 21.1053 7.38659 21.6274 7.89349C22.1438 8.3483 22.1211 9.14364 21.5739 9.62504Z"
          fill="var( --ag-light-grey-color)"
        />
      </svg>
    </div>
    <div class="ag-select__dropdown">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.ag-select {
  $root: #{&};
  display: inline-flex;
  position: relative;
  user-select: none;
  padding: calc(1rem - 1px);
  border: 1px solid var(--ag-champagne-color);
  line-height: 1.5rem;
  row-gap: 0.5rem;
  border-radius: var(--ag-border-radius);

  &__label {
    display: block;
    white-space: nowrap;
    flex: 1 1 auto;
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 1.5rem;
    height: 1.5rem;

    svg {
      width: 100%;
      height: 100%;
    }
  }

  &__dropdown {
    position: absolute;
    display: none;
    z-index: 3;
    top: calc(100% + 0.25rem);
    left: 0;
    width: 100%;
    background-color: var(--ag-white-color);
    box-shadow: var(--ag-box-shadow);
    border-radius: 0 0 var(--ag-border-radius) var(--ag-border-radius);
  }

  &.is-fluid {
    width: 100%;
  }

  &.is-open {
    #{$root}__dropdown {
      display: block;
    }
  }
}
</style>
