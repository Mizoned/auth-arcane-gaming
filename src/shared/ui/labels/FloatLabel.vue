<template>
  <div class="float-label">
    <slot />
  </div>
</template>

<style lang="scss">
.float-label {
  position: relative;

  label {
    position: absolute;
    pointer-events: none;
    top: 50%;
    left: 1rem;
    transform: translateY(-50%);
    color: var(--ag-light-grey-color);
    line-height: 1.5rem;
    transition: all ease 0.2s;
  }

  &:has(input:focus) label,
  &:has(input.is-filled) label {
    top: 0;
    background-color: var(--ag-white-color);
    padding: 0.188rem;
    font-size: var(--ag-font-size-s);
  }
}
</style>
