import type { RouteRecordRaw } from 'vue-router';
import AuthView from '@/pages/auth';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'auth',
    component: AuthView
  }
];
