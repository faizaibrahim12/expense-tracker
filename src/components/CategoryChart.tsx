import React, { useMemo } from 'react';
import { Expense, CATEGORY_CONFIG, ExpenseCategory } from '@/types/expense';

interface CategoryChartProps {
  expenses: Expense[];
  isLoading: boolean;
}

const CategoryChart: React.FC<CategoryChartProps> = ({ expenses, isLoading }) => {
  // useMemo for category data
  const categoryData = useMemo(() => {
    const totals: Record<ExpenseCategory, number> = {} as Record<ExpenseCategory, number>;
    
    expenses.forEach((expense) => {
      totals[expense.category] = (totals[expense.category] || 0) + expense.amount;
    });

    const total = Object.values(totals).reduce((sum, val) => sum + val, 0);

    return Object.entries(totals)
      .map(([category, amount]) => ({
        category: category as ExpenseCategory,
        amount,
        percentage: total > 0 ? (amount / total) * 100 : 0,
        config: CATEGORY_CONFIG[category as ExpenseCategory],
      }))
      .sort((a, b) => b.amount - a.amount);
  }, [expenses]);

  if (isLoading) {
    return (
      <div className="glass-card rounded-xl p-6">
        <div className="h-6 w-40 shimmer rounded mb-6" />
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 w-full shimmer rounded" />
              <div className="h-3 w-24 shimmer rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (categoryData.length === 0) {
    return (
      <div className="glass-card rounded-xl p-6 animate-slide-up" style={{ animationDelay: '0.15s' }}>
        <h2 className="font-display text-xl font-semibold text-foreground mb-6">
          Spending by Category
        </h2>
        <div className="text-center py-8 text-muted-foreground">
          <p>No spending data yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-xl p-6 animate-slide-up" style={{ animationDelay: '0.15s' }}>
      <h2 className="font-display text-xl font-semibold text-foreground mb-6">
        Spending by Category
      </h2>
      
      <div className="space-y-4">
        {categoryData.map((item, index) => (
          <div key={item.category} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">{item.config.icon}</span>
                <span className="text-sm font-medium text-foreground">
                  {item.config.label}
                </span>
              </div>
              <div className="text-right">
                <span className="text-sm font-semibold text-foreground">
                  ${item.amount.toFixed(2)}
                </span>
                <span className="text-xs text-muted-foreground ml-2">
                  ({item.percentage.toFixed(1)}%)
                </span>
              </div>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${item.percentage}%`,
                  backgroundColor: item.config.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryChart;
