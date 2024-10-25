import API from '@/shared/api/config';

const sessionCreate = async (to: string, type: string, send: boolean) => {
  return API.post('/create', { to, type, send });
};

const sessionSend = async (session_id: string, type: string) => {
  return API.post('/send', { session_id, type });
};

const sessionCheck = async (session_id: string, code: string) => {
  return API.post('/send', { session_id, code });
};

export { sessionCreate, sessionSend, sessionCheck };
