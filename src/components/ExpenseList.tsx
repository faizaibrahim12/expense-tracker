import React, { useMemo, useCallback } from 'react';
import { Expense, CATEGORY_CONFIG, ExpenseCategory, CATEGORIES } from '@/types/expense';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Filter } from 'lucide-react';
import { format } from 'date-fns';

interface ExpenseListProps {
  expenses: Expense[];
  filter: ExpenseCategory | 'all';
  onFilterChange: (filter: ExpenseCategory | 'all') => void;
  onDeleteExpense: (id: string) => void;
  isLoading: boolean;
}

const ExpenseList: React.FC<ExpenseListProps> = ({
  expenses,
  filter,
  onFilterChange,
  onDeleteExpense,
  isLoading,
}) => {
  // useMemo to filter expenses only when dependencies change
  const filteredExpenses = useMemo(() => {
    if (filter === 'all') return expenses;
    return expenses.filter((expense) => expense.category === filter);
  }, [expenses, filter]);

  // useMemo for sorted expenses by date
  const sortedExpenses = useMemo(() => {
    return [...filteredExpenses].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [filteredExpenses]);

  // useCallback for delete handler
  const handleDelete = useCallback((id: string) => {
    onDeleteExpense(id);
  }, [onDeleteExpense]);

  const handleFilterChange = useCallback((value: string) => {
    onFilterChange(value as ExpenseCategory | 'all');
  }, [onFilterChange]);

  if (isLoading) {
    return (
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="h-7 w-32 shimmer rounded" />
          <div className="h-10 w-40 shimmer rounded" />
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-20 shimmer rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-xl p-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-xl font-semibold text-foreground">
          Recent Expenses
        </h2>
        
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <Select value={filter} onValueChange={handleFilterChange}>
            <SelectTrigger className="w-[160px] bg-secondary/50 border-border/50">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="all" className="focus:bg-secondary">
                All Categories
              </SelectItem>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat} className="focus:bg-secondary">
                  <span className="flex items-center gap-2">
                    <span>{CATEGORY_CONFIG[cat].icon}</span>
                    <span>{CATEGORY_CONFIG[cat].label}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {sortedExpenses.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-lg">No expenses found</p>
          <p className="text-sm mt-1">Add your first expense above!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sortedExpenses.map((expense, index) => (
            <div
              key={expense.id}
              className="group flex items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-all duration-200 animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                  style={{ backgroundColor: `${CATEGORY_CONFIG[expense.category].color}20` }}
                >
                  {CATEGORY_CONFIG[expense.category].icon}
                </div>
                <div>
                  <p className="font-medium text-foreground">{expense.description}</p>
                  <p className="text-sm text-muted-foreground">
                    {CATEGORY_CONFIG[expense.category].label} • {format(new Date(expense.date), 'MMM d, yyyy')}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="font-display text-lg font-semibold text-expense">
                  -${expense.amount.toFixed(2)}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(expense.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-expense hover:bg-expense/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpenseList;
