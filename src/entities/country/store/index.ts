import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Country } from '../types';
import { getCountriesByFile } from '../api';

const useCountryStore = defineStore('CountryStore', () => {
  const isLoading = ref<boolean>(false);
  const countries = ref<Country[]>([]);

  const getCountries = async () => {
    try {
      isLoading.value = true;
      const response = await getCountriesByFile();
      countries.value = response.data;
    } catch (error) {
      throw error;
    } finally {
      isLoading.value = false;
    }
  }

  return {
    getCountries,
    isLoading,
    countries
  };
});

export default useCountryStore;
