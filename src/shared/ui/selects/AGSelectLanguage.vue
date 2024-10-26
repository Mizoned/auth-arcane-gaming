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
    background-position: right -4px top -6px;
    background-size: 1.5rem;
    background-repeat: no-repeat;
    background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6.98438 9.98438H17.0156L12 15L6.98438 9.98438Z' fill='%239E9E9E'/%3E%3C/svg%3E%0A");
  }
}
</style>
