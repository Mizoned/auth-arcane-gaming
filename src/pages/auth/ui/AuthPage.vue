<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { ChangeLanguage } from '@/features/change-language';
import { useCountriesStore } from '@/entities/countries';
import { EnterPhone, SubscribeChannel, EnterCode } from '@/features/auth';
import { useAuthStore } from '@/entities/auth';
import { useLanguagesStore } from '@/entities/languages';

const countriesStore = useCountriesStore();
const authStore = useAuthStore();
const languageStore = useLanguagesStore();

onMounted(() => {
  countriesStore.getCountries();
});

const isPhoneOrCodeSteps = computed<boolean>(
  () =>
    authStore.currentStepName === 'phone' ||
    authStore.currentStepName === 'code'
);
</script>

<template>
  <div :class="['auth-page']">
    <div :class="['auth-form', `auth-form--${authStore.currentStepName}`]">
      <div v-if="isPhoneOrCodeSteps" class="auth-form__logo">
        {{ languageStore.currentLocale.logotypeText }}
      </div>
      <KeepAlive>
        <EnterPhone v-if="authStore.currentStepName === 'phone'" />
      </KeepAlive>
      <KeepAlive>
        <EnterCode v-if="authStore.currentStepName === 'code'" />
      </KeepAlive>
      <KeepAlive>
        <SubscribeChannel v-if="authStore.currentStepName === 'channel'" />
      </KeepAlive>
      <div v-if="isPhoneOrCodeSteps" class="auth-form__footer">
        <div class="auth-form__language">
          <ChangeLanguage />
        </div>
        <div class="auth-form__politics">
          <a href="#" target="_blank">{{
            languageStore.currentLocale.policy.conditions
          }}</a>
          <a href="#" target="_blank">{{
            languageStore.currentLocale.policy.confidentiality
          }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.auth-page {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}

.auth-form {
  $root: #{&};
  position: relative;
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

    span {
      font-weight: var(--ag-font-weight-medium);
    }
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

  &__actions {
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    gap: 0.625rem;
  }

  &__back-btn {
    position: absolute;
    top: 1.5rem;
    left: 1.5rem;
  }

  &__channel-icon {
    img {
      width: 7.5rem;
      height: 7.5rem;
    }
  }

  &--channel {
    #{$root}__title {
      margin: 1.875rem 0;
    }

    #{$root}__header {
      margin-bottom: 4.375rem;
    }
  }

  &--code {
    #{$root}__actions {
      grid-template-columns: 1fr 1fr;
    }
  }
}
</style>
