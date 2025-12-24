import { Expense } from '@/types/expense';

export const mockExpenses: Expense[] = [
  {
    id: '1',
    description: 'Grocery shopping',
    amount: 85.50,
    category: 'food',
    date: '2024-01-15',
    createdAt: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    description: 'Monthly transit pass',
    amount: 120.00,
    category: 'transport',
    date: '2024-01-14',
    createdAt: '2024-01-14T09:00:00Z',
  },
  {
    id: '3',
    description: 'Netflix subscription',
    amount: 15.99,
    category: 'entertainment',
    date: '2024-01-13',
    createdAt: '2024-01-13T08:00:00Z',
  },
  {
    id: '4',
    description: 'Electric bill',
    amount: 145.00,
    category: 'utilities',
    date: '2024-01-12',
    createdAt: '2024-01-12T14:00:00Z',
  },
  {
    id: '5',
    description: 'New headphones',
    amount: 199.99,
    category: 'shopping',
    date: '2024-01-11',
    createdAt: '2024-01-11T16:30:00Z',
  },
  {
    id: '6',
    description: 'Pharmacy',
    amount: 32.50,
    category: 'health',
    date: '2024-01-10',
    createdAt: '2024-01-10T11:00:00Z',
  },
  {
    id: '7',
    description: 'Coffee with friends',
    amount: 24.00,
    category: 'food',
    date: '2024-01-09',
    createdAt: '2024-01-09T15:00:00Z',
  },
  {
    id: '8',
    description: 'Uber ride',
    amount: 18.50,
    category: 'transport',
    date: '2024-01-08',
    createdAt: '2024-01-08T20:00:00Z',
  },
];

// Simulated API delay
export const fetchExpenses = (): Promise<Expense[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockExpenses);
    }, 800);
  });
};
