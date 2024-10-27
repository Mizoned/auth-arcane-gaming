import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Channel } from '../types';

export const useChannelsStore = defineStore('ChannelsStore', () => {
  const channels = ref<Channel[]>([
    {
      name: 'WhatsApp',
      type: 'whatsapp',
      is_active: true,
      timeout: 0,
      description:
        'Чтобы использовать этот канал, вам необходимо зарегистрироваться в WhatsApp.',
      image_url: 'https://storage.kodmobi.aggone.net/icons/whatsapp.svg',
      link: 'https://kod.mobi'
    },
    {
      name: 'Telegram',
      type: 'telegram',
      is_active: true,
      timeout: 0,
      description:
        'Чтобы использовать этот канал, вам необходимо авторизоваться в боте.',
      image_url: 'https://storage.kodmobi.aggone.net/icons/telegram.svg',
      link: 'https://t.me/test777_sms_bot'
    },
    {
      name: 'SMS',
      type: 'sms',
      is_active: true,
      timeout: 0,
      description: 'Для этого канала вам не нужно нигде регистрироваться!',
      image_url: 'https://storage.kodmobi.aggone.net/icons/sms.svg',
      link: 'https://kod.mobi'
    }
  ]);

  return {
    channels
  };
});
