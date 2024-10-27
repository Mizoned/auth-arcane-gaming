import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { Steps } from '../types';
import type { Country } from '@/entities/countries';
import type { Channel } from '@/entities/channels';

export const useAuthStore = defineStore('AuthStore', () => {
  const mobilePhone = ref<string>('');
  const selectedCountry = ref<Country | null>(null);
  const selectedChannel = ref<Channel | null>(null);
  const code = ref<string>('');
  const timer = ref<number>(0);
  const steps: Steps[] = ['phone', 'code', 'channel'];
  const currentStep = ref<number>(0);
  const currentStepName = computed<Steps>(() => steps[currentStep.value]);

  const nextStep = (): void => {
    if (currentStep.value < steps.length - 1) {
      currentStep.value++;
    }
  };

  const setStep = (value: number): void => {
    if (value >= 0 && value < steps.length) {
      currentStep.value = value;
    }
  };

  const prevStep = (): void => {
    if (currentStep.value > 0) {
      currentStep.value--;
    }
  };
  return {
    mobilePhone,
    code,
    timer,
    selectedCountry,
    selectedChannel,
    currentStepName,
    nextStep,
    prevStep,
    setStep
  };
});
