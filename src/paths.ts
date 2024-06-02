export const paths = {
  home: '/',
  auth: { signIn: '/auth/sign-in', signUp: '/auth/sign-up', resetPassword: '/auth/reset-password' },
  dashboard: {
    overview: '/dashboard',
    account: '/dashboard/profile',
    accounts: '/dashboard/accounts',
  },
  errors: { notFound: '/errors/not-found' },
} as const;
