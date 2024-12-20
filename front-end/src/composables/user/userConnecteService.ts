import type { User } from '@/models/User.model';
import { ref } from 'vue';

const userConnecte = ref<User>({ username: '', password: '' });

export function useUserConnecteService() {
  return {
    userConnecte,
  };
}