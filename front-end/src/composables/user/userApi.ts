import axiosInstance from '@/config/AxiosConfig';
import { API_BASE_CONNECTION } from '@/constants';
import type { User } from '@/models/User.model';

export function useUserApi() {
  return {
    async authenticate(user: User): Promise<string> {
      const res = await axiosInstance.post<{ token: string }>(`${API_BASE_CONNECTION}`, {
        grant_type: 'password',
        username: user.username,
        password: user.password,
      });
      return res.data.token;
    },
  };
}