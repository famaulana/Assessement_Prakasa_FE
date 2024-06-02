import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const getUser = async (_token: string): Promise<{ code?: number; info?: string; data: object }> => {
  const headers = {
    Authorization: 'Bearer ' + _token,
  };

  try {
    const response = await axios.get(`${BASE_URL}auth/me`, {
      headers,
    });
    return { code: response.data.code, info: response.data.info, data: response.data.data };
  } catch (error: any) {
    return { code: error.response.data.code, info: error.response.data.info, data: error.response.data.data };
  }
};

export default getUser;
