<template>
  <small class="input-text-error">
    <slot />
  </small>
</template>

<style scoped lang="scss">
.input-text-error {
  padding: 0.25rem 1rem 0 1rem;
  font-size: var(--ag-font-size-s);
  color: var(--ag-red-color);
}
</style>
