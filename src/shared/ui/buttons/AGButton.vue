<script setup lang="ts">
interface AGButtonProps {
  label?: string;
  text?: boolean;
  size?: 'sm';
  sizeIcon?: 'sm';
}

withDefaults(defineProps<AGButtonProps>(), {
  text: false
});
</script>

<template>
  <button
    :class="[
      'ag-button',
      { 'ag-button--text': text },
      { [`ag-button--${size}`]: size },
      { [`ag-button-icon--${sizeIcon}`]: sizeIcon }
    ]"
  >
    <span v-if="$slots['beforeIcon']" class="ag-button__icon">
      <slot name="beforeIcon" />
    </span>
    <span v-if="label" class="ag-button__label">{{ label }}</span>
    <span v-if="$slots['afterIcon']" class="ag-button__icon">
      <slot name="beforeIcon" />
    </span>
  </button>
</template>

<style scoped lang="scss">
.ag-button {
  $root: #{&};
  display: inline-flex;
  column-gap: 10px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  color: var(--ag-white-color);
  padding: 0 1rem;
  height: 3.438rem;
  background-color: var(--ag-blue-color);
  border-radius: var(--ag-border-radius);
  border: none;

  &__label {
    font-weight: var(--ag-font-weight-medium);
  }

  &__icon {
    display: inline-flex;
    flex-shrink: 0;
  }
}

.ag-button.ag-button-icon--sm {
  .ag-button__icon {
    height: 1rem;
    width: 1rem;
  }

  svg {
    width: 100%;
    height: 100%;
  }
}

.ag-button.ag-button--sm {
  height: 1.5rem;

  .ag-button__label {
    font-size: var(--ag-font-size-sm);
  }
}

.ag-button.ag-button--text {
  padding: 0;
  background-color: transparent;

  .ag-button__label {
    color: var(--ag-blue-color);
  }
}
</style>
