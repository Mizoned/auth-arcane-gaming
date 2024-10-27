<script setup lang="ts">
import IconArrow from '@/shared/ui/icons/IconArrow.vue';
import AGButton from '@/shared/ui/buttons/AGButton.vue';
import { useAuthStore } from '@/entities/auth';

const authStore = useAuthStore();
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
      Для использования данного канала связи вам необходимо авторизоваться в
      боте
    </div>
  </div>
  <div class="auth-form__body">
    <div class="auth-form__actions">
      <AGButton label="Авторизоваться в боте" />
      <AGButton label="Проверить статус" text />
    </div>
  </div>
</template>
