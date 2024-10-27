import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Channel } from '../types';

export const useChannelsStore = defineStore('ChannelsStore', () => {
  const channels = ref<Channel[]>([]);

  return {
    channels
  };
});
