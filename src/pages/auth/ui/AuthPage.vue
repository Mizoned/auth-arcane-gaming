<script setup lang="ts">
import AGButton from '@/shared/ui/buttons/AGButton.vue';
import IconArrow from '@/shared/ui/icons/IconArrow.vue';
import InputText from '@/shared/ui/inputs/InputText.vue';
import FloatLabel from '@/shared/ui/labels/FloatLabel.vue';
import AGSelect from '@/shared/ui/selects/AGSelect.vue';
import AGFlag from '@/shared/ui/flag/AGFlag.vue';
import AGSelectItem from '@/shared/ui/selects/AGSelectItem.vue';
import AGSelectDropdown from '@/shared/ui/selects/AGSelectDropdown.vue';
import AGSelectSearch from '@/shared/ui/selects/AGSelectSearch.vue';
import InputSearch from '@/shared/ui/inputs/InputSearch.vue';
import { ref } from 'vue';
import ChangeLanguage from '@/features/language/change/ChangeLanguage.vue';

const obj = { name: 'Afghanistan', flag: '🇦🇫', code: 'AF', dial_code: '+93' };

const search = ref<string>('');
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
            <AGSelect fluid>
              <AGSelectDropdown style="padding-bottom: 0.5rem">
                <AGSelectSearch>
                  <InputSearch v-model="search" placeholder="Поиск" fluid />
                </AGSelectSearch>
                <AGSelectItem name="Россия" desc="+7">
                  <template #icon>
                    <AGFlag flag="ru" />
                  </template>
                </AGSelectItem>
              </AGSelectDropdown>
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
