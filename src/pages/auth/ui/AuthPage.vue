<script setup lang="ts">
import { getEnvVariable } from '@/shared/utils';
</script>

<template>
  <div class="auth-form">
    {{ getEnvVariable('VITE_APP_API_KEY') }}
  </div>
</template>

<style scoped></style>
