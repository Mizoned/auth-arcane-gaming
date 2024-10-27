<script setup lang="ts">
import InputText from '@/shared/ui/inputs/InputText.vue';
import AGButton from '@/shared/ui/buttons/AGButton.vue';
import TextTimer from '@/shared/ui/timers/TextTimer.vue';

interface InputOptProps {
  timer: number;
}

defineProps<InputOptProps>();

const emits = defineEmits<{
  (e: 'update:timer', value: string): void;
  (e: 'startTimer'): void
}>();

const startTimerHandler = () => {
  emits('startTimer');
}
</script>

<template>
  <div class="input-opt">
    <InputText class="input-opt__input-text" v-bind="$attrs" />
    <div class="input-opt__actions">
      <AGButton
        v-if="timer === 0"
        @click="startTimerHandler"
        label="Отправить"
        size="sm"
        text
      />
      <TextTimer
        v-else
        :seconds="timer"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.input-opt {
  position: relative;

  &__input-text {
    padding-right: 6rem;
  }

  &__actions {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 1rem;
  }
}
</style>
