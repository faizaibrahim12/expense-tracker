import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Expense, ExpenseCategory } from '@/types/expense';
import { fetchExpenses } from '@/data/mockExpenses';
import ExpenseForm from '@/components/ExpenseForm';
import ExpenseList from '@/components/ExpenseList';
import ExpenseSummary from '@/components/ExpenseSummary';
import CategoryChart from '@/components/CategoryChart';
import { Wallet } from 'lucide-react';

const Index: React.FC = () => {
  // useState for managing expenses and UI state
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filter, setFilter] = useState<ExpenseCategory | 'all'>('all');
  const [isLoading, setIsLoading] = useState(true);

  // useEffect to fetch data from mock API
  useEffect(() => {
    const loadExpenses = async () => {
      setIsLoading(true);
      try {
        const data = await fetchExpenses();
        setExpenses(data);
      } catch (error) {
        console.error('Failed to fetch expenses:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadExpenses();
  }, []);

  // useCallback for adding expenses
  const handleAddExpense = useCallback((newExpense: Omit<Expense, 'id' | 'createdAt'>) => {
    const expense: Expense = {
      ...newExpense,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setExpenses((prev) => [expense, ...prev]);
  }, []);

  // useCallback for deleting expenses
  const handleDeleteExpense = useCallback((id: string) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  }, []);

  // useCallback for filter change
  const handleFilterChange = useCallback((newFilter: ExpenseCategory | 'all') => {
    setFilter(newFilter);
  }, []);

  // useMemo for current month expenses
  const currentMonthExpenses = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    return expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
    });
  }, [expenses]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center glow-primary">
              <Wallet className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="font-display text-xl font-bold text-foreground">
                ExpenseTracker
              </h1>
              <p className="text-xs text-muted-foreground">
                Manage your finances with ease
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Summary Cards */}
          <ExpenseSummary expenses={expenses} isLoading={isLoading} />

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Form + Chart */}
            <div className="lg:col-span-1 space-y-6">
              <ExpenseForm onAddExpense={handleAddExpense} />
              <CategoryChart expenses={expenses} isLoading={isLoading} />
            </div>

            {/* Right Column - Expense List */}
            <div className="lg:col-span-2">
              <ExpenseList
                expenses={expenses}
                filter={filter}
                onFilterChange={handleFilterChange}
                onDeleteExpense={handleDeleteExpense}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>Built with React Hooks • useState • useEffect • useRef • useMemo • useCallback</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
