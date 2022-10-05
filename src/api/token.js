import axios from 'axios';
import { BASE_URL } from '.';

export const loadToken = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/token`);

    return response.data.token;
  } catch (e) {
    alert('Failed to load token');
  }
};
