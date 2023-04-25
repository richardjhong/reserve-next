import { getCookie } from 'cookies-next';

export const getToken = async () => {
  const token = await getCookie('jwt');

  return `Bearer ${token}`;
}