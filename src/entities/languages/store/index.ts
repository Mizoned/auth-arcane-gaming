import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { Language, LanguageType, Localization, Localizations } from '../types';
import { ru, en } from '../locales';

export const useLanguagesStore = defineStore('LanguagesStore', () => {
  const isLoading = ref<boolean>(false);
  const languages = ref<Language[]>([
    { name: 'Русский', value: 'ru' },
    { name: 'English', value: 'en' }
  ]);
  const localizations: Localizations = { ru, en };

  const selectedLanguage = ref<LanguageType>(languages.value[0].value);

  const currentLocale = computed<Localization>(() => {
    return localizations[selectedLanguage.value];
  });

  return {
    isLoading,
    languages,
    selectedLanguage,
    localizations,
    currentLocale
  };
});
