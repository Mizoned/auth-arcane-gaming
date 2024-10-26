<template>
<div :class="[
  'ag-select-dropdown',
  { 'ag-select-dropdown--search': $slots['search'] }
]">
  <div v-if="$slots['search']" class="ag-select-dropdown__search">
    <slot name="search" />
  </div>
  <div class="ag-select-dropdown__list">
    <slot />
  </div>
</div>
</template>

<style scoped lang="scss">
.ag-select-dropdown {
  display: flex;
  flex-direction: column;
  max-height: 20rem;

  &__list {
    overflow-y: auto;
    padding: 0.5rem 0;
  }
}

.ag-select-dropdown.ag-select-dropdown--search {
  .ag-select-dropdown__list {
    padding-top: 0;
  }
}
</style>
