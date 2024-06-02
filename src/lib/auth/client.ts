'use client';

import signIn from '@/api/auth/sign-in';
import getUser from '@/api/user/get-user';

import type { User } from '@/types/user';

function generateToken(): string {
  const arr = new Uint8Array(12);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, (v) => v.toString(16).padStart(2, '0')).join('');
}

let user = {
  id: 'USR-000',
  avatar: '/assets/avatar.png',
  firstName: 'Sofia',
  lastName: 'Rivers',
  email: 'sofia@devias.io',
} satisfies User;

export interface SignUpParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignInWithOAuthParams {
  provider: 'google' | 'discord';
}

export interface SignInWithPasswordParams {
  email: string;
  password: string;
}

export interface ResetPasswordParams {
  email: string;
}

class AuthClient {
  async signUp(_: SignUpParams): Promise<{ error?: string }> {
    // Make API request

    // We do not handle the API, so we'll just generate a token and store it in localStorage.
    const token = generateToken();
    localStorage.setItem('access_token', token);

    return {};
  }

  async signInWithOAuth(_: SignInWithOAuthParams): Promise<{ error?: string }> {
    return { error: 'Social authentication not implemented' };
  }

  async signInWithPassword(params: SignInWithPasswordParams): Promise<{ error?: string }> {
    const { email, password } = params;

    // Make API request
    const signInResponse = await signIn(email, password);

    if (signInResponse.code !== 0) {
      return { error: signInResponse.info };
    }

    const token = (signInResponse.data as { access_token: string }).access_token;
    localStorage.setItem('access_token', token);

    return {};
  }

  async resetPassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Password reset not implemented' };
  }

  async updatePassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Update reset not implemented' };
  }

  async getUser(): Promise<{ data?: User | null; error?: string }> {
    const token = localStorage.getItem('access_token');

    if (!token || token === 'undefined') {
      this.signOut;
      return { data: null };
    }

    // Make API request
    const getUserResponse = await getUser(token);

    if (getUserResponse.code !== 0) {
      return { error: getUserResponse.info };
    }

    const userId = getUserResponse.data as {
      id: string;
      email: string;
    };
    const userIdentity = (
      getUserResponse.data as {
        identity: { profile_img: string; first_name: string; last_name: string };
      }
    ).identity;

    user = {
      id: userId.id,
      avatar: userIdentity.profile_img,
      firstName: userIdentity.first_name,
      lastName: userIdentity.last_name,
      email: userId.email,
    };

    return { data: user };
  }

  async signOut(): Promise<{ error?: string }> {
    localStorage.removeItem('access_token');

    return {};
  }
}

export const authClient = new AuthClient();
