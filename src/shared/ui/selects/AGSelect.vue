<script setup lang="ts" generic="T">
import { computed, ref } from 'vue';
import IconChevron from '@/shared/ui/icons/IconChevron.vue';
import InputSearch from '@/shared/ui/inputs/InputSearch.vue';

type AGSelectOptionBase = {
  name: string;
};

type AGSelectOption<T> = T & AGSelectOptionBase;

interface AGSelectProps {
  options: AGSelectOption<T>[];
  fluid?: boolean;
  useSearch?: boolean;
}

const props = defineProps<AGSelectProps>();

const isOpen = ref<boolean>(false);
const search = ref<string>('');

defineSlots<{
  option(props: { data: AGSelectOption<T> }): void;
}>();

const searchedOptions = computed<AGSelectOption<T>[]>(() => {
  const query = search.value.toLowerCase();
  return [...props.options].filter(option =>
    option.name.toLowerCase().includes(query)
  );
});
</script>

<template>
  <div
    :class="[
      'ag-select',
      { 'is-fluid': fluid },
      { 'is-open': isOpen },
      { 'use-search': useSearch }
    ]"
    @click="() => (isOpen = true)"
    v-click-outside="() => (isOpen = false)"
  >
    <span class="ag-select__label"></span>
    <div class="ag-select__icon">
      <IconChevron />
    </div>
    <div class="ag-select__dropdown">
      <div v-if="useSearch" class="ag-select__search">
        <InputSearch v-model="search" placeholder="Поиск" fluid />
      </div>
      <div class="ag-select__dropdown-list">
        <template v-if="searchedOptions.length">
          <template v-for="option in searchedOptions" :key="option.name">
            <slot name="option" :data="option" />
          </template>
        </template>
        <div v-else class="ag-select__dropdown-list-empty">
          Ничего не найдено
        </div>
      </div>
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
    color: var(--ag-light-grey-color);

    svg {
      width: 100%;
      height: 100%;
    }
  }

  &__search {
    padding: 1rem;
  }

  &__dropdown {
    position: absolute;
    display: none;
    flex-direction: column;
    max-height: 20rem;
    overflow: hidden;
    z-index: 3;
    top: calc(100% + 0.25rem);
    left: 0;
    width: 100%;
    background-color: var(--ag-white-color);
    box-shadow: var(--ag-box-shadow);
    border-radius: 0 0 var(--ag-border-radius) var(--ag-border-radius);
  }

  &__dropdown-list {
    overflow-y: auto;
    padding: 0.5rem 0;
    height: 100%;
  }

  &__dropdown-list-empty {
    padding: 0.75rem 1rem;
    font-family: var(--ag-font-family-sf-pro-display);
    text-align: center;
    color: var(--ag-light-grey-color);
  }

  &.is-fluid {
    width: 100%;
  }

  &.is-open {
    #{$root}__dropdown {
      display: flex;
    }
  }

  &.use-search {
    #{$root}__dropdown-list {
      padding-top: 0;
    }
  }
}
</style>
