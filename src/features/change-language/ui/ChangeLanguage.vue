<script setup lang="ts">
import AGSelectLanguage from '@/shared/ui/selects/AGSelectLanguage.vue';
import { useLanguagesStore } from '@/entities/languages';

const languageStore = useLanguagesStore();
</script>

<template>
  <AGSelectLanguage
    v-model="languageStore.selectedLanguage"
    :options="languageStore.languages"
  />
</template>
