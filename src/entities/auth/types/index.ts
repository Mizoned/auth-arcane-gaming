import type { Channel, ChannelType } from '@/entities/channels';

export type Steps = 'phone' | 'code' | 'channel';

export interface CreateSessionResponse {
  channels: Channel[];
  sent_to: ChannelType | 'none';
  session_expired_at: string;
  session_id: string;
}

export interface SendSessionResponse {
  channel: Channel;
  session_expired_at: string;
  session_id: string;
}

export interface CheckSessionResponse {
  verify_token: string;
  is_test: boolean;
}

export type SysMessages =
  | 'ERROR_SESSION_EXPIRED'
  | 'ERROR_MESSAGE_WRONG_CODE'
  | 'ERROR_BAD_REQUEST';

export interface SendSessionErrorResponse {
  error: string;
  status: number;
  error_params: { count?: number };
  success: boolean;
  sys_message: SysMessages;
}
