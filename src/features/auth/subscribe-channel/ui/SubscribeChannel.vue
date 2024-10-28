<script setup lang="ts">
import IconArrow from '@/shared/ui/icons/IconArrow.vue';
import AGButton from '@/shared/ui/buttons/AGButton.vue';
import { useAuthStore } from '@/entities/auth';
import { useLanguagesStore } from '@/entities/languages';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const languageStore = useLanguagesStore();
const { currentLocale } = storeToRefs(languageStore);

const checkStatus = async () => {
  await authStore.checkSubscribeStatus();
};
</script>

<template>
  <AGButton
    class="auth-form__back-btn"
    text
    size="sm"
    @click="authStore.prevStep()"
  >
    <template #beforeIcon>
      <IconArrow color="grey" />
    </template>
  </AGButton>
  <div class="auth-form__header">
    <div v-if="authStore.selectedChannel" class="auth-form__channel-icon">
      <img
        :src="authStore.selectedChannel.image_url"
        :alt="authStore.selectedChannel.name"
      />
    </div>
    <div v-if="authStore.selectedChannel" class="auth-form__title">
      {{ authStore.selectedChannel.name }}
    </div>
    <div class="auth-form__description">
      {{ authStore.selectedChannel?.description }}
    </div>
  </div>
  <div class="auth-form__body">
    <div class="auth-form__actions">
      <AGButton
        :label="currentLocale.step2.buttonTextBot"
        :to="authStore.selectedChannel?.link"
        target="_blank"
      />
      <AGButton
        :label="currentLocale.step2.buttonTextCheck"
        text
        @click="checkStatus"
        :loading="authStore.isCheckSubscribeStatusLoading"
      />
    </div>
  </div>
</template>
