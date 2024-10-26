<script setup lang="ts">
import { ref } from 'vue';
import AGSelectDropdown from '@/shared/ui/selects/AGSelectDropdown.vue';
import IconChevron from '@/shared/ui/icons/IconChevron.vue';

interface AGSelectProps {
  fluid?: boolean
}

defineProps<AGSelectProps>();

const isOpen = ref<boolean>(false);
</script>

<template>
  <div
    :class="[
      'ag-select',
      { 'is-fluid': fluid },
      { 'is-open': isOpen }
    ]"
    @click="() => isOpen = true"
    v-click-outside="() => isOpen = false"
  >
    <span class="ag-select__label"></span>
    <div class="ag-select__icon">
      <IconChevron />
    </div>
    <AGSelectDropdown class="ag-select__dropdown">
      <template v-if="$slots['search']" #search>
        <slot name="search" />
      </template>
      <slot />
    </AGSelectDropdown>
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
    color: var(--ag-light-grey-color);

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
