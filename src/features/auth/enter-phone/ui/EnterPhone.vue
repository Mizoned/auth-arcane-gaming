<script setup lang="ts">
import { computed, ref } from 'vue';
import FloatLabel from '@/shared/ui/labels/FloatLabel.vue';
import InputText from '@/shared/ui/inputs/InputText.vue';
import AGButton from '@/shared/ui/buttons/AGButton.vue';
import AGSelect from '@/shared/ui/selects/AGSelect.vue';
import AGSelectItem from '@/shared/ui/selects/AGSelectItem.vue';
import { CountryFlag } from '@/entities/countries';
import { useAuthStore } from '@/entities/auth';
import { useCountriesStore } from '@/entities/countries';
import { helpers, required } from '@vuelidate/validators';
import { type ServerErrors, useVuelidate } from '@vuelidate/core';
import InputTextError from '@/shared/ui/inputs/InputTextError.vue';
import axios from 'axios';
import { useLanguagesStore } from '@/entities/languages';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const countriesStore = useCountriesStore();
const languageStore = useLanguagesStore();
const { currentLocale } = storeToRefs(languageStore);

const rules = computed(() => ({
  country: {
    required: helpers.withMessage(
      () => currentLocale.value.validationErrors.required,
      required
    )
  },
  mobilePhone: {
    required: helpers.withMessage(
      () => currentLocale.value.validationErrors.required,
      required
    )
  }
}));

const formData = {
  country: computed(() => authStore.selectedCountry),
  mobilePhone: computed(() => authStore.mobilePhone)
};

const $externalResults = ref<ServerErrors>({
  country: '',
  mobilePhone: ''
});

const $v = useVuelidate(rules, formData, { $externalResults });

const submitHandler = async () => {
  if (!(await $v.value.$validate())) return;

  await authStore
    .createSessionToReceiveCode()
    .then(() => {
      authStore.nextStep();
    })
    .catch(error => {
      if (axios.isAxiosError(error) && error.status === 400) {
        $externalResults.value.mobilePhone = error.response!.data.error[0];
      } else {
        console.error(error);
      }
    });
};

const isMobilePhoneError = computed(
  () => $v.value.mobilePhone.$invalid && $v.value.mobilePhone.$error
);
const isCountryError = computed(
  () => $v.value.country.$invalid && $v.value.country.$error
);
</script>

<template>
  <div class="auth-form__header">
    <div class="auth-form__title">{{ currentLocale.step0.title }}</div>
    <div class="auth-form__description">
      {{ currentLocale.step0.description }}
    </div>
  </div>
  <div class="auth-form__body">
    <div class="auth-form__fields">
      <div class="auth-form__field">
        <FloatLabel>
          <AGSelect
            v-model="authStore.selectedCountry"
            @update:model-value="() => ($externalResults.country = '')"
            :options="countriesStore.countries"
            @close="$v.country.$touch()"
            :invalid="isCountryError"
            :search-placeholder="currentLocale.step0.searchPlaceholder"
            :empty-text="currentLocale.step0.emptySearchText"
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
          <label for="country">{{ currentLocale.step0.countryLabel }}</label>
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
            @update:model-value="() => ($externalResults.mobilePhone = '')"
            type="number"
            id="phone"
            name="phone"
            fluid
          />
          <label for="phone">{{ currentLocale.step0.mobilePhoneLabel }}</label>
        </FloatLabel>
        <InputTextError v-if="isMobilePhoneError">
          {{ $v.mobilePhone.$errors[0]?.$message }}
        </InputTextError>
      </div>
    </div>
    <div class="auth-form__actions">
      <AGButton
        :label="currentLocale.step0.buttonText"
        :disabled="isMobilePhoneError || isCountryError"
        @click="submitHandler"
        :loading="authStore.isCreateSessionLoading"
      />
    </div>
  </div>
</template>
