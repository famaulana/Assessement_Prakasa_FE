'use client';

import { useEffect, useState } from 'react';
import getList from '@/api/user/get-list';

import { authClient } from '@/lib/auth/client';
import { CustomersFilters } from '@/components/dashboard/customer/customers-filters';
import { CustomersTable } from '@/components/dashboard/customer/customers-table';
import type { Customer } from '@/components/dashboard/customer/customers-table';

let customers = [
  {
    id: 'USR-010',
    name: 'Alcides Antonio',
    avatar: '/assets/avatar-10.png',
    email: 'alcides.antonio@devias.io',
    phone: '908-691-3242',
    createdAt: 'Jun 2, 2024',
  },
] satisfies Customer[];

const fetchData = async () => {
  const data = await getUserList();

  if (data.list == undefined) {
    return null;
  }

  customers = (data.list as any[]).map((value, index) => {
    return {
      id: value.id,
      name: value.name,
      avatar: value.avatar ? value.avatar : '/assets/avatar-' + (index + 1) + '.png',
      email: value.email,
      phone: value.phone ? value.phone : null,
      createdAt: value.created_at,
    };
  });

  return data;
};

const List = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setPerPage] = useState(5);
  const [list, setList] = useState(customers);

  const paginatedCustomers = applyPagination(list, page, rowsPerPage);

  useEffect(() => {
    const getData = async () => {
      let get = await fetchData();

      setList(customers);
      setPage((get?.page as { current_page: number }).current_page - 1 || 0);
      setPerPage((get?.page as { per_page: number }).per_page || 5);
    };

    getData();
  }, [list]);

  return (
    <>
      <CustomersFilters />
      <CustomersTable
        count={paginatedCustomers.length}
        page={page}
        rows={paginatedCustomers}
        rowsPerPage={rowsPerPage}
      />
    </>
  );
};

export default List;

function applyPagination(rows: Customer[], page: number, rowsPerPage: number): Customer[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}

async function getUserList(): Promise<{ list?: object; page?: object; error?: String }> {
  const token = localStorage.getItem('access_token');

  if (!token || token === 'undefined') {
    authClient.signOut;
    return { error: 'Token not found' };
  }

  // Make API request
  const getUserListResponse = await getList(token);

  if (getUserListResponse.code !== 0) {
    return { error: getUserListResponse.info };
  }

  const data = (getUserListResponse.data as { data: object }).data;
  const page = getUserListResponse.data as {
    total: number;
    current_page: number;
    data: object;
    per_page: number;
  };

  let list = data;

  return { list, page };
}
