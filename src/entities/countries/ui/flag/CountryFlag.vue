<script setup lang="ts">
import type { CountryCode } from '../../types';

interface AGFlagProps {
  flag: CountryCode;
}

defineProps<AGFlagProps>();
</script>

<template>
  <img
    alt="flag"
    src="/images/flag/flag_placeholder.png"
    :class="['flag', `flag-${flag.toLocaleLowerCase()}`]"
  />
</template>
