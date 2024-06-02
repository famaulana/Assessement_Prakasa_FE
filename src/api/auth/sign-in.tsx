import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const signIn = async (email: string, password: string): Promise<{ code?: number; info?: string; data: object }> => {
  try {
    const response = await axios.post(`${BASE_URL}auth/login`, { email, password });
    return { code: response.data.code, info: response.data.info, data: response.data.data };
  } catch (error: any) {
    return { code: error.response.data.code, info: error.response.data.info, data: error.response.data.data };
  }
};

export default signIn;
