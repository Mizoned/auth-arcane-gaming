import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';
import type { Steps } from '../types';
import type { Country } from '@/entities/countries';
import { type Channel, useChannelsStore } from '@/entities/channels';
import { checkSession, createSession, sendSession } from '../api';

export const useAuthStore = defineStore('AuthStore', () => {
  const channelsStore = useChannelsStore();
  const mobilePhone = ref<string>('');
  const selectedCountry = ref<Country | null>(null);
  const selectedChannel = ref<Channel | null>(null);
  const code = ref<string>('');
  const timer = ref<number>(0);
  const steps: Steps[] = ['phone', 'code', 'channel'];
  const currentStep = ref<number>(0);
  const currentStepName = computed<Steps>(() => steps[currentStep.value]);
  const isCreateSessionLoading = ref<boolean>(false);
  const isCheckSessionCodeLoading = ref<boolean>(false);
  const isResendCodeLoading = ref<boolean>(false);
  const isCheckSubscribeStatusLoading = ref<boolean>(false);
  const sessionId = ref<string | null>(null);
  const sessionExpiredAt = ref<Date | null>(null);

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

  const createSessionToReceiveCode = async () => {
    try {
      isCreateSessionLoading.value = true;
      const type = selectedChannel.value?.type ?? null;
      const { data } = await createSession(mobilePhone.value, type, true);

      sessionId.value = data.session_id;
      sessionExpiredAt.value = new Date(data.session_expired_at);
      channelsStore.channels = data.channels;

      const targetChannel: Channel | undefined = data.sent_to !== 'none'
        ? channelsStore.channels.find((channel: Channel) => channel.type === data.sent_to)
        : selectedChannel.value
          ? channelsStore.channels.find((channel: Channel) => channel.type === selectedChannel.value?.type)
          : channelsStore.channels.find((channel: Channel) => channel.timeout > 0);

      if (targetChannel) {
        selectedChannel.value = targetChannel;
        timer.value = targetChannel.timeout;
      }
    } catch (error) {
      throw error;
    } finally {
      isCreateSessionLoading.value = false;
    }
  }

  const resendCode = async () => {
    try {
      if (sessionId.value === null || selectedChannel.value === null) return;
      isResendCodeLoading.value = true;

      if (sessionExpiredAt.value && sessionExpiredAt.value <= new Date()) {
        await createSessionToReceiveCode();
      } else {
        const { data } = await sendSession(sessionId.value, selectedChannel.value.type);

        timer.value = data.channel.timeout;
      }
    } catch (error) {
      throw error;
    } finally {
      isResendCodeLoading.value = false;
    }
  }

  const checkSessionCode = async () => {
    try {
      isCheckSessionCodeLoading.value = true;
      if (sessionId.value === null || !code.value.length) return;
      const { data } = await checkSession(sessionId.value, code.value);
      console.log(data.verify_token);
    } catch (error) {
      throw error;
    } finally {
      isCheckSessionCodeLoading.value = false;
    }
  }

  const checkSubscribeStatus = async () => {
    try {
      isCheckSubscribeStatusLoading.value = true;
      await resendCode();

      if (selectedChannel.value?.is_active) {
        prevStep();
      }
    } catch (error) {
      throw error;
    } finally {
      isCheckSubscribeStatusLoading.value = false;
    }
  }

  watch(selectedChannel, (newValue: Channel | null) => {
    if (newValue && !newValue.is_active) {
      setStep(1);
    }
  });

  return {
    mobilePhone,
    code,
    timer,
    selectedCountry,
    selectedChannel,
    currentStepName,
    nextStep,
    prevStep,
    setStep,
    createSessionToReceiveCode,
    resendCode,
    checkSessionCode,
    checkSubscribeStatus
  };
});
