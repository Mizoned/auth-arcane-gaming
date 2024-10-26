<script setup lang="ts">
interface AGSelectLanguageProps {
  options: {
    name: string;
    value: string;
  }[];
}

const modelValue = defineModel();

defineProps<AGSelectLanguageProps>();
</script>

<template>
  <div class="ag-select-language">
    <select
      name="language"
      v-model="modelValue"
    >
      <option
        v-for="{ value, name } in options"
        :key="value"
        :value="value"
      >
        {{ name }}
      </option>
    </select>
  </div>
</template>

<style scoped lang="scss">
.ag-select-language {
  position: relative;
  font-size: var(--ag-font-size-s);
  line-height: 1.5rem;

  select {
    width: 100%;
    color: var(--ag-dark-grey-color);
    font-size: var(--ag-font-size-s);
    border: none;
    outline: none;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    padding-right: 1rem;
  }

  &:after {
    content: '▼';
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: var(--ag-light-grey-color);
  }
}
</style>
