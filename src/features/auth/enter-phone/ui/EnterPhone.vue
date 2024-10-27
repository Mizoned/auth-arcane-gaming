<script setup lang="ts">
import { computed } from 'vue';
import FloatLabel from '@/shared/ui/labels/FloatLabel.vue';
import InputText from '@/shared/ui/inputs/InputText.vue';
import AGButton from '@/shared/ui/buttons/AGButton.vue';
import AGSelect from '@/shared/ui/selects/AGSelect.vue';
import AGSelectItem from '@/shared/ui/selects/AGSelectItem.vue';
import { CountryFlag } from '@/entities/countries';
import { useAuthStore } from '@/entities/auth';
import { useCountriesStore } from '@/entities/countries';
import { helpers, required } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import InputTextError from '@/shared/ui/inputs/InputTextError.vue';

const authStore = useAuthStore();
const countriesStore = useCountriesStore();

const rules = computed(() => ({
  country: {
    required: helpers.withMessage('Поле обязательно для заполнения', required)
  },
  mobilePhone: {
    required: helpers.withMessage('Поле обязательно для заполнения', required)
  }
}));

const formData = {
  country: computed(() => authStore.selectedCountry),
  mobilePhone: computed(() => authStore.mobilePhone)
};

const $v = useVuelidate(rules, formData);

const submitHandler = async () => {
  if (!(await $v.value.$validate())) return;

  await authStore.createSessionToReceiveCode().then(() => {
    authStore.nextStep();
  });
};

const isMobilePhoneError = computed(() => $v.value.mobilePhone.$invalid && $v.value.mobilePhone.$error);
const isCountryError = computed(() => $v.value.country.$invalid && $v.value.country.$error);
</script>

<template>
  <div class="auth-form__header">
    <div class="auth-form__title">Введите номер телефона</div>
    <div class="auth-form__description">Чтобы войти или зарегистрироваться</div>
  </div>
  <div class="auth-form__body">
    <div class="auth-form__fields">
      <div class="auth-form__field">
        <FloatLabel>
          <AGSelect
            v-model="authStore.selectedCountry"
            :options="countriesStore.countries"
            @close="$v.country.$touch()"
            :invalid="isCountryError"
            fluid
            useSearch
          >
            <template #option="slotProps">
              <AGSelectItem
                :name="slotProps.data.name"
                :desc="slotProps.data.dial_code"
              >
                <template #icon>
                  <CountryFlag :flag="slotProps.data.code" />
                </template>
              </AGSelectItem>
            </template>
          </AGSelect>
          <label for="country">Страна</label>
        </FloatLabel>
        <InputTextError v-if="isCountryError">
          {{ $v.country.$errors[0]?.$message }}
        </InputTextError>
      </div>
      <div class="auth-form__field">
        <FloatLabel>
          <InputText
            v-model="authStore.mobilePhone"
            @blur="$v.mobilePhone.$touch()"
            :invalid="isMobilePhoneError"
            :disabled="authStore.selectedCountry === null"
            type="number"
            id="phone"
            name="phone"
            fluid
          />
          <label for="phone">Номер телефона</label>
        </FloatLabel>
        <InputTextError v-if="isMobilePhoneError">
          {{ $v.mobilePhone.$errors[0]?.$message }}
        </InputTextError>
      </div>
    </div>
    <div class="auth-form__actions">
      <AGButton
        label="Продолжить"
        :disabled="isMobilePhoneError || isCountryError"
        @click="submitHandler"
        :loading="authStore.isCreateSessionLoading"
      />
    </div>
  </div>
</template>
