<script setup lang="ts">
import IconArrow from '@/shared/ui/icons/IconArrow.vue';
import AGButton from '@/shared/ui/buttons/AGButton.vue';
import { useAuthStore } from '@/entities/auth';

const authStore = useAuthStore();

const checkStatus = async () => {
  await authStore.checkSubscribeStatus();
}
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
      <AGButton label="Авторизоваться в боте" :to="authStore.selectedChannel?.link" target="_blank" />
      <AGButton label="Проверить статус" text @click="checkStatus" />
    </div>
  </div>
</template>
