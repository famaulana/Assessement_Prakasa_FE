import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'overview', title: 'Overview', href: paths.dashboard.overview, icon: 'chart-pie' },
  { key: 'accounts', title: 'Accounts', href: paths.dashboard.accounts, icon: 'users' },
  { key: 'account', title: 'Manage Profile', href: paths.dashboard.account, icon: 'user' },
] satisfies NavItemConfig[];
