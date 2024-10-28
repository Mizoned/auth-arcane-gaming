import axios, { type AxiosResponse } from 'axios';
import type { Country } from '../types';

export const getCountriesByFile = async (): Promise<
  AxiosResponse<Country[]>
> => {
  return await axios.get('/data/countries/data.json');
};
