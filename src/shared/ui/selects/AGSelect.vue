<script setup lang="ts" generic="T">
import { computed, ref, watch } from 'vue';
import IconChevron from '@/shared/ui/icons/IconChevron.vue';
import InputSearch from '@/shared/ui/inputs/InputSearch.vue';

type AGSelectOptionBase = {
  name: string;
};

type AGSelectOption<T> = T & AGSelectOptionBase;

interface AGSelectProps {
  modelValue: AGSelectOption<T> | null;
  options: AGSelectOption<T>[];
  fluid?: boolean;
  useSearch?: boolean;
  invalid?: boolean;
}

const props = defineProps<AGSelectProps>();

const emits = defineEmits<{
  (e: 'update:modelValue', value: AGSelectOption<T>): void;
  (e: 'close'): void;
}>();

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

const toggleHandler = () => {
  isOpen.value = !isOpen.value;
  search.value = '';
};

watch(isOpen, (newValue: boolean) => {
  if (!newValue) {
    emits('close');
  }
});

const selectHandler = (option: AGSelectOption<T>) => {
  selectedOption.value = option;
  emits('update:modelValue', option);
  toggleHandler();
};

const selectedOption = ref<AGSelectOption<T> | null>(props.modelValue);

const selectedOptionName = computed<string>(() => {
  return selectedOption.value !== null ? selectedOption.value.name : '';
});
</script>

<template>
  <div
    :class="[
      'ag-select',
      { 'is-fluid': fluid },
      { 'is-open': isOpen },
      { 'use-search': useSearch },
      { 'is-selected': selectedOptionName.length },
      { 'is-invalid': invalid }
    ]"
    v-click-outside="() => (isOpen = false)"
  >
    <div class="ag-select__input" @click="toggleHandler">
      <span class="ag-select__label">{{ selectedOptionName }}</span>
      <div class="ag-select__icon">
        <IconChevron />
      </div>
    </div>
    <div class="ag-select__dropdown">
      <div v-if="useSearch" class="ag-select__search">
        <InputSearch v-model="search" placeholder="Поиск" fluid />
      </div>
      <div class="ag-select__dropdown-list">
        <template v-if="searchedOptions.length">
          <div
            :class="[
              'ag-select__dropdown-list-item',
              { 'is-selected': option.name === selectedOptionName }
            ]"
            @click="selectHandler(option)"
            v-for="option in searchedOptions"
            :key="option.name"
          >
            <slot name="option" :data="option" />
          </div>
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
  border: 1px solid var(--ag-champagne-color);
  line-height: 1.5rem;
  row-gap: 0.5rem;
  border-radius: var(--ag-border-radius);

  &__input {
    display: flex;
    width: 100%;
    padding: calc(1rem - 1px);
  }

  &__label {
    display: inline-block;
    padding-right: 1rem;
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
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

  &__dropdown-list-item {
    &.is-selected {
      background-color: var(--ag-snow-white-color);
    }
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

  &.is-invalid {
    border-color: var(--ag-red-color);
  }
}
</style>
