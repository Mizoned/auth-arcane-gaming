<script setup lang="ts">
import { useAuthStore } from '@/entities/auth';
import FloatLabel from '@/shared/ui/labels/FloatLabel.vue';
import IconArrow from '@/shared/ui/icons/IconArrow.vue';
import AGButton from '@/shared/ui/buttons/AGButton.vue';
import AGSelect from '@/shared/ui/selects/AGSelect.vue';
import AGSelectItem from '@/shared/ui/selects/AGSelectItem.vue';
import InputOpt from '@/shared/ui/inputs/InputOpt.vue';
import { useChannelsStore } from '@/entities/channels';
import { computed, ref } from 'vue';
import { helpers, required } from '@vuelidate/validators';
import { useVuelidate, type ServerErrors } from '@vuelidate/core';
import InputTextError from '@/shared/ui/inputs/InputTextError.vue';
import axios from 'axios';
import { useLanguagesStore } from '@/entities/languages';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const channelsStore = useChannelsStore();
const languageStore = useLanguagesStore();
const { currentLocale } = storeToRefs(languageStore);

const resendCode = async () => {
  await authStore.resendCode();
};

const rules = computed(() => ({
  channel: {
    required: helpers.withMessage(
      () => currentLocale.value.validationErrors.required,
      required
    )
  },
  code: {
    required: helpers.withMessage(
      () => currentLocale.value.validationErrors.required,
      required
    )
  }
}));

const formData = {
  channel: computed(() => authStore.selectedChannel),
  code: computed(() => authStore.code)
};

const $externalResults = ref<ServerErrors>({
  channel: '',
  code: ''
});

const $v = useVuelidate(rules, formData, { $externalResults });

const isChannelError = computed(
  () => $v.value.channel.$invalid && $v.value.channel.$error
);
const isCodeError = computed(
  () => $v.value.code.$invalid && $v.value.code.$error
);

const submitHandler = async () => {
  if (!(await $v.value.$validate())) return;

  await authStore.checkSessionCode().catch(error => {
    if (axios.isAxiosError(error) && error.status === 400) {
      $externalResults.value.code = error.response!.data.error;
    } else {
      console.error(error);
    }
  });
};
</script>

<template>
  <div class="auth-form__header">
    <div class="auth-form__title">{{ currentLocale.step1.title }}</div>
    <div class="auth-form__description">
      {{ currentLocale.step1.description + ' ' }}
      <span v-if="authStore.mobilePhone">{{ authStore.mobilePhone }}</span>
    </div>
  </div>
  <div class="auth-form__body">
    <div class="auth-form__fields">
      <div class="auth-form__field">
        <FloatLabel>
          <AGSelect
            v-model="authStore.selectedChannel"
            @update:model-value="() => ($externalResults.channel = '')"
            :options="channelsStore.channels"
            @close="$v.channel.$touch()"
            :invalid="isChannelError"
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
          <label for="channel">{{ currentLocale.step1.channelLabel }}</label>
        </FloatLabel>
        <InputTextError v-if="isChannelError">
          {{ $v.channel.$errors[0]?.$message }}
        </InputTextError>
      </div>
      <div class="auth-form__field">
        <FloatLabel>
          <InputOpt
            v-model="authStore.code"
            @update:model-value="() => ($externalResults.code = '')"
            :timer="authStore.timer"
            @start-timer="resendCode"
            @update:timer="value => (authStore.timer = value)"
            @blur="$v.code.$touch()"
            :invalid="isCodeError"
            :send-text="currentLocale.step1.buttonSendText"
            id="code"
            name="code"
            type="number"
            fluid
          />
          <label for="code">{{ currentLocale.step1.codeLabel }}</label>
        </FloatLabel>
        <InputTextError v-if="isCodeError">
          {{ $v.code.$errors[0]?.$message }}
        </InputTextError>
      </div>
    </div>
    <div class="auth-form__actions">
      <AGButton
        :label="currentLocale.step1.buttonPrevText"
        text
        size-icon="sm"
        @click="authStore.prevStep()"
      >
        <template #beforeIcon>
          <IconArrow />
        </template>
      </AGButton>
      <AGButton
        :label="currentLocale.step1.buttonNextText"
        :disabled="isChannelError || isCodeError"
        @click="submitHandler"
        :loading="authStore.isCheckSessionCodeLoading"
      />
    </div>
  </div>
</template>
