import axios from 'axios';
import { BASE_URL } from '.';
import { loadToken } from './token';

export const loadUsers = async (page = 1, count = 6) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/users?page=${page}&count=${count}`,
    );
    return response.data;
  } catch (e) {
    return { error: 'Failed to load users' };
  }
};

export const createUser = async (userData) => {
  try {
    const token = await loadToken();

    const queryConfig = {
      headers: {
        Token: token,
      },
    };

    const response = await axios.post(
      `${BASE_URL}/users`,
      userData,
      queryConfig,
    );

    return response;
  } catch (err) {
    return { error: err.response.data.message };
  }
};
