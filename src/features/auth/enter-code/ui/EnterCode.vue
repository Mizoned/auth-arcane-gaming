<script setup lang="ts">
import { useAuthStore } from '@/entities/auth';
import FloatLabel from '@/shared/ui/labels/FloatLabel.vue';
import InputText from '@/shared/ui/inputs/InputText.vue';
import IconArrow from '@/shared/ui/icons/IconArrow.vue';
import AGButton from '@/shared/ui/buttons/AGButton.vue';
import AGSelect from '@/shared/ui/selects/AGSelect.vue';
import AGSelectItem from '@/shared/ui/selects/AGSelectItem.vue';
import { useChannelsStore } from '@/entities/channels';

const authStore = useAuthStore();
const channelsStore = useChannelsStore();
</script>

<template>
  <div class="auth-form__header">
    <div class="auth-form__title">Введите код</div>
    <div class="auth-form__description">
      Отправлен по номеру <span>{{ authStore.mobilePhone }}</span>
    </div>
  </div>
  <div class="auth-form__body">
    <div class="auth-form__fields">
      <FloatLabel>
        <AGSelect
          v-model="authStore.selectedChannel"
          :options="channelsStore.channels"
          fluid
        >
          <template #option="slotProps">
            <AGSelectItem :name="slotProps.data.name">
              <template #icon>
                <img
                  :src="slotProps.data.image_url"
                  style="width: 1.5rem; height: 1.5rem"
                />
              </template>
            </AGSelectItem>
          </template>
        </AGSelect>
        <label for="country">Способ получения кода</label>
      </FloatLabel>
      <FloatLabel>
        <InputText v-model="authStore.code" id="code" name="code" fluid />
        <label for="code">Введите код</label>
      </FloatLabel>
    </div>
    <div class="auth-form__actions">
      <AGButton label="Назад" text size-icon="sm" @click="authStore.prevStep()">
        <template #beforeIcon>
          <IconArrow />
        </template>
      </AGButton>
      <AGButton label="Продолжить" @click="authStore.nextStep()" />
    </div>
  </div>
</template>
