export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
  createdAt: string;
}

export type ExpenseCategory = 
  | 'food'
  | 'transport'
  | 'entertainment'
  | 'utilities'
  | 'shopping'
  | 'health'
  | 'other';

export const CATEGORY_CONFIG: Record<ExpenseCategory, { label: string; color: string; icon: string }> = {
  food: { label: 'Food & Dining', color: 'hsl(30, 90%, 55%)', icon: '🍔' },
  transport: { label: 'Transport', color: 'hsl(200, 80%, 50%)', icon: '🚗' },
  entertainment: { label: 'Entertainment', color: 'hsl(280, 70%, 60%)', icon: '🎬' },
  utilities: { label: 'Utilities', color: 'hsl(45, 85%, 50%)', icon: '💡' },
  shopping: { label: 'Shopping', color: 'hsl(320, 70%, 55%)', icon: '🛍️' },
  health: { label: 'Health', color: 'hsl(160, 84%, 39%)', icon: '💊' },
  other: { label: 'Other', color: 'hsl(215, 20%, 65%)', icon: '📦' },
};

export const CATEGORIES = Object.keys(CATEGORY_CONFIG) as ExpenseCategory[];
