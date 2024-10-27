export type ChannelType = 'telegram' | 'sms' | 'whatsapp';

export interface Channel {
  name: string;
  type: ChannelType;
  is_active: boolean;
  timeout: number;
  description: string;
  image_url: string;
  link: string;
}
