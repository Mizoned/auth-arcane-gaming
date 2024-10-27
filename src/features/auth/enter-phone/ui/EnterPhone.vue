<script setup lang="ts">
import FloatLabel from '@/shared/ui/labels/FloatLabel.vue';
import { CountryFlag } from '@/entities/countries';
import InputText from '@/shared/ui/inputs/InputText.vue';
import AGButton from '@/shared/ui/buttons/AGButton.vue';
import AGSelect from '@/shared/ui/selects/AGSelect.vue';
import AGSelectItem from '@/shared/ui/selects/AGSelectItem.vue';
import { useAuthStore } from '@/entities/auth';
import { useCountriesStore } from '@/entities/countries';

const authStore = useAuthStore();
const countriesStore = useCountriesStore();
</script>

<template>
  <div class="auth-form__header">
    <div class="auth-form__title">Введите номер телефона</div>
    <div class="auth-form__description">Чтобы войти или зарегистрироваться</div>
  </div>
  <div class="auth-form__body">
    <div class="auth-form__fields">
      <FloatLabel>
        <AGSelect
          v-model="authStore.selectedCountry"
          :options="countriesStore.countries"
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
      <FloatLabel>
        <InputText
          v-model="authStore.mobilePhone"
          id="phone"
          name="phone"
          fluid
        />
        <label for="phone">Номер телефона</label>
      </FloatLabel>
    </div>
    <div class="auth-form__actions">
      <AGButton label="Продолжить" @click="authStore.nextStep()" />
    </div>
  </div>
</template>
