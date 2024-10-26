<script setup lang="ts">
interface AGSelectItemProps {
  name: string;
  desc?: string;
}

defineProps<AGSelectItemProps>();
</script>

<template>
  <div class="ag-select-item">
    <div v-if="$slots['icon']" class="ag-select-item__icon">
      <slot name="icon" />
    </div>
    <div class="ag-select-item__name">{{ name }}</div>
    <div v-if="desc" class="ag-select-item__desc">{{ desc }}</div>
  </div>
</template>

<style scoped lang="scss">
.ag-select-item {
  display: flex;
  align-items: center;
  column-gap: 0.625rem;
  padding: 0.75rem 1rem;
  font-family: var(--ag-font-family-sf-pro-display);
  cursor: pointer;

  &__icon {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
  }

  &__name {
    flex: 1 1 auto;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__desc {
    font-weight: var(--ag-font-weight-bold);
  }
}
</style>
