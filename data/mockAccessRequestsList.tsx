export const accessRequests = [
  {
    id: '1',
    user: 'John Doe',
    email: 'johndoe@example.com',
    requestDate: '2024-09-01',
    status: 'Approved',
  },
  {
    id: '2',
    user: 'Jane Smith',
    email: 'janesmith@example.com',
    requestDate: '2024-09-03',
    status: 'Pending',
  },
  {
    id: '3',
    user: 'Michael Brown',
    email: 'michaelbrown@example.com',
    requestDate: '2024-09-04',
    status: 'Rejected',
  },
  {
    id: '4',
    user: 'Emily Davis',
    email: 'emilydavis@example.com',
    requestDate: '2024-09-05',
    status: 'Pending',
  },
  {
    id: '5',
    user: 'David Wilson',
    email: 'davidwilson@example.com',
    requestDate: '2024-09-06',
    status: 'Approved',
  },
  {
    id: '6',
    user: 'Sophia Taylor',
    email: 'sophiataylor@example.com',
    requestDate: '2024-09-07',
    status: 'Pending',
  },
  {
    id: '7',
    user: 'Chris Johnson',
    email: 'chrisjohnson@example.com',
    requestDate: '2024-09-08',
    status: 'Approved',
  },
];

export type AccessRequest = {
  id: string;
  user: string;
  email: string;
  requestDate: string; // ISO date format as string
  status: 'Approved' | 'Pending' | 'Rejected'; // Limited to specific status values
};
