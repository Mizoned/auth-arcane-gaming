<script setup lang="ts">
import AGButton from '@/shared/ui/buttons/AGButton.vue';
import InputText from '@/shared/ui/inputs/InputText.vue';
import FloatLabel from '@/shared/ui/labels/FloatLabel.vue';
import AGSelect from '@/shared/ui/selects/AGSelect.vue';
import AGSelectItem from '@/shared/ui/selects/AGSelectItem.vue';
import CountryFlag from '@/entities/country/ui/flag/CountryFlag.vue';
import { ChangeLanguage } from '@/features/change-language';
import useCountryStore from '@/entities/country/store';
import { onMounted, ref } from 'vue';
import type { Country } from '@/entities/country/types';

const countriesStore = useCountryStore();

onMounted(() => {
  countriesStore.getCountries();
});

const selectedCountry = ref<Country | null>(null);
</script>

<template>
  <div class="auth-page">
    <div class="auth-form">
      <div class="auth-form__logo">Логотип (Высота 40px, длина до 300px)</div>
      <div class="auth-form__header">
        <div class="auth-form__title">Введите номер телефона</div>
        <div class="auth-form__description">
          Чтобы войти или зарегистрироваться
        </div>
      </div>
      <div class="auth-form__body">
        <div class="auth-form__fields">
          <FloatLabel>
            <AGSelect
              v-model="selectedCountry"
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
            <InputText id="phone" name="phone" fluid />
            <label for="phone">Номер телефона</label>
          </FloatLabel>
        </div>
        <AGButton label="Продолжить" />
      </div>

      <div class="auth-form__footer">
        <div class="auth-form__language">
          <ChangeLanguage />
        </div>
        <div class="auth-form__politics">
          <a href="#" target="_blank">Условия</a>
          <a href="#" target="_blank">Конфиденциальность</a>
        </div>
      </div>
      <!--      <AGButton label="Назад" text before-icon-component-name="IconArrow" size="sm" size-icon="sm">-->
      <!--        <template #beforeIcon>-->
      <!--          <IconArrow />-->
      <!--        </template>-->
      <!--      </AGButton>-->
    </div>
  </div>
</template>

<style scoped lang="scss">
.auth-page {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}

.auth-form {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--ag-champagne-color);
  border-radius: calc(var(--ag-border-radius) * 2);
  padding: 3.125rem 1.875rem 1.5rem 1.875rem;
  min-height: 37.125rem;
  width: 31.25rem;

  &__logo {
    align-self: center;
    padding: 0.75rem 1.25rem;
    background-color: var(--ag-snow-white-color);
    font-size: var(--ag-font-size-sm);
    color: var(--ag-grey-color);
    margin-bottom: 1.875rem;
  }

  &__header {
    text-align: center;
    margin-bottom: 1.875rem;
  }

  &__title {
    font-size: var(--ag-font-size-l);
    font-weight: var(--ag-font-weight-medium);
    margin-bottom: 0.875rem;
  }

  &__description {
    color: var(--ag-dark-grey-color);
  }

  &__fields {
    display: flex;
    flex-direction: column;
    gap: 1.875rem;
  }

  &__body {
    display: flex;
    flex-direction: column;
    row-gap: 3.125rem;
  }

  &__footer {
    display: flex;
    row-gap: 1.5rem;
    justify-content: space-between;
    margin-top: auto;
  }

  &__language {
  }

  &__politics {
    display: flex;
    align-items: center;
    gap: 1.5rem;

    a {
      color: var(--ag-dark-grey-color);
      font-size: var(--ag-font-size-s);
      line-height: 1.5rem;
    }
  }
}
</style>
