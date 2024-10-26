<script setup lang="ts">
enum IconColor {
  blue = 'blue',
  grey = 'grey'
}

interface IconArrowProps {
  color: IconColor;
}

withDefaults(defineProps<IconArrowProps>(), {
  color: IconColor.blue
});
</script>

<template>
  <svg
    :class="['icon-arrow', `icon-arrow--${color}`]"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.1885 3.31016L2.33203 11.1852C2.11999 11.3976 2 11.692 2 11.9999C2 12.3079 2.11999 12.6018 2.33203 12.8146L10.1885 20.6897C10.6168 21.1174 11.2947 21.1013 11.7036 20.6516C12.1123 20.2063 12.0969 19.4914 11.6673 19.0607L5.74368 13.1262H20.9282C21.5197 13.1262 22 12.6218 22 12.0007C22 11.3796 21.5197 10.8762 20.9282 10.8762H5.74647L11.6701 4.94178C12.0991 4.51017 12.1124 3.79532 11.7062 3.3486C11.2956 2.8986 10.6572 2.88266 10.1885 3.31016Z"
      fill="currentColor"
    />
  </svg>
</template>

<style scoped lang="scss">
.icon-arrow {
  width: 100%;
  height: 100%;
}

.icon-arrow.icon-arrow--blue {
  color: var(--ag-blue-color);
}

.icon-arrow.icon-arrow--grey {
  color: var(v--ag-light-grey-color);
}
</style>
