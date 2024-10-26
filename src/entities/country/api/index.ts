import axios, { type AxiosResponse } from 'axios';
import type { Country } from '@/entities/country/types';

export const getCountries = async (): Promise<Country[]> => {
  const { data: countries }: AxiosResponse<Country[]> = await axios.get(
    '/data/countries/data.json'
  );
  return countries;
};
