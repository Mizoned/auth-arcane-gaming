<script setup lang="ts">
import { ref } from 'vue';
import AGSelectLanguage from '@/shared/ui/selects/AGSelectLanguage.vue';

const languages = ref([
  { name: 'Русский', value: 'ru' },
  { name: 'Английский', value: 'en' }
]);

const selected = ref<string>(languages.value[0].value);

const changeHandler = (e: string) => {
  console.log(e);
};
</script>

<template>
  <AGSelectLanguage
    v-model="selected"
    @update:model-value="changeHandler"
    :options="languages"
  />
</template>
