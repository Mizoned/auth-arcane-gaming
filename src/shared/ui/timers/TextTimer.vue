<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';

interface TextTimerProps {
  seconds: number;
}

const props = defineProps<TextTimerProps>();

const timeLeft = ref<number>(props.seconds);

const timerInterval = ref<number | null>(null);

const startTimer = () => {
  if (timerInterval.value) return;

  timerInterval.value = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--;
    } else {
      stopTimer();
    }
  }, 1000);
}

const stopTimer = () => {
  if (timerInterval.value) {
    clearInterval(timerInterval.value);
    timerInterval.value = null;
  }
}

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const minutesStr = minutes.toString();
  const secondsStr = remainingSeconds.toString().padStart(2, '0');

  return `${minutesStr}:${secondsStr}`;
}

const formattedTime = computed(() => formatTime(timeLeft.value));

onMounted(() => {
  startTimer();
});

onUnmounted(() => {
  stopTimer();
});
</script>

<template>
  <span class="text-timer">{{ formattedTime }}</span>
</template>

<style scoped lang="scss">
.text-timer {
  font-size: var(--ag-font-size-sm);
  color: var(--ag-light-grey-color);
}
</style>
