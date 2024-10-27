import API from '@/shared/api/config';
import type { AxiosResponse } from 'axios';
import type {
  CheckSessionResponse,
  CreateSessionResponse,
  SendSessionResponse
} from '@/entities/auth';

const createSession = async (
  to: string,
  type: string | null,
  send: boolean
): Promise<AxiosResponse<CreateSessionResponse>> => {
  return API.post('/create', { to, type, send });
};

const sendSession = async (
  session_id: string,
  type: string
): Promise<AxiosResponse<SendSessionResponse>> => {
  return API.post('/send', { session_id, type });
};

const checkSession = async (
  session_id: string,
  code: string
): Promise<AxiosResponse<CheckSessionResponse>> => {
  return API.post('/check', { session_id, code });
};

export { createSession, sendSession, checkSession };
