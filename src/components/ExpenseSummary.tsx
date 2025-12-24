import React, { useMemo } from 'react';
import { Expense, CATEGORY_CONFIG, ExpenseCategory } from '@/types/expense';
import { TrendingDown, Wallet, PieChart } from 'lucide-react';

interface ExpenseSummaryProps {
  expenses: Expense[];
  isLoading: boolean;
}

const ExpenseSummary: React.FC<ExpenseSummaryProps> = ({ expenses, isLoading }) => {
  // useMemo for total calculation
  const totalExpenses = useMemo(() => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }, [expenses]);

  // useMemo for category breakdown
  const categoryBreakdown = useMemo(() => {
    const breakdown: Record<ExpenseCategory, number> = {} as Record<ExpenseCategory, number>;
    
    expenses.forEach((expense) => {
      breakdown[expense.category] = (breakdown[expense.category] || 0) + expense.amount;
    });

    return Object.entries(breakdown)
      .map(([category, amount]) => ({
        category: category as ExpenseCategory,
        amount,
        percentage: totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0,
      }))
      .sort((a, b) => b.amount - a.amount);
  }, [expenses, totalExpenses]);

  // useMemo for top category
  const topCategory = useMemo(() => {
    if (categoryBreakdown.length === 0) return null;
    return categoryBreakdown[0];
  }, [categoryBreakdown]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="glass-card rounded-xl p-6">
            <div className="h-4 w-24 shimmer rounded mb-3" />
            <div className="h-8 w-32 shimmer rounded" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Total Expenses */}
      <div className="glass-card rounded-xl p-6 animate-slide-up">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-expense/20 flex items-center justify-center">
            <TrendingDown className="w-5 h-5 text-expense" />
          </div>
          <span className="text-sm font-medium text-muted-foreground">Total Spent</span>
        </div>
        <p className="font-display text-3xl font-bold text-foreground">
          ${totalExpenses.toFixed(2)}
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          {expenses.length} transaction{expenses.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Average Expense */}
      <div className="glass-card rounded-xl p-6 animate-slide-up" style={{ animationDelay: '0.05s' }}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
            <Wallet className="w-5 h-5 text-primary" />
          </div>
          <span className="text-sm font-medium text-muted-foreground">Avg. Expense</span>
        </div>
        <p className="font-display text-3xl font-bold text-foreground">
          ${expenses.length > 0 ? (totalExpenses / expenses.length).toFixed(2) : '0.00'}
        </p>
        <p className="text-sm text-muted-foreground mt-1">per transaction</p>
      </div>

      {/* Top Category */}
      <div className="glass-card rounded-xl p-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-chart-3/20 flex items-center justify-center">
            <PieChart className="w-5 h-5 text-chart-3" />
          </div>
          <span className="text-sm font-medium text-muted-foreground">Top Category</span>
        </div>
        {topCategory ? (
          <>
            <p className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
              <span>{CATEGORY_CONFIG[topCategory.category].icon}</span>
              {CATEGORY_CONFIG[topCategory.category].label}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              ${topCategory.amount.toFixed(2)} ({topCategory.percentage.toFixed(0)}%)
            </p>
          </>
        ) : (
          <p className="font-display text-xl font-bold text-muted-foreground">No data yet</p>
        )}
      </div>
    </div>
  );
};

export default ExpenseSummary;
