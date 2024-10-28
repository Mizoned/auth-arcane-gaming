import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';
import type { Language, LanguageType, Localization, Localizations } from '../types';
import { ru, en } from '../locales';

export const useLanguagesStore = defineStore('LanguagesStore', () => {
  const languages: Language[] = [
    { name: 'Русский', value: 'ru' },
    { name: 'English', value: 'en' }
  ];
  const localizations: Localizations = { ru, en };

  const allowedLanguages: LanguageType[] = languages.map(lang => lang.value);
  const localStorageLanguage: string | null = localStorage.getItem('language');

  let installLanguage: LanguageType | null;

  if (localStorageLanguage && allowedLanguages.includes(localStorageLanguage as LanguageType)) {
    installLanguage = localStorageLanguage as LanguageType;
  } else {
    installLanguage = allowedLanguages[0];
  }

  const selectedLanguage = ref<LanguageType>(installLanguage);

  const currentLocale = computed<Localization>(() => {
    return localizations[selectedLanguage.value];
  });

  watch(selectedLanguage, () => {
    localStorage.setItem('language', selectedLanguage.value);
  });

  return {
    languages,
    selectedLanguage,
    localizations,
    currentLocale
  };
});
