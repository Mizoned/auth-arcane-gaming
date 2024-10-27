import type { Channel } from '@/entities/channels';

export interface CreateSessionResponse {
  channels: Channel[];
  sent_to: string;
  session_expired_at: string;
  session_id: string;
}
